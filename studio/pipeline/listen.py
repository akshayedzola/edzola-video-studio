"""Listen-back QA: transcribe the narration and diff it against the script.

Usage:
  python listen.py <narration.wav> <timing.json> <out.json> [model]

A machine can't judge tone, but it can catch the voice mispronouncing a
product name or acronym (e.g. "MIS" read as "miss"). Any beat whose
transcript diverges from the intended words is flagged for a human to
listen to, and usually fixed with a lexicon.json entry or a `say` override.
"""

import difflib
import json
import re
import sys
from pathlib import Path

import soundfile as sf
from faster_whisper import WhisperModel

SR = 24000


ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()
# British/US spellings and hyphenation the recogniser normalises differently.
VARIANTS = {"programme": "program", "programmes": "programs", "organisation": "organization", "non profit": "nonprofit", "percent": "%"}


def say_number(n: int) -> str:
    if n < 20:
        return ONES[n]
    if n < 100:
        return TENS[n // 10] + ("" if n % 10 == 0 else " " + ONES[n % 10])
    if n < 1000:
        rest = n % 100
        return ONES[n // 100] + " hundred" + ("" if rest == 0 else " and " + say_number(rest))
    rest = n % 1000
    return say_number(n // 1000) + " thousand" + ("" if rest == 0 else " " + say_number(rest))


def normalise(text: str) -> str:
    """Comparable form: lower-case letters only, numbers spelled out, no spaces."""
    text = text.lower().replace("&", " and ").replace("-", " ")
    text = re.sub(r"\d[\d,]*", lambda m: say_number(int(m.group().replace(",", ""))), text)
    for a, b in VARIANTS.items():
        text = text.replace(a, b)
    # "three forty-one" and "341" (-> "three hundred and forty one") should match.
    text = text.replace("hundred and", "").replace("hundred", "")
    return re.sub(r"[^a-z]", "", text)


def main():
    wav, timing_path, out_path = sys.argv[1:4]
    model_name = sys.argv[4] if len(sys.argv) > 4 else "base.en"
    audio, sr = sf.read(wav, dtype="float32")
    assert sr == SR
    timing = json.loads(Path(timing_path).read_text())
    model = WhisperModel(model_name, device="cpu", compute_type="int8")

    flagged, checked = [], 0
    for scene in timing["scenes"]:
        for i, beat in enumerate(scene["beats"]):
            a = int((scene["start"] + beat["start"]) * SR)
            b = int((scene["start"] + beat["end"]) * SR)
            segments, _ = model.transcribe(audio[a:b], language="en", beam_size=5, vad_filter=False)
            heard = " ".join(s.text for s in segments).strip()
            expected = beat["spoken"].replace(".", " ")  # "M.I.S." -> letters
            # Character-level match is robust to word splits ("Ed Zola" vs "Edzola").
            ratio = difflib.SequenceMatcher(None, normalise(expected), normalise(heard)).ratio()
            checked += 1
            if ratio < 0.85:
                flagged.append({"scene": scene["id"], "beat": i + 1, "expected": beat["spoken"], "heard": heard, "match": round(ratio, 2)})

    report = {"beats_checked": checked, "flagged": flagged}
    Path(out_path).write_text(json.dumps(report, indent=2))
    print(json.dumps({"beats_checked": checked, "beats_flagged": len(flagged)}))


if __name__ == "__main__":
    main()
