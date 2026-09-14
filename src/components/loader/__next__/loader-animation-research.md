# Loader animation implementation research

Date: September 2026  
Baseline: `3eb8272ca` (`origin/master` when the research started)

## Decision

### The TL;DR

Use a pure CSS implementation for the standalone bar and inline SVG geometry
animated with CSS for the ring and sparkle loaders. Keep the existing unified
`Loader` API and replace only its internal rendering.

This gives the bar a compositor-friendly transform without unnecessary markup,
while preserving SVG for the circle and sparkle paths that CSS cannot reproduce
faithfully. All colour values are Carbon tokens, animation can be suspended,
and SVG definition IDs are private to each React instance.

## Inputs and current implementation

The supplied folders contain raw SVG, Lottie JSON/archives, generated JSX/CSS,
GIF previews, and exporter metadata. The files are visual and timing references,
not production-ready components.

Representative uncompressed sizes are:

| Design  |      Raw SVG | Lottie JSON | Generated JSX + CSS |
| ------- | -----------: | ----------: | ------------------: |
| Bar     |   1.3–1.6 KB |  2.0–2.2 KB |              1.7 KB |
| Ring    |   1.6–3.4 KB |  6.8–8.3 KB |              3.8 KB |
| Sparkle | Not supplied |     12.3 KB |              8.7 KB |

The generated bar JSX reveals the complete gradient rather than the moving
segment because its mask is a static white rectangle. The generated spinner JSX
contains empty mask and content groups. Raw SVG IDs such as `rotate`, `arch`, and
`moving_bar` are document-global and collide when several copies are rendered.
The exports also use fixed dimensions and literal colour values.

The previous Carbon implementation already used CSS for the bar and CSS-driven
inline SVG for the other loaders, but its motion differed from the v4 sources:
the bar changed width while moving, the ring used a 24-unit approximation and a
`foreignObject` gradient, and the sparkle animation moved three large stars
instead of scaling the supplied six-star artwork.

## Options considered

| Option              | Fidelity                                                 | Tokens and responsive sizing                                              | Accessibility and motion                                                                  | Runtime and maintenance                                               | Outcome                       |
| ------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------- |
| Linked/raw SVG      | High for a single fixed export                           | Poor across an `<img>` boundary; a file is needed for every theme/variant | Embedded animation cannot be controlled consistently by Loader props                      | Small files, but global IDs and duplicated variants make reuse unsafe | Rejected                      |
| Inline SVG with CSS | Exact arbitrary paths, masks, gradients, and trim motion | CSS variables and the existing size API work directly                     | Decorative SVG stays hidden while the Loader owns status text and reduced-motion behavior | No runtime dependency; IDs and keyframes remain testable              | Selected for ring and sparkle |
| Pure CSS            | Exact for rectangles and simple transforms               | Best token and responsive support                                         | Straightforward animation suspension                                                      | Lowest DOM cost and no asset loading                                  | Selected for bar              |
| Lottie              | High source fidelity                                     | Requires runtime mapping and additional variant handling                  | Requires an explicit reduced-motion integration                                           | Adds a dependency and the largest source payloads                     | Rejected                      |
| GIF                 | Preview-only raster fidelity                             | Cannot consume tokens or scale cleanly                                    | Cannot reliably pause for reduced motion                                                  | Repaints pixels continuously and is difficult to test                 | Rejected                      |

## Implemented motion

- **Standalone:** a fixed 50% segment translates from `-100%` to `200%` in
  `0.983s` with `cubic-bezier(0.66, 0, 0.34, 1)`. The existing size, typical/AI,
  inverse, and custom-duration behavior remains.
- **Ring:** 64×64 SVG geometry with an eight-unit stroke and normalized
  `pathLength="1"`. The arc rotates once while its trim changes from `0.1` to
  `0.35` and back over `0.783s`, using the supplied easing. Typical, AI, inverse,
  tracked, success, error, inline, stacked, button, and custom-duration behavior
  remains.
- **Sparkle:** six paths positioned on a 32×32 canvas use the supplied scale
  sequence and easing over `4.55s`. A shared tokenized gradient is revealed by
  an instance-local mask. `hasMotion={false}` pauses the sequence at a
  representative visible frame.

## Runtime benchmark

The opt-in Playwright benchmark renders each moving loader at 1, 25, and 100
instances. Each case warms for 750 ms, records a 2,000 ms Chromium trace, and is
run three times; the table reports the median for 100 instances. The baseline
and new implementation were profiled from isolated checkouts with the same
harness.

Environment: Chromium 140.0.7339.186 via Playwright 1.55.1, 1366×768 viewport,
macOS 26.6.2 on a 12-core Apple M4 Pro MacBook Pro with 48 GB RAM. These figures
are comparative engineering evidence, not CI thresholds.

| Scenario, 100 instances | Main-thread task ms, before → after | Style + layout ms, before → after | Paint + composite ms, before → after | DOM nodes, before → after |               Frame rate |
| ----------------------- | ----------------------------------: | --------------------------------: | -----------------------------------: | ------------------------: | -----------------------: |
| Standalone typical      |             152.74 → 72.04 (-52.8%) |                     61.57 → 25.97 |                           137.93 → 0 |                 301 → 301 | 60.5 fps, no long frames |
| Standalone AI           |             182.14 → 69.15 (-62.0%) |                     62.72 → 24.92 |                           243.83 → 0 |                 301 → 301 | 60.5 fps, no long frames |
| Ring typical            |            294.42 → 177.06 (-39.9%) |                     47.00 → 54.54 |                      143.02 → 127.45 |                 501 → 601 | 60.5 fps, no long frames |
| Ring AI                 |             218.10 → 203.25 (-6.8%) |                     59.06 → 65.25 |                      908.65 → 221.30 |             1,001 → 1,101 | 60.5 fps, no long frames |
| Sparkle                 |            684.06 → 399.62 (-41.6%) |                   219.01 → 139.01 |                      567.10 → 407.71 |             2,401 → 2,401 | 60.5 fps, no long frames |

The bar's transform stays on the compositor, eliminating observed layout and
paint work. The ring adds one grouping element per instance to separate rotation
from trim animation, but total task time falls; removing the AI `foreignObject`
substantially reduces its composite work. The six-path sparkle retains the same
DOM cost as the previous three-SVG composition and reduces measured task and
style work. Garbage-collected heap readings differed by roughly 2–4% at 100
instances, which is within the noise expected from separate browser runs.

Run the benchmark with:

```shell
npm run benchmark:loader
```

It is skipped by normal component-test runs, has no pass/fail performance
thresholds, and attaches full samples as `loader-benchmark.json` when the chosen
Playwright reporter preserves successful test attachments.

## Verification and limitations

Jest covers geometry, token selection, timings, stopped motion, state variants,
and SVG ID isolation. Playwright covers computed motion styles and accessibility;
the visual test story provides paused side-by-side references for Chromatic.

The performance run covers Chromium only. The implementation deliberately uses
standard inline SVG, CSS transforms, masks, gradients, and keyframes rather than
browser-specific APIs, but release validation should retain the existing Carbon
cross-browser test matrix. Animation timing is exact to the supplied exports;
minor anti-aliasing differences between SVG renderers and the GIF previews are
expected.
