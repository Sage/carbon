import React from "react";
import { MultiSelect, Option } from "..";
import Box from "../../box";

export default {
  component: MultiSelect,
  title: "Select/MultiSelect/Test",
  parameters: {
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

const snapshotOptions = [
  <Option key="amber" text="Amber" value="amber" />,
  <Option key="black" text="Black" value="black" />,
  <Option key="blue" text="Blue" value="blue" />,
];

const coloredSnapshotOptions = [
  <Option key="grey" text="Grey" value="grey" variant="grey" />,
  <Option key="green" text="Green" value="green" variant="green" />,
  <Option key="red" text="Red" value="red" variant="red" />,
  <Option key="orange" text="Orange" value="orange" variant="orange" />,
  <Option key="blue" text="Blue" value="blue" variant="blue" />,
  <Option key="purple" text="Purple" value="purple" variant="purple" />,
  <Option key="teal" text="Teal" value="teal" variant="teal" />,
  <Option key="lime" text="Lime" value="lime" variant="lime" />,
  <Option key="pink" text="Pink" value="pink" variant="pink" />,
  <Option key="slate" text="Slate" value="slate" variant="slate" />,
];

export const ChromaticSnapshot = () => (
  <Box
    p={4}
    display="grid"
    gridTemplateColumns="repeat(auto-fit, minmax(min(280px, 100%), 1fr))"
    gap="32px 16px"
  >
    <MultiSelect
      name="snapshot-empty-small"
      label="Empty — small"
      size="small"
      value={[]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-selected-small"
      label="Selected pills — small"
      size="small"
      value={["amber", "black"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-selected-medium"
      label="Selected pills — medium"
      value={["amber", "black", "blue"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-selected-large"
      label="Selected pills — large"
      size="large"
      value={["amber", "black"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-inline"
      label="Inline label and pills"
      labelInline
      value={["amber", "black"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-narrow-multiple-pills"
      label="Multiple pills in a narrow input"
      maxWidth="240px"
      value={["amber", "black", "blue"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-required"
      label="Required, hint and prefix"
      required
      inputHint="Choose one or more colors"
      prefix="Selected: "
      value={["amber", "black"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-readonly"
      label="Read only pills"
      readOnly
      value={["amber", "black"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-disabled"
      label="Disabled pills"
      disabled
      value={["amber", "black"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-error"
      label="Error above selected pills"
      error="Choose no more than two colors"
      validationMessagePositionTop
      value={["amber", "black"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-warning"
      label="Warning with selected pills"
      warning="Review your selection"
      value={["amber", "black"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-error-below"
      label="Error below selected pills"
      error="Choose no more than two colors"
      validationMessagePositionTop={false}
      value={["amber", "black"]}
      onChange={() => {}}
    >
      {snapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-colored-pills"
      label="Colored pill variants"
      value={[
        "grey",
        "green",
        "red",
        "orange",
        "blue",
        "purple",
        "teal",
        "lime",
        "pink",
        "slate",
      ]}
      onChange={() => {}}
    >
      {coloredSnapshotOptions}
    </MultiSelect>
    <MultiSelect
      name="snapshot-filled-pills"
      label="Filled pill variants"
      value={["green", "teal", "lime", "slate"]}
      onChange={() => {}}
    >
      <Option text="Green" value="green" variant="green" fill />
      <Option text="Teal" value="teal" variant="teal" fill />
      <Option text="Lime" value="lime" variant="lime" fill />
      <Option text="Slate" value="slate" variant="slate" fill />
    </MultiSelect>
    <MultiSelect
      name="snapshot-wrapped-pill"
      label="Wrapped long pill text"
      maxWidth="240px"
      wrapPillText
      value={["long"]}
      onChange={() => {}}
    >
      <Option text="Blue as the sky on a summer's day" value="long" />
    </MultiSelect>
    <MultiSelect
      name="snapshot-unwrapped-pill"
      label="Unwrapped long pill text"
      maxWidth="240px"
      wrapPillText={false}
      value={["long"]}
      onChange={() => {}}
    >
      <Option text="Blue as the sky on a summer's day" value="long" />
    </MultiSelect>
    <MultiSelect
      name="snapshot-unbroken-pill"
      label="Unbroken long pill text"
      maxWidth="240px"
      value={["long"]}
      onChange={() => {}}
    >
      <Option text="Veryveryveryveryveryveryverylongword" value="long" />
    </MultiSelect>
  </Box>
);
ChromaticSnapshot.storyName = "Chromatic Snapshot";
ChromaticSnapshot.parameters = {
  chromatic: { disableSnapshot: false, viewports: [1200, 768, 320] },
};
