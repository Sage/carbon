import fs from "node:fs/promises";
import path from "node:path";
import { compareScenario, readReports } from "./compare-reports.mjs";

const escape = (value) =>
  String(value ?? "Unavailable").replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
const number = (value, decimals = 3) =>
  Number.isFinite(value) ? value.toFixed(decimals) : "n/a";
const delta = (metric, decimals = 3) => {
  const change = `${metric.change > 0 ? "+" : ""}${number(metric.change, decimals)}`;
  const percent =
    metric.percentChange === null
      ? "percentage unavailable (base is zero)"
      : `${metric.percentChange > 0 ? "+" : ""}${number(metric.percentChange, 1)}%`;
  return `${change} (${percent})`;
};
const direction = (metric) =>
  metric.change > 0 ? "increase" : metric.change < 0 ? "decrease" : "equal";

const chart = (base, candidate) => {
  const maximum = Math.max(
    0.001,
    ...base.samples.map((sample) => sample.actualDurationMs),
    ...candidate.samples.map((sample) => sample.actualDurationMs),
  );
  const count = Math.max(base.samples.length, candidate.samples.length);
  const x = (index) => (count === 1 ? 320 : 52 + (index / (count - 1)) * 536);
  const y = (value) => 174 - (value / maximum) * 140;
  const series = (report, className) => {
    const points = report.samples
      .map(
        (sample, index) =>
          `${x(index).toFixed(2)},${y(sample.actualDurationMs).toFixed(2)}`,
      )
      .join(" ");
    return (
      `<polyline class="${className}" points="${points}"/>` +
      report.samples
        .map(
          (sample, index) =>
            `<circle class="${className}" cx="${x(index).toFixed(2)}" cy="${y(sample.actualDurationMs).toFixed(2)}" r="3"><title>${className === "base" ? "Base" : "Candidate"} sample ${index + 1}: ${number(sample.actualDurationMs)} ms</title></circle>`,
        )
        .join("")
    );
  };
  return `<figure><svg viewBox="0 0 620 210" role="img" aria-label="React render durations by sample. Base in blue, candidate in orange.">
    <line x1="52" y1="34" x2="588" y2="34" class="grid"/><line x1="52" y1="104" x2="588" y2="104" class="grid"/><line x1="52" y1="174" x2="588" y2="174" class="grid"/>
    <text x="44" y="38" text-anchor="end">${number(maximum, 2)}</text><text x="44" y="108" text-anchor="end">${number(maximum / 2, 2)}</text><text x="44" y="178" text-anchor="end">0</text>
    <text x="52" y="198">Sample 1</text><text x="588" y="198" text-anchor="end">Sample ${count}</text>
    ${series(base, "base")}${series(candidate, "candidate")}</svg>
    <figcaption><span class="legend base-key">Base</span><span class="legend candidate-key">Candidate</span> · React render duration (ms). Sample order within each run; samples are not paired trials.</figcaption></figure>`;
};

const metadata = (base, candidate) => {
  const rows = [
    ["Commit", base.provenance.git.commit, candidate.provenance.git.commit],
    [
      "Uncommitted changes",
      base.provenance.git.dirty ? "Yes" : "No",
      candidate.provenance.git.dirty ? "Yes" : "No",
    ],
    ["Run recorded", base.generatedAt, candidate.generatedAt],
    [
      "Samples / warm-ups",
      `${base.configuration.samples} / ${base.configuration.warmups}`,
      `${candidate.configuration.samples} / ${candidate.configuration.warmups}`,
    ],
    [
      "Browser",
      base.environment.browserVersion,
      candidate.environment.browserVersion,
    ],
    [
      "Viewport",
      JSON.stringify(base.environment.viewport),
      JSON.stringify(candidate.environment.viewport),
    ],
    [
      "Host",
      JSON.stringify(base.provenance.host),
      JSON.stringify(candidate.provenance.host),
    ],
    [
      "Scenario fingerprint",
      base.provenance.scenario.fingerprint,
      candidate.provenance.scenario.fingerprint,
    ],
    [
      "Build fingerprint",
      base.provenance.build.fingerprint,
      candidate.provenance.build.fingerprint,
    ],
    [
      "Measurement settings",
      JSON.stringify(base.configuration),
      JSON.stringify(candidate.configuration),
    ],
    ...[
      ...new Set([
        ...Object.keys(base.provenance.dependencies),
        ...Object.keys(candidate.provenance.dependencies),
      ]),
    ]
      .sort()
      .map((name) => [
        name,
        base.provenance.dependencies[name],
        candidate.provenance.dependencies[name],
      ]),
  ];
  return `<details><summary>Run metadata and dependency versions</summary><div class="table-scroll"><table><thead><tr><th scope="col">Setting</th><th scope="col">Base</th><th scope="col">Candidate</th></tr></thead><tbody>${rows.map(([label, first, second]) => `<tr><th scope="row">${escape(label)}</th><td>${escape(first)}</td><td>${escape(second)}</td></tr>`).join("")}</tbody></table></div></details>`;
};

export const buildHtmlReport = (comparison, baseReports, candidateReports) => {
  const { scenarios } = comparison;
  const overview = scenarios
    .map(
      (
        scenario,
        index,
      ) => `<tr data-scenario="${index}"><th scope="row"><a href="#scenario-${index}">${escape(scenario.id)}</a></th>
    <td>${number(scenario.commitCount.base, 1)} → ${number(scenario.commitCount.candidate, 1)}</td><td class="${direction(scenario.commitCount)}">${escape(delta(scenario.commitCount, 1))}</td>
    <td>${number(scenario.actualDurationMs.base)} → ${number(scenario.actualDurationMs.candidate)}</td><td class="${direction(scenario.actualDurationMs)}">${escape(delta(scenario.actualDurationMs))}</td>
    <td>${scenario.compatible ? (scenario.warnings.length ? "Settings match; review warnings" : "Settings match") : "Review differences"}</td></tr>`,
    )
    .join("");
  const sections = scenarios
    .map((scenario, index) => {
      const base = baseReports.get(scenario.id);
      const candidate = candidateReports.get(scenario.id);
      const statistics = ["min", "median", "mean", "max"]
        .map(
          (statistic) =>
            `<tr><th scope="row">${statistic}</th><td>${number(base.summary.actualDurationMs[statistic])}</td><td>${number(candidate.summary.actualDurationMs[statistic])}</td></tr>`,
        )
        .join("");
      const samples = Array.from(
        { length: Math.max(base.samples.length, candidate.samples.length) },
        (_, sampleIndex) => {
          const first = base.samples[sampleIndex];
          const second = candidate.samples[sampleIndex];
          return `<tr><th scope="row">${sampleIndex + 1}</th><td>${first?.commitCount ?? "n/a"}</td><td>${second?.commitCount ?? "n/a"}</td><td>${number(first?.actualDurationMs)}</td><td>${number(second?.actualDurationMs)}</td></tr>`;
        },
      ).join("");
      return `<section id="scenario-${index}" data-scenario="${index}" class="scenario"><h2>${escape(scenario.id)}</h2>
      ${scenario.warnings.length ? `<aside class="warning"><strong>Review before drawing conclusions</strong><ul>${scenario.warnings.map((warning) => `<li>${escape(warning)}</li>`).join("")}</ul></aside>` : ""}
      <p>Median commits: <strong>${number(scenario.commitCount.base, 1)} → ${number(scenario.commitCount.candidate, 1)}</strong>. Median React render duration: <strong>${number(scenario.actualDurationMs.base)} → ${number(scenario.actualDurationMs.candidate)} ms</strong>.</p>
      ${chart(base, candidate)}
      <details><summary>Render duration statistics (ms)</summary><table><thead><tr><th scope="col">Statistic</th><th scope="col">Base</th><th scope="col">Candidate</th></tr></thead><tbody>${statistics}</tbody></table></details>
      <details><summary>All ${base.samples.length} base / ${candidate.samples.length} candidate samples</summary><div class="table-scroll"><table><thead><tr><th scope="col">Sample</th><th scope="col">Base commits</th><th scope="col">Candidate commits</th><th scope="col">Base render (ms)</th><th scope="col">Candidate render (ms)</th></tr></thead><tbody>${samples}</tbody></table></div></details>
      ${metadata(base, candidate)}
      <details><summary>Raw React commits</summary><h3>Base</h3><pre>${escape(JSON.stringify(base.samples, null, 2))}</pre><h3>Candidate</h3><pre>${escape(JSON.stringify(candidate.samples, null, 2))}</pre></details></section>`;
    })
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Component benchmark comparison</title>
  <style>
    :root{font-family:system-ui,sans-serif;color:#182f42;background:#f3f6f8;color-scheme:light}*{box-sizing:border-box}body{margin:0}main{max-width:1180px;margin:auto;padding:32px 24px}h1{font-size:2rem;letter-spacing:-.04em;margin:6px 0 14px}h2{font-size:1.3rem;overflow-wrap:anywhere}h3{font-size:1rem}p,li{line-height:1.6}.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:.75rem;font-weight:700;color:#436175}a{color:#1466a8}.intro,.scenario{background:white;border:1px solid #dce4e9;border-radius:12px;padding:24px;margin:20px 0}.notice{border-left:4px solid #527991;padding:8px 16px;background:#edf4f8}.warning{background:#fff5e3;border-left:4px solid #b06900;padding:14px 18px;margin:16px 0}.warning ul{margin-bottom:0}.revision{font-family:ui-monospace,monospace;overflow-wrap:anywhere;font-size:.85rem}.filters{display:flex;gap:20px;align-items:center;flex-wrap:wrap;margin:20px 0}.filters input[type=search]{padding:10px;border:1px solid #8ea6b6;border-radius:6px;min-width:240px;font:inherit}.filters label{display:flex;align-items:center;gap:8px}.table-scroll{overflow:auto}.intro table{min-width:850px}table{border-collapse:collapse;width:100%;font-size:.9rem;text-align:left}td,th{padding:12px 10px;border-bottom:1px solid #dce4e9;vertical-align:top;overflow-wrap:anywhere}thead{background:#edf3f6}td{font-variant-numeric:tabular-nums}th{font-weight:600}.increase{color:#9c4821}.decrease{color:#146747}.equal{color:#436175}details{border-top:1px solid #dce4e9;padding:14px 0}summary{cursor:pointer;font-weight:600}pre{font-size:.8rem;white-space:pre-wrap;overflow-wrap:anywhere;background:#f3f6f8;padding:16px;max-height:420px;overflow:auto}figure{margin:20px 0}svg{width:100%;max-height:280px;display:block}svg text{font:12px system-ui;fill:#436175}.grid{stroke:#dce4e9}polyline{fill:none;stroke-width:2}.base{stroke:#1673b5}circle.base{fill:#1673b5}.candidate{stroke:#c16c12}circle.candidate{fill:#c16c12}figcaption{font-size:.8rem;color:#436175;line-height:1.7}.legend{font-weight:700;margin-right:12px}.base-key{color:#1673b5}.candidate-key{color:#9d5509}[hidden]{display:none!important}:focus-visible{outline:3px solid #1673b5;outline-offset:3px}@media(max-width:600px){main{padding:16px 12px}.intro,.scenario{padding:16px}h1{font-size:1.6rem}.filters input[type=search]{min-width:0;width:100%}}@media print{.filters{display:none}.intro,.scenario{break-inside:avoid;box-shadow:none}body{background:white}main{max-width:none;padding:0}}
  </style></head><body><main><header><span class="eyebrow">Component performance</span><h1>Base vs candidate</h1><p>${scenarios.length} ${scenarios.length === 1 ? "scenario" : "scenarios"} · Comparison recorded ${escape(comparison.generatedAt)}</p>
  <p class="revision">Base ${escape(comparison.baseReference)} · ${escape(comparison.baseCommit)}<br>Candidate ${escape(comparison.candidateCommit)}${comparison.candidateDirty ? " · includes uncommitted changes" : ""}</p></header>
  <aside class="notice">Render timings measure React work, not input latency or paint. Changes below are descriptive medians from sequential runs. Statistical significance has not been assessed and no automatic pass/fail decision is applied. Lower values indicate less measured work; workload and environment warnings require review.</aside>
  <section class="intro" aria-label="Scenario overview"><h2>Scenario overview</h2><div class="filters"><label>Find a scenario <input type="search" id="filter" placeholder="e.g. search/" autocomplete="off"></label><label><input type="checkbox" id="warnings-only">Only scenarios with warnings</label><span id="visible-count" role="status">${scenarios.length} shown</span></div>
  <div class="table-scroll"><table><thead><tr><th scope="col">Scenario</th><th scope="col">Median commits<br>Base → candidate</th><th scope="col">Commit change</th><th scope="col">Median render (ms)<br>Base → candidate</th><th scope="col">Render change (ms / %)</th><th scope="col">Review</th></tr></thead><tbody>${overview}</tbody></table></div><p id="empty" hidden>No scenarios match these filters.</p></section>${sections}
  <noscript><p>All results are visible. Enable JavaScript to filter scenarios.</p></noscript></main><script>
  const filter = document.getElementById('filter');
  const warningsOnly = document.getElementById('warnings-only');
  const sections = [...document.querySelectorAll('section.scenario')];
  function update() {
    let visible = 0;
    sections.forEach((section, index) => {
      const matches = section.querySelector('h2').textContent.toLowerCase().includes(filter.value.toLowerCase()) && (!warningsOnly.checked || section.querySelector('.warning'));
      section.hidden = !matches;
      document.querySelector('tr[data-scenario="' + index + '"]').hidden = !matches;
      if (matches) visible += 1;
    });
    document.getElementById('visible-count').textContent = visible + ' shown';
    document.getElementById('empty').hidden = visible !== 0;
  }
  filter.addEventListener('input', update);
  warningsOnly.addEventListener('change', update);
  </script></body></html>`;
};

export default async function writeHtmlReport(
  directory,
  output = path.join(directory, "comparison.html"),
) {
  const comparison = JSON.parse(
    await fs.readFile(path.join(directory, "comparison.json"), "utf8"),
  );
  if (comparison.schemaVersion !== 1 || comparison.status !== "complete") {
    throw new Error(
      "HTML reports require a completed comparison with schema version 1.",
    );
  }
  // Use relative artifact locations so downloaded or moved comparison folders work.
  const base = await readReports(path.join(directory, "base"));
  const candidate = await readReports(path.join(directory, "candidate"));
  const ids = [...base.keys()].sort();
  if (JSON.stringify(ids) !== JSON.stringify([...candidate.keys()].sort())) {
    throw new Error(
      "Base and candidate scenario sets differ; HTML comparison is incomplete.",
    );
  }
  const scenarios = ids.map((id) =>
    compareScenario(base.get(id), candidate.get(id)),
  );
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(
    output,
    buildHtmlReport({ ...comparison, scenarios }, base, candidate),
    "utf8",
  );
  return output;
}
