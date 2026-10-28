# Experiments

## Animation engines: same scene ("the twist"), three tools

| Engine | Polish | AI authoring speed | Storyboard fit | Verdict |
|---|---|---|---|---|
| Revideo (v1 templates) | 6 | 6 | 9 | Good for fast, template-driven episodes. Canvas-based, so typography and effects are limited |
| Manim CE ([manim/](manim/)) | 7 | 8 | 7 | Bold, precise maths-style transforms. Python toolchain, no shadows, units not pixels |
| **HyperFrames** ([hyperframes/](hyperframes/)) | **9** | **9** | 8 | Plain HTML/CSS/GSAP: everything a web page can do. Built-in check gate (overlap, contrast, GSAP pitfalls). **Chosen for ep000 v2** |

Both pipelines remain: `renderer: "revideo"` (v1 templates) or `renderer: "hyperframes"` (one HTML scene per storyboard scene, `episodes/<id>/scenes/*.html`, see `studio/hyperframes/SCENE_GUIDE.md`).

## Voices

See [voices/README.md](voices/README.md) and listen to `voices/voice-comparison.m4a`.
