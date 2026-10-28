# EdZola Video Studio: one-time setup for Windows 10/11 (x64). Idempotent.
#
#   powershell -ExecutionPolicy Bypass -File setup.ps1                     core: engines, Kokoro voice, QA tools
#   powershell -ExecutionPolicy Bypass -File setup.ps1 -Voices             also Chatterbox + Qwen3-TTS (several GB)
#   powershell -ExecutionPolicy Bypass -File setup.ps1 -InstallPrereqs     first install Git, Node LTS, FFmpeg, uv via winget
#
# Heavy, regenerable things live in %USERPROFILE%\.edzola-video-studio (override with EDZOLA_VIDEO_HOME);
# studio\node_modules is a directory junction to it, so the repo stays light.
param([switch]$Voices, [switch]$InstallPrereqs)
$ErrorActionPreference = 'Stop'

$Studio = $PSScriptRoot
$Root = Split-Path $Studio -Parent
$HomeDir = if ($env:EDZOLA_VIDEO_HOME) { $env:EDZOLA_VIDEO_HOME } else { Join-Path $env:USERPROFILE '.edzola-video-studio' }
$Engine = Join-Path $HomeDir 'engine'
$HfEngine = Join-Path $HomeDir 'hyperframes'
$Models = Join-Path $HomeDir 'models'
$VoiceLab = Join-Path $HomeDir 'voice-lab'
$KokoroUrl = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0'

function Step($msg) { Write-Host "`n==> $msg" -ForegroundColor Yellow }
function Need($cmd, $hint) { if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { throw "$cmd not found. $hint" } }
function Refresh-Path { $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User') }

if ($InstallPrereqs) {
  Step 'Installing prerequisites with winget'
  foreach ($id in @('Git.Git', 'OpenJS.NodeJS.LTS', 'Gyan.FFmpeg', 'astral-sh.uv')) {
    winget install --id $id -e --accept-source-agreements --accept-package-agreements --silent
  }
  Refresh-Path
}

Step 'Checking prerequisites'
Need git 'Install Git: winget install Git.Git'
Need node 'Install Node 22+ LTS: winget install OpenJS.NodeJS.LTS'
Need ffmpeg 'Install FFmpeg: winget install Gyan.FFmpeg  (then open a new terminal)'
Need uv 'Install uv: winget install astral-sh.uv'
$nodeMajor = [int]((node -v).TrimStart('v').Split('.')[0])
if ($nodeMajor -lt 22) { throw "Node 22+ required (found $(node -v)). winget upgrade OpenJS.NodeJS.LTS" }
Write-Host "node $(node -v) | $((ffmpeg -version)[0].Substring(0, 20)) | $(uv --version)"

Step "Revideo engine (template episodes) in $Engine"
New-Item -ItemType Directory -Force -Path $Engine | Out-Null
Copy-Item (Join-Path $Studio 'package.json') $Engine -Force
if (Test-Path (Join-Path $Studio 'package-lock.json')) { Copy-Item (Join-Path $Studio 'package-lock.json') $Engine -Force }
Push-Location $Engine
npm install --legacy-peer-deps --no-fund --no-audit
if ($LASTEXITCODE -ne 0) { throw 'npm install failed' }
npx --yes puppeteer browsers install chrome-headless-shell | Out-Null
Pop-Location
$link = Join-Path $Studio 'node_modules'
if (Test-Path $link) {
  if (-not ((Get-Item $link).Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw 'studio\node_modules is a real folder; delete it first.' }
  (Get-Item $link).Delete()
}
New-Item -ItemType Junction -Path $link -Target (Join-Path $Engine 'node_modules') | Out-Null
Write-Host 'node_modules junction ready'

Step "HyperFrames engine (HTML/GSAP scenes) in $HfEngine"
New-Item -ItemType Directory -Force -Path $HfEngine | Out-Null
if (-not (Test-Path (Join-Path $HfEngine 'node_modules\hyperframes'))) {
  Push-Location $HfEngine
  if (-not (Test-Path 'package.json')) { Set-Content -Path 'package.json' -Value '{"private":true}' -Encoding ascii }
  npm install --no-fund --no-audit hyperframes@0.8.181 gsap@3.14.2
  if ($LASTEXITCODE -ne 0) { throw 'hyperframes install failed' }
  Pop-Location
}
$env:HYPERFRAMES_SKIP_SKILLS = '1'
node (Join-Path $HfEngine 'node_modules\hyperframes\bin\hyperframes.mjs') telemetry disable 2>$null | Out-Null

Step "Python env (Kokoro, mixing, listen-back) in $HomeDir\.venv"
$py = Join-Path $HomeDir '.venv\Scripts\python.exe'
if (-not (Test-Path $py)) { uv venv --python 3.11 (Join-Path $HomeDir '.venv') }
uv pip install --python $py -r (Join-Path $Studio 'pipeline\requirements.txt')

Step 'Sound effects (synthesised, royalty-free) in assets\sfx'
& $py -I (Join-Path $Studio 'pipeline\sound.py') sfx (Join-Path $Root 'assets\sfx')

Step "Kokoro voice model (Apache-2.0) in $Models"
New-Item -ItemType Directory -Force -Path $Models | Out-Null
foreach ($f in @('kokoro-v1.0.onnx', 'voices-v1.0.bin')) {
  $dest = Join-Path $Models $f
  if (-not (Test-Path $dest) -or (Get-Item $dest).Length -eq 0) {
    Write-Host "downloading $f ..."
    curl.exe -fSL -o $dest "$KokoroUrl/$f"
    if ($LASTEXITCODE -ne 0) { throw "download failed: $f" }
  }
}

if ($Voices) {
  Step "Expressive voices in $VoiceLab (first run downloads several GB)"
  $gpu = [bool](Get-Command nvidia-smi -ErrorAction SilentlyContinue)
  $torchIndex = if ($gpu) { 'https://download.pytorch.org/whl/cu124' } else { 'https://download.pytorch.org/whl/cpu' }
  Write-Host ("NVIDIA GPU: {0} (PyTorch from {1})" -f $gpu, $torchIndex)
  foreach ($v in @(@{dir = '.venv'; pkgs = @('chatterbox-tts==0.1.7', 'setuptools<81') }, @{dir = '.venv-qwen'; pkgs = @('qwen-tts', 'soundfile') })) {
    $vpy = Join-Path $VoiceLab "$($v.dir)\Scripts\python.exe"
    if (-not (Test-Path $vpy)) { uv venv --python 3.11 (Join-Path $VoiceLab $v.dir) }
    uv pip install --python $vpy torch==2.6.0 torchaudio==2.6.0 --index-url $torchIndex
    uv pip install --python $vpy @($v.pkgs)
  }
  & (Join-Path $VoiceLab '.venv\Scripts\python.exe') -c "from huggingface_hub import snapshot_download as s; s('ResembleAI/chatterbox')"
  if (-not $gpu) { Write-Host 'No NVIDIA GPU: Chatterbox and Qwen will run on CPU (slow). Kokoro stays fast.' -ForegroundColor Cyan }
}

Step 'Done'
Write-Host "Try:  cd `"$Studio`"; npm run say -- `"Welcome to EdZola Video Studio`""
Write-Host '      node hyperframes\render-scene.mjs a001-what-is-an-mis predict --snap "3,8"   (no voice needed: uses timing.preview.json)'
