# Component interaction benchmarks

Run the local React profiling suite:

```sh
npm run benchmark
```

The suite profiles SplitButton menu interactions and Search input and grouped
results interactions. Each scenario runs five warm-ups and 30 recorded samples.
Filter scenarios using Playwright's usual arguments:

```sh
npm run benchmark -- --grep open-menu
npm run benchmark -- --grep 'search/'
BENCHMARK_SAMPLES=3 BENCHMARK_WARMUPS=1 npm run benchmark
```

The browser build is cached in `playwright/.benchmark-cache/`, separately from
ordinary component tests so their React builds cannot replace the profiling
build. Playwright reuses it when imported source timestamps are unchanged, and
rebuilds when they change or new fixture components are added. Token generation
still runs before each benchmark invocation. It checks that the installed Fusion
token package matches this checkout's exact lockfile version, then generates
from the installed inputs and current generator. Missing generated files are
recreated; unchanged files retain their timestamps so the build can be reused.
Missing dependencies or a version mismatch stop generation with instructions
to run `npm ci`. Generation does not install dependencies automatically.

For a cached rerun without regenerating already-current tokens:

```sh
npx playwright test -c playwright-benchmark.config.ts
```

After changing bundler configuration (such as aliases or plugins), clear the
benchmark cache explicitly before running again:

```sh
npm run benchmark:clear-cache
npm run benchmark
```

This clears only the benchmark cache. `clear-playwright-cache` continues to clear
the ordinary component-test cache.

JSON reports are written to the ignored `playwright/benchmark-results/`
directory and attached to the Playwright test results. Override the report
directory with `BENCHMARK_OUTPUT_DIR`. Reports contain individual React commits,
per-sample commit counts and summed `actualDuration`, summary statistics, and
browser/configuration metadata. Durations are milliseconds; timestamps are
relative to the browser's performance time origin.

## Runner timing diagnostics

Each scenario also writes a separate report under
`playwright/benchmark-results/runner-timings/` and attaches it to Playwright's
test results. The console displays total and median time for each runner phase:
preparation, `settleAndStart`, action, completion, `settleAndStop`, and verification.
Each settling phase waits two animation frames and performs its collector
transition in the same browser call, after the frame's remaining callbacks.
This uses two collector/settling calls per iteration rather than four.

Runner timing schema version 2 groups phases to match those calls. To compare
with a version 1 report, compare `settleAndStart` with the sum of
`preparationSettling` and `collectorStart`, and `settleAndStop` with the sum of
`actionSettling` and `collectorStop`. Compare totals or means; summing separate
medians does not give the median of the combined durations. Component reports
retain their existing schema and React measurement fields.

Diagnostic reports include every iteration, marking warm-ups explicitly. Phase
summaries include warm-ups because they contribute to overall execution time.
They also record mount, environment-metadata collection, and component-report
generation time. All durations use Node's monotonic clock and include browser
communication and waiting; they are distinct from React render durations and do
not represent browser interaction latency.

`totalBeforeDiagnosticsMs` covers mounting through writing and attaching the
component report. It excludes writing the diagnostic report itself, console
output, unmounting, token generation, bundling, and Playwright startup. Profiling
boundaries and frame waits are unchanged by this instrumentation.

## Search fixtures

`search/fixtures.tsx` provides two controlled examples:

- `ControlledSearchFixture`: typing a six-character query, clearing with Escape,
  and submitting with the Search button. Submission updates consumer state.
- `GroupedSearchFixture`: 100 local products in four groups, with subtext,
  selected indicators, and a disabled fifth product. Scenarios open the results,
  filter down to ten matches, display no results, skip the disabled item during
  keyboard navigation, select by mouse or keyboard, and dismiss with Escape.

Filtering and controlled fixture state are part of the profiled React subtree.
The fixture uses local data without a network request. Query entry in the basic
fixture uses real sequential key events; grouped-result query changes use
`fill()` to profile one controlled update rather than an entire typing sequence.

Preparation resets the query, selection, popup, and submission before each
sample. Search scenarios finish when the visible results, input value, selection,
or popup state updates. They do not wait for live-region announcements or assess
screen-reader behavior. Resetting the query to empty cancels pending announcements,
and the runner drains preparation effects before collecting the next sample.

Search resets call fixture-owned React state setters through `resetFixture()`
instead of clicking the reset button before every iteration. This avoids click
actionability waits during preparation. The helper focuses the same reset button
to preserve the starting focus, and the existing assertions confirm the reset
has committed. Query entry and keyboard setup still use Playwright input.
Measured actions are unchanged.

To opt another controlled fixture into this preparation helper, attach the ref
returned by `useFixtureReset(reset)` to a button with `data-benchmark-reset`,
where `reset` restores the fixture's state. Import `resetFixture` separately from
the fixture component and call `await resetFixture(component)` in `prepare`,
then assert the expected starting state. The reset button can also retain
`onClick={reset}` for manual use. This helper resets fixture-owned state; private
component state may still need ordinary interactions to establish it.

Deferred accessibility updates are outside these scenarios' completion boundary.
Synchronous React work in the fixture subtree is still included in the profile;
the component's accessibility implementation is not disabled or modified.

## Define a scenario

Create a browser fixture that owns the component's props, data, state, and
callbacks. Then import it into a `*.benchmark.pw.tsx` file:

```tsx
const benchmark = defineBenchmark({
  id: "my-component/open-menu",
  fixture: <MyComponentFixture optionCount={20} />,
  prepare: async ({ component, page }) => {
    // Establish the starting state before collection begins.
  },
  action: async ({ component }) => {
    await component.getByRole("button", { name: "Open" }).click();
  },
  complete: async ({ page }) => {
    await expect(page.getByRole("list")).toBeVisible();
  },
  verify: async ({ page }) => {
    // Optional extra correctness checks after collection ends.
  },
});

test(benchmark.id, async ({ mount, page }) => {
  const report = await runBenchmark(benchmark, { mount, page }, test.info());
  expect(report.samples).toHaveLength(report.configuration.samples);
});
```

`fixture` accepts JSX, so workload props are supplied directly. `prepare` and
`verify` are optional; `action` and `complete` are required. Use `page` for
portalled content. Keep browser event handlers in the fixture rather than
passing Node-side functions into it.
Keep fixture component imports separate from imports of constants or helpers;
Playwright's component transform requires the fixture import to contain only
components used in JSX. The Search workload count lives in `search/workload.ts`
for this reason.

Each scenario mounts once, excluding initial mount from collection. Before each
iteration the runner prepares the starting state and drains two animation
frames. It then enables collection, performs the action, waits for `complete`,
drains two more frames, and disables collection before verification. Warm-ups
follow the same path but are discarded. Fixtures must reset any relevant state
in `prepare`; they are reused between samples.

## Interpretation and scope

These are **production profiling-build React Profiler measurements**, using the
existing component-test providers without StrictMode. `actualDuration` measures React
render work, not end-to-end interaction latency, layout, or paint. Profiler
callbacks count commits of the fixture subtree, including its React portals,
rather than individual component renders. Recording has overhead; compare
results only under matching configurations.

The two-frame drain captures immediate frame-driven work, but does not guarantee
paint or completion of arbitrary timers, network requests, or animations.
`complete` must wait for the scenario's relevant asynchronous work. The active
collection window also includes Playwright action waits and completion polling;
unrelated React updates in that interval would be included. Use isolated fixtures.

Zero commits are valid when an interaction does not update React state. The
SplitButton fixture records button callbacks through DOM attributes so it does
not introduce its own state updates. The runner checks for a Profiler callback
during mount to detect a disabled collector before recording samples.

There are no performance pass/fail budgets, baseline comparisons, CPU throttling,
statistical comparisons, or additional browser collectors yet. The suite runs
one Chromium worker with retries and tracing
disabled. This establishes the authoring interface and collector for subsequent
extensions.
