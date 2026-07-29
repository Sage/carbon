import type { MigrationRecord, SupportedBoundary } from "./types.js";

const docs = (anchor: string) => ({
  file: "migration-tooling/CATALOGUE_GUIDANCE.md",
  anchor,
});
const changelog = (version: string) => ({
  file: "CHANGELOG.md",
  anchor: version.replaceAll(".", ""),
});
const migrationSkill = { file: "skills/carbon-react/SKILL.md" };

export const migrations: readonly MigrationRecord[] = [
  {
    id: "css-package-version-prefix",
    scope: "upgrade",
    requiredBy: "160.0.0",
    kind: "manual",
    subject: { package: "carbon-react" },
    guidance: {
      summary:
        "Review selectors, snapshots, overrides, and visual differences for version-prefixed generated CSS classes.",
      documentation: docs("css-package-version-prefix"),
      changelog: changelog("160.0.0"),
      migrationSkill,
      manualChecks: [
        "Run visual regression tests, including mixed-version applications.",
      ],
      risks: ["visual", "behaviour"],
    },
    automation: {
      status: "manual",
      reason:
        "Generated class names and customer selector intent are runtime and build concerns.",
    },
    apiReferences: [],
  },
  {
    id: "button-next-dom-ref",
    scope: "upgrade",
    requiredBy: "161.0.0",
    kind: "manual",
    subject: {
      package: "carbon-react",
      component: "Button",
      importPath: "carbon-react/lib/components/button/__next__",
    },
    guidance: {
      summary:
        "Replace ButtonHandle/focusButton() with a forwarded DOM ref and focus() after selecting the correct element type.",
      documentation: docs("button-next-dom-ref"),
      changelog: changelog("161.0.0"),
      migrationSkill,
      replacement:
        "Use a forwarded DOM ref and call focus() on the selected element.",
      manualChecks: [
        "Verify button and link variants, nullability, and focus behaviour.",
      ],
      risks: ["behaviour", "types", "accessibility"],
    },
    automation: {
      status: "partial",
      rule: "detect-button-next-dom-ref",
      limitations: [
        "Element type and ref rewriting require customer judgement.",
      ],
    },
    apiReferences: [
      {
        path: "src/components/button/__next__/button.component.tsx",
        symbol: "ButtonHandle",
        historicalExemption: "P1-H1",
        historicalVersion: "160.0.0",
      },
    ],
    removedIn: "161.0.0",
  },
  {
    id: "npm-engine-11-18",
    scope: "upgrade",
    requiredBy: "161.3.0",
    kind: "manual",
    subject: { package: "carbon-react" },
    guidance: {
      summary: "Use npm >=11.18.0 before installing this target path.",
      documentation: docs("npm-engine-11-18"),
      changelog: changelog("161.3.0"),
      migrationSkill,
      manualChecks: [
        "Update local, CI, container, and package-manager pins, then reinstall normally.",
      ],
      risks: ["behaviour"],
    },
    automation: {
      status: "manual",
      reason:
        "Environment and lockfile changes cannot be made safely by a source migration.",
    },
    apiReferences: [{ path: "package.json", symbol: '"npm": ">=11.18.0"' }],
  },
  {
    id: "dialog-full-screen-component",
    scope: "deprecation",
    deprecatedIn: "156.2.0",
    kind: "component",
    subject: {
      package: "carbon-react",
      component: "DialogFullScreen",
      importPath: "carbon-react/lib/components/dialog-full-screen",
    },
    guidance: {
      summary: 'Replace DialogFullScreen with Dialog size="fullscreen".',
      documentation: docs("dialog-full-screen-component"),
      changelog: changelog("156.2.0"),
      migrationSkill,
      replacement: 'Use Dialog size="fullscreen".',
      manualChecks: [
        "Verify focus, layout, header/footer behaviour, visuals, and accessible naming.",
      ],
      risks: ["behaviour", "visual", "accessibility"],
    },
    automation: {
      status: "safe",
      rule: "replace-dialog-full-screen-component",
    },
    apiReferences: [
      {
        path: "src/components/dialog-full-screen/dialog-full-screen.component.tsx",
        symbol: "DialogFullScreen",
      },
    ],
  },
  {
    id: "step-sequence-item-aria-label",
    scope: "deprecation",
    deprecatedIn: "161.7.0",
    kind: "prop",
    subject: {
      package: "carbon-react",
      component: "StepSequenceItem",
      prop: "ariaLabel",
    },
    guidance: {
      summary:
        "Replace StepSequenceItem ariaLabel with the native aria-label attribute.",
      documentation: docs("step-sequence-item-aria-label"),
      changelog: changelog("161.7.0"),
      migrationSkill,
      replacement: "Use the native aria-label attribute.",
      manualChecks: ["Verify the computed accessible name."],
      risks: ["accessibility"],
    },
    automation: {
      status: "safe",
      rule: "replace-step-sequence-item-aria-label",
    },
    apiReferences: [
      {
        path: "src/components/step-sequence/step-sequence-item/step-sequence-item.component.tsx",
        symbol: "ariaLabel",
      },
    ],
  },
];

export const supportedBoundaries: readonly SupportedBoundary[] = [
  { from: "159.0.0", to: "160.0.0" },
  { from: "160.0.0", to: "161.0.0" },
  { from: "161.0.0", to: "161.3.0" },
  { from: "161.3.0", to: "161.7.0" },
];
