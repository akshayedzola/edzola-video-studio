"""
"The twist" -- Sitara Foundation (fictional) learner-count reveal.
Manim Community Edition v0.22 prototype for EdZola Video Studio.

Render (1080p30):
  manim render -qh --fps 30 --media_dir ~/.edzola-video-studio/experiments/manim/media twist.py Twist

All data is fictional / illustrative.
"""
from pathlib import Path
import random

import manimpango
from manim import *

# ---------------------------------------------------------------- brand ----
CREAM = "#FDF8F4"
INK = "#1A1A1A"
GREY = "#6B6360"
CORAL = "#E8967A"
DEEP_CORAL = "#B4533A"
TEAL = "#8ECFCA"
YELLOW = "#F7C948"
PEACH = "#FAE8DC"
WHITE_CARD = "#FFFFFF"

FONT_DIR = Path(__file__).resolve().parents[2] / "assets" / "fonts"
for f in ("Fraunces-Variable.ttf", "Inter-Variable.ttf"):
    manimpango.register_font(str(FONT_DIR / f))
SERIF = "Fraunces"
SANS = "Inter"

config.background_color = CREAM

# ------------------------------------------------------- beat timings ----
# Seconds per beat. In a narration pipeline these would come from a JSON
# storyboard (e.g. word-level timestamps from TTS) -- see NOTES.md.
BEATS = {
    "cards": 2.0,     # 0-2
    "rows": 3.0,      # 2-5
    "merge": 5.0,     # 5-10
    "reveal": 4.0,    # 10-14
    "moral": 2.0,     # 14-16
}

TEAMS = [("Programme", 312, CORAL), ("M&E", 287, TEAL), ("Finance", 341, YELLOW)]
TOTAL_ROWS = 500
DUPLICATES = 37
ACTUAL = 298


def serif(s, size, color=INK, weight=NORMAL, **kw):
    return Text(s, font=SERIF, font_size=size, color=color, weight=weight, **kw)


def sans(s, size, color=INK, weight=NORMAL, **kw):
    return Text(s, font=SANS, font_size=size, color=color, weight=weight, **kw)


def pill(label, fill):
    t = sans(label, 22, INK, weight=MEDIUM)
    bg = RoundedRectangle(
        width=t.width + 0.5, height=0.46, corner_radius=0.23,
        fill_color=fill, fill_opacity=1, stroke_width=0,
    )
    return VGroup(bg, t.move_to(bg))


def number_card(team, value, accent):
    card = RoundedRectangle(
        width=3.6, height=2.5, corner_radius=0.22,
        fill_color=WHITE_CARD, fill_opacity=1,
        stroke_color=PEACH, stroke_width=3,
    )
    p = pill(team, accent).move_to(card.get_top() + DOWN * 0.55)
    num = serif(str(value), 110, INK).move_to(card.get_center() + DOWN * 0.3)
    g = VGroup(card, p, num)
    g.number = num
    return g


def counter(tracker, pos, size=88, color=INK):
    """Rolling integer driven by a ValueTracker.

    DecimalNumber renders through MathTex (needs LaTeX), so we redraw a
    Text each frame instead -- manimpango caches each glyph string.
    """
    return always_redraw(
        lambda: serif(f"{int(round(tracker.get_value()))}", size, color).move_to(pos)
    )


def chip(label, fill, stroke=None):
    t = sans(label, 24, INK, weight=MEDIUM)
    bg = RoundedRectangle(
        width=2.9, height=0.56, corner_radius=0.28,
        fill_color=fill, fill_opacity=1,
        stroke_color=stroke or fill, stroke_width=2,
    )
    return VGroup(bg, t.move_to(bg))


class Twist(Scene):
    def construct(self):
        rng = random.Random(7)

        tag = MarkupText(
            '<span letter_spacing="1400">ILLUSTRATIVE DATA</span>',
            font=SANS, font_size=14, color=GREY, weight=MEDIUM,
        ).to_corner(UR, buff=0.3)
        self.add(tag)

        # ---------------------------------------------- beat 1: cards ----
        cards = VGroup(*[number_card(*t) for t in TEAMS]).arrange(RIGHT, buff=0.5)
        cards.move_to(UP * 0.2)
        caption = sans("Learners placed this quarter", 28, GREY).next_to(cards, DOWN, buff=0.6)
        self.play(
            LaggedStart(
                *[FadeIn(c, shift=UP * 0.3) for c in cards], lag_ratio=0.18
            ),
            FadeIn(caption),
            run_time=1.3, rate_func=rate_functions.ease_out_cubic,
        )
        self.wait(BEATS["cards"] - 1.3)

        # ---------------------------------------- beat 2: spreadsheet ----
        cols, rows = 25, 20
        bw, bh, px, py = 0.31, 0.11, 0.36, 0.215
        bars = VGroup()
        for r in range(rows):
            for c in range(cols):
                w = bw * rng.uniform(0.7, 1.0)
                b = Rectangle(width=w, height=bh, fill_color=GREY,
                              fill_opacity=0.28, stroke_width=0)
                b.move_to([c * px, -r * py, 0], aligned_edge=LEFT)
                bars.add(b)
        bars.move_to([-1.5, -1.25, 0])

        rows_tracker = ValueTracker(TOTAL_ROWS)
        count_pos = np.array([4.95, 0.45, 0])
        count = counter(rows_tracker, count_pos)
        count_label = sans("rows", 26, GREY).next_to(count_pos, DOWN, buff=0.75)

        self.play(
            cards.animate.scale(0.6).to_edge(UP, buff=0.75),
            FadeOut(caption, shift=UP * 0.2),
            run_time=1.0, rate_func=rate_functions.ease_in_out_cubic,
        )
        self.play(
            LaggedStart(*[FadeIn(b) for b in bars], lag_ratio=0.004),
            FadeIn(count), FadeIn(count_label),
            run_time=1.6,
        )
        self.wait(BEATS["rows"] - 2.6)

        # ---------------------------------------- beat 3: duplicates ----
        idx = list(range(TOTAL_ROWS))
        dup_idx = rng.sample(idx, DUPLICATES)
        taken = set(dup_idx)
        twins = []
        for d in dup_idx:  # twin = a nearby non-duplicate row
            r, c = divmod(d, cols)
            cands = [rr * cols + cc
                     for rr in range(max(0, r - 3), min(rows, r + 4))
                     for cc in range(max(0, c - 3), min(cols, c + 4))
                     if rr * cols + cc not in taken]
            t = rng.choice(cands)
            taken.add(t)
            twins.append(t)
        dups = VGroup(*[bars[i] for i in dup_idx])
        twin_bars = VGroup(*[bars[i] for i in twins])

        chips = VGroup(
            chip("Kavya Sharma", YELLOW),
            chip("Kavya S.", YELLOW),
            chip("K. Sharma", YELLOW),
        ).arrange(DOWN, buff=0.18).move_to([4.95, -2.35, 0])
        chip_note = sans("same learner?", 20, GREY).next_to(chips, UP, buff=0.22)

        self.play(
            dups.animate.set_fill(YELLOW, opacity=1),
            twin_bars.animate.set_fill(YELLOW, opacity=0.45),
            LaggedStart(*[FadeIn(c, shift=LEFT * 0.2) for c in chips], lag_ratio=0.2),
            FadeIn(chip_note),
            run_time=1.0, rate_func=smooth,
        )
        self.wait(0.3)

        merged = chip("Kavya Sharma", TEAL).move_to(chips[1])
        new_label = sans("real people", 26, GREY).move_to(count_label)
        self.play(
            LaggedStart(
                *[d.animate(path_arc=0.6).move_to(twin_bars[k]).set_opacity(0)
                  for k, d in enumerate(dups)],
                lag_ratio=0.04, rate_func=rate_functions.ease_in_out_cubic,
            ),
            rows_tracker.animate(rate_func=rate_functions.ease_in_out_cubic)
            .set_value(TOTAL_ROWS - DUPLICATES),
            FadeTransform(count_label, new_label, rate_func=squish_rate_func(smooth, 0, 0.35)),
            chips[0].animate(rate_func=squish_rate_func(smooth, 0.1, 0.55)).move_to(chips[1]).set_opacity(0),
            chips[2].animate(rate_func=squish_rate_func(smooth, 0.1, 0.55)).move_to(chips[1]).set_opacity(0),
            FadeOut(chip_note, rate_func=squish_rate_func(smooth, 0, 0.3)),
            # NB: no play-level rate_func here -- it would override the
            # per-animation squish_rate_funcs above.
            run_time=2.6,
        )
        self.play(
            ReplacementTransform(chips[1], merged),
            twin_bars.animate.set_fill(TEAL, opacity=0.9),
            run_time=0.6, rate_func=smooth,
        )
        self.remove(chips[0], chips[2], dups)
        self.wait(BEATS["merge"] - 4.5)

        # --------------------------------------------- beat 4: reveal ----
        strikes = VGroup(*[
            Line(c.number.get_left() + LEFT * 0.12, c.number.get_right() + RIGHT * 0.12,
                 color=DEEP_CORAL, stroke_width=5)
            for c in cards
        ])
        self.play(
            cards.animate.set_opacity(0.35),
            LaggedStart(*[Create(s) for s in strikes], lag_ratio=0.15),
            FadeOut(VGroup(bars, count, new_label, merged), shift=DOWN * 0.2),
            run_time=0.9, rate_func=smooth,
        )
        self.remove(twin_bars)

        actual = ValueTracker(0)
        big_pos = np.array([0, 0.3, 0])
        big = counter(actual, big_pos, size=200, color=DEEP_CORAL)
        big_label = sans("actually placed", 34, GREY).move_to(big_pos + DOWN * 1.5)
        self.add(big)
        self.play(
            actual.animate.set_value(ACTUAL),
            FadeIn(big_label, shift=UP * 0.15),
            run_time=2.2, rate_func=rate_functions.ease_out_cubic,
        )
        big.clear_updaters()
        self.wait(BEATS["reveal"] - 3.1)

        # ---------------------------------------------- beat 5: moral ----
        moral = VGroup(
            serif("Each team counted correctly.", 40, INK),
            serif("They were counting different things.", 40, DEEP_CORAL, slant=ITALIC),
        ).arrange(DOWN, buff=0.16).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(moral, shift=UP * 0.2), run_time=1.0, rate_func=smooth)
        self.wait(BEATS["moral"] - 1.0 + 0.4)
