"""Procedural sound design: UI-style sound effects and a soft music bed.

Usage:
  python sound.py sfx   <out_dir>                 write every effect as <name>.wav
  python sound.py music <out.wav> <seconds> [style]

Everything is synthesised with numpy, so it is ours: no licences, no
downloads, reproducible bit-for-bit. Effects are short and soft by design
(signalling, not decoration). Swap in a licensed library later if wanted.
"""

import sys
from pathlib import Path

import numpy as np
import soundfile as sf

SR = 48000
rng = np.random.default_rng(7)


def t(sec):
    return np.arange(int(sec * SR)) / SR


def env(n, attack=0.005, decay=0.1):
    """Exponential decay envelope with a short linear attack."""
    x = np.arange(n) / SR
    e = np.exp(-x / max(decay, 1e-4))
    a = int(attack * SR)
    if a > 0:
        e[:a] *= np.linspace(0, 1, a)
    return e


def lowpass(x, cutoff):
    """One-pole low-pass; cutoff may be a scalar or per-sample array (Hz)."""
    if np.isscalar(cutoff):
        from scipy.signal import lfilter
        a = 1 - np.exp(-2 * np.pi * cutoff / SR)
        return lfilter([a], [1, a - 1], x)
    c = np.broadcast_to(np.asarray(cutoff, dtype=float), x.shape)
    a = 1 - np.exp(-2 * np.pi * c / SR)
    y = np.zeros_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += a[i] * (x[i] - acc)
        y[i] = acc
    return y


def highpass(x, cutoff):
    return x - lowpass(x, cutoff)


def norm(x, peak=0.7):
    m = np.max(np.abs(x)) or 1
    return (x / m * peak).astype(np.float32)


def sweep(f0, f1, sec):
    f = np.geomspace(f0, f1, int(sec * SR))
    return np.sin(2 * np.pi * np.cumsum(f) / SR)


# ----------------------------------------------------------------- effects

def tick():
    n = int(0.05 * SR)
    click = highpass(rng.standard_normal(n), 3000) * env(n, 0.0005, 0.004)
    tone = np.sin(2 * np.pi * 2200 * t(0.05)) * env(n, 0.0005, 0.012)
    return norm(click * 0.5 + tone, 0.5)


def pop():
    s = sweep(950, 380, 0.09) * env(int(0.09 * SR), 0.001, 0.035)
    return norm(s, 0.6)


def whoosh(sec=0.45, lo=300, hi=3200):
    n = int(sec * SR)
    shape = np.sin(np.linspace(0, np.pi, n)) ** 2
    cut = lo + (hi - lo) * np.sin(np.linspace(0, np.pi, n))
    return norm(lowpass(rng.standard_normal(n), cut) * shape, 0.45)


def swish():
    return whoosh(0.22, 900, 6000) * 0.9


def thud():
    s = sweep(110, 42, 0.35) * env(int(0.35 * SR), 0.002, 0.12)
    n = int(0.35 * SR)
    knock = lowpass(rng.standard_normal(n), 900) * env(n, 0.0005, 0.01)
    return norm(s + knock * 0.4, 0.8)


def chime():
    x = t(1.4)
    n = len(x)
    s = sum(a * np.sin(2 * np.pi * f * x) * env(n, 0.002, d)
            for f, a, d in ((880, 1, 0.6), (1320, 0.5, 0.45), (1760, 0.35, 0.3), (2640, 0.15, 0.2)))
    return norm(s, 0.45)


def rise():
    n = int(0.9 * SR)
    cres = np.linspace(0, 1, n) ** 2
    noise = lowpass(rng.standard_normal(n), np.linspace(400, 5000, n))
    return norm((noise * 0.6 + sweep(220, 880, 0.9) * 0.4) * cres * np.r_[np.ones(n - 2000), np.linspace(1, 0, 2000)], 0.4)


def ping():
    a = np.sin(2 * np.pi * 1320 * t(0.14)) * env(int(0.14 * SR), 0.002, 0.07)
    b = np.sin(2 * np.pi * 1760 * t(0.3)) * env(int(0.3 * SR), 0.002, 0.12)
    return norm(np.r_[a, b], 0.5)


def error():
    def tone(f, sec):
        x = t(sec)
        sq = np.tanh(3 * np.sin(2 * np.pi * f * x))
        return lowpass(sq, 1800) * env(len(x), 0.004, sec / 2)
    return norm(np.r_[tone(311, 0.12), tone(233, 0.2)], 0.4)


def strike():
    n = int(0.22 * SR)
    grain = 1 + 0.6 * np.sin(2 * np.pi * 70 * t(0.22))
    shape = np.sin(np.linspace(0, np.pi, n)) ** 0.6
    s = highpass(lowpass(rng.standard_normal(n), 4500), 800) * grain * shape
    return norm(s, 0.4)


def scribble():
    n = int(0.65 * SR)
    strokes = np.abs(np.sin(2 * np.pi * np.cumsum(5 + 4 * rng.random(n)) / SR)) ** 1.5
    s = highpass(lowpass(rng.standard_normal(n), 6000), 1500) * strokes
    fade = np.r_[np.linspace(0, 1, 800), np.ones(n - 1600), np.linspace(1, 0, 800)]
    return norm(s * fade, 0.3)


EFFECTS = {f.__name__: f for f in (tick, pop, whoosh, swish, thud, chime, rise, ping, error, strike, scribble)}


# ------------------------------------------------------------------- music

def music(seconds, style="warm-pulse"):
    """Soft 84 bpm bed: warm pad chords + gentle plucked arpeggio + soft pulse.

    Deliberately quiet and unobtrusive (coherence principle): it adds energy
    without competing with narration, and is ducked under the voice later.
    """
    bpm = 84
    beat = 60 / bpm
    bar = 4 * beat
    # Cmaj9 – Am9 – Fmaj9 – G6/9 (warm, hopeful), voiced around middle C
    chords = [
        [130.81, 196.00, 246.94, 293.66, 329.63],
        [110.00, 164.81, 196.00, 246.94, 261.63],
        [87.31, 174.61, 220.00, 261.63, 329.63],
        [98.00, 146.83, 196.00, 246.94, 293.66],
    ]
    total = int(seconds * SR)
    out = np.zeros(total)
    n_bars = int(np.ceil(seconds / bar))
    for b in range(n_bars):
        ch = chords[b % 4]
        start = int(b * bar * SR)
        length = int(bar * SR)
        x = np.arange(length) / SR
        pad_env = np.minimum(1, x / 0.8) * np.minimum(1, (bar - x) / 0.6)
        pad = sum(np.sin(2 * np.pi * f * x) + 0.4 * np.sin(2 * np.pi * f * 1.003 * x) for f in ch[1:])
        seg = 0.05 * pad * pad_env
        # Pluck arpeggio on eighth notes.
        for k in range(8):
            f = ch[[1, 2, 3, 4, 3, 2, 4, 3][k]] * 2
            o = int(k * beat / 2 * SR)
            pl = int(0.5 * SR)
            xx = np.arange(pl) / SR
            note = (np.sin(2 * np.pi * f * xx) + 0.3 * np.sin(4 * np.pi * f * xx)) * np.exp(-xx / 0.18)
            end = min(length, o + pl)
            seg[o:end] += 0.06 * note[: end - o]
        # Soft bass pulse on beats 1 and 3.
        for k in (0, 2):
            o = int(k * beat * SR)
            pl = int(0.6 * SR)
            xx = np.arange(pl) / SR
            bass = np.sin(2 * np.pi * ch[0] * xx) * np.exp(-xx / 0.35)
            end = min(length, o + pl)
            seg[o:end] += 0.12 * bass[: end - o]
        end = min(total, start + length)
        out[start:end] += seg[: end - start]
    out = lowpass(out, 5000)
    fade = int(3 * SR)
    out[:fade] *= np.linspace(0, 1, fade)
    out[-fade:] *= np.linspace(1, 0, fade)
    return norm(out, 0.5)


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "sfx":
        d = Path(sys.argv[2])
        d.mkdir(parents=True, exist_ok=True)
        for name, f in EFFECTS.items():
            sf.write(d / f"{name}.wav", f(), SR)
        print(f"wrote {len(EFFECTS)} effects to {d}")
    elif cmd == "music":
        sf.write(sys.argv[2], music(float(sys.argv[3]), *(sys.argv[4:5])), SR)
        print(f"wrote {sys.argv[2]}")
