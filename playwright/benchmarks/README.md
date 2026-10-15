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

## Local scenario baselines

Benchmark runs write candidate reports; they never save or replace baselines.
After reviewing a report, save that scenario explicitly:

```sh
npm run benchmark -- --grep 'search/type-query'
npm run benchmark:save-baseline -- search/type-query
```

The baseline is saved as `playwright/benchmark-baselines/search/type-query.json`.
Baselines and their history are ignored by Git for this local workflow. Each
baseline contains the entire report, including raw commits and samples, plus a
save timestamp and a SHA-256 digest of the source report. Saving does not rerun
the benchmark or substitute metadata from the current checkout.

If a baseline already exists, the command fails without changing it. Replacing
it requires an explicit flag:

```sh
npm run benchmark:save-baseline -- search/type-query --replace
```

Replacement archives the previous file under
`playwright/benchmark-baselines/history/search/type-query/` before updating the
current baseline. The save uses a temporary file and rename, with a per-scenario
lock to prevent concurrent saves from overwriting one another. A process killed
during saving may leave a `.lock` file; remove that file only after confirming
the saving process is no longer running.

Select a particular report or another baseline directory when needed:

```sh
npm run benchmark:save-baseline -- search/type-query --report /path/to/report.json --directory /path/to/baselines
```

The default report directory respects `BENCHMARK_OUTPUT_DIR`. Review the report's
`generatedAt` and configuration before saving: the command saves the existing
file, which may be from an earlier run or a reduced-sample smoke check. It prints
the sample count; it does not impose a minimum beyond one sample.

Component report schema version 2 adds provenance captured before measurement:
Git commit and dirty state, scenario source file, source fingerprints, installed
React/Playwright/token versions, and host OS, architecture, CPU model and Node
version. Browser version, viewport and hardware concurrency remain in
`environment`; measurement settings remain in `configuration`.

The scenario fingerprint conservatively covers all benchmark suite source files,
including fixtures and workloads, so edits to another scenario may also change
it. The build fingerprint additionally covers the local inputs in Playwright's
browser build manifest, benchmark configuration and lockfile. Fingerprints use
file contents and relative paths, not modification timestamps or checkout paths.
They identify changed inputs; they do not make timing results from different
machines directly comparable. Older reports lacking provenance must be rerun
before they can be saved as baselines.

Baselines are saved explicitly; comparisons do not create or replace them.
Run storage and comparison tests with `npm run test:benchmarks`.

## Automated base-branch comparison

Run the same scenarios against a base Git reference and your current checkout:

```sh
npm run benchmark:compare -- --base origin/master --grep 'search/'
```

The default base is `origin/master`. Any locally available branch, tag or commit
can be selected with `--base`. To refresh a remote branch first:

```sh
npm run benchmark:compare -- --base origin/master --fetch
```

Without `--fetch`, the command uses the reference already available locally; it
does not assume a remote-tracking branch is up to date. The command compares the
selected base tip, rather than automatically selecting a merge base.

The workflow creates a detached temporary base worktree, copies the current
benchmark suite and profiling configuration into it, and installs the base's
locked dependencies using `npm ci` with Husky disabled. The base's component
source, dependency manifests, providers and token generator remain its own.
Using the current fixtures on both sides makes workload comparisons consistent
and supports base branches that predate the benchmark harness. A fixture that
depends on a feature absent from the base will fail; use a compatible fixture
to measure a shared interaction.

It first checks that the current suite and filter select tests, avoiding an
unnecessary base install when the filter is empty. It generates tokens and runs
the base benchmarks, then generates tokens and
runs the candidate benchmarks in your current checkout, including uncommitted
component and fixture changes. Your current branch is not switched, and the
candidate's installed dependencies are not replaced. Install the current
checkout's dependencies before running this command, as for a normal benchmark.
The base install may require registry access and adds setup time. Each run gets
a free local server port to avoid reusing an already-running component-test server.

Each invocation writes a new directory under
`playwright/benchmark-results/comparisons/`, containing `base/` and `candidate/`
raw reports and test artifacts, `workflow.json`, `comparison.json`, a readable
`comparison.txt`, and a self-contained `comparison.html`. Choose another parent
directory with `--directory`. The
temporary worktree is removed after normal completion or failure; partial
reports are retained when a run fails. Forced process termination may require
manual temporary-worktree cleanup.

Results show changes in median React commit counts and render durations.
Configuration, fixture, browser or host differences mark a comparison as
incompatible. Dependency differences produce warnings so dependency upgrades
remain visible. Different scenario sets fail rather than silently omitting
missing scenarios. Timing comparisons use sequential base-then-candidate runs;
they do not yet provide statistical significance tests, interleaving or automatic
performance pass/fail decisions. No QA approval is implied by a successful run.

For a short smoke check, override sample settings equally on both sides:

```sh
npm run benchmark:compare -- --base HEAD --grep 'split-button/open-menu' --samples 3 --warmups 1
```

Defaults are 30 samples and five warm-ups. `BENCHMARK_SAMPLES` and
`BENCHMARK_WARMUPS` are also respected. Review a candidate and explicitly save
it as a local baseline when appropriate:

```sh
npm run benchmark:save-baseline -- search/type-query --report /path/to/comparison/candidate/search--type-query.json
```

## HTML reports for QA

Every successful `benchmark:compare` run generates `comparison.html` alongside
the JSON and text reports. Open that file in a browser, or share the HTML file
on its own: styles, charts, samples and metadata are embedded and require no
server or internet access. The page provides scenario search, a warnings filter,
base/candidate medians and changes, sample charts, raw React commits, and
expandable run settings and dependency versions. Charts show sample order within
each run, not paired trials. Timing changes are descriptive and do not imply
statistical significance, QA approval or an automatic pass/fail result.

Generate or refresh HTML for an existing comparison without rerunning tests:

```sh
npm run benchmark:report -- playwright/benchmark-results/comparisons/<run-directory>
```

Choose a different output file with `--output /path/to/report.html`. Regeneration
needs `comparison.json` and the `base/` and `candidate/` raw reports in the same
comparison folder. It works after moving or downloading that folder; opening
the generated HTML does not need those other files. Regeneration replaces the
derived HTML file and leaves raw reports and saved baselines intact.

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
medians does not give the median of the combined durations. Component report
schema version 2 preserves the React measurement fields and adds provenance.

Diagnostic reports include every iteration, marking warm-ups explicitly. Phase
summaries include warm-ups because they contribute to overall execution time.
They also record mount, environment-metadata collection, and component-report
generation time. All durations use Node's monotonic clock and include browser
communication and waiting; they are distinct from React render durations and do
not represent browser interaction latency.

`totalBeforeDiagnosticsMs` covers mounting through writing and attaching the
component report. It excludes writing the diagnostic report itself, console
output, unmounting, token generation, bundling, and Playwright startup. Profiling
boundaries and frame waits are unchanged by this instrumentation. Run provenance
is collected before mounting and is also outside these diagnostic timings.

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

There are no performance pass/fail budgets, CPU throttling, statistical
significance tests, or additional browser collectors yet. The suite runs
one Chromium worker with retries and tracing
disabled. This establishes the authoring interface and collector for subsequent
extensions.
