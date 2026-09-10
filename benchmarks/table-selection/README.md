# Table selection benchmark

This local-only Playwright component benchmark compares selectable `Table` and
`FlatTable` implementations containing 500 rows and four columns, including the
selection column.

Run it with:

```sh
npm run benchmark:table
```

The generated CommonJS module is written to
`playwright/benchmark-results/table-selection.js`. The output directory is
ignored by Git. The report contains raw measurements, summary statistics, and
the new table's median ratio and percentage improvement relative to FlatTable.

The benchmark measures initial React mount duration and these controlled-state
updates:

- selecting one row;
- deselecting one row;
- selecting all 500 rows;
- clearing all 500 rows.

For each update it captures the browser duration from the control event through
React's commits and the next animation frame, so synchronous layout-effect
updates are included. It also records initial mount duration using the browser
User Timing API. Two warm-up iterations are discarded before ten recorded
samples by default. These can be changed locally:

```sh
TABLE_BENCHMARK_WARMUPS=5 TABLE_BENCHMARK_SAMPLES=20 npm run benchmark:table
```

Use the same machine with other applications closed, run the benchmark several
times, and compare medians rather than a single result. The suite intentionally
has no performance assertion because timings vary with hardware and system load.
