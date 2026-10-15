const report = (commits = 1, duration = 2) => ({
  schemaVersion: 2,
  id: "component/open",
  provenance: {
    git: { commit: "revision" },
    scenario: { fingerprint: "same-fixture" },
    build: { fingerprint: "component-build" },
    host: { platform: "test", cpuModel: "same cpu" },
    dependencies: { "@sage/design-tokens-fusion": "18.15.0" },
  },
  configuration: { samples: 1, warmups: 0 },
  environment: {
    browserVersion: "140",
    viewport: { width: 1000, height: 800 },
  },
  summary: {
    commitCount: { median: commits },
    actualDurationMs: { median: duration },
  },
  samples: [
    {
      commitCount: commits,
      actualDurationMs: duration,
      commits: Array.from({ length: commits }, () => ({
        actualDurationMs: duration / commits,
      })),
    },
  ],
});

export default report;
