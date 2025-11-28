import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import CarbonProvider from "../../carbon-provider/carbon-provider.component";
import Box from "../../box";
import Switch from ".";
import { useMultiInputBoolean } from "../../../hooks/use-multi-input/use-multi-input";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Label"
      name="switch-name"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};
Default.storyName = "Default";

export const WithInputHint: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <CarbonProvider validationRedesignOptIn>
      <Switch
        label="Label"
        name="switch-name"
        labelHint="Hint text"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    </CarbonProvider>
  );
};
WithInputHint.storyName = "With Input Hint";

export const Sizes: Story = () => {
  const { state, setValue } = useMultiInputBoolean();

  return (
    <>
      <Switch
        label="small"
        name="switch-small"
        size="small"
        mb={2}
        checked={state["switch-small"] || false}
        onChange={setValue}
      />
      <Switch
        label="large"
        name="switch-large"
        size="large"
        checked={state["switch-large"] || false}
        onChange={setValue}
      />
    </>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <Switch
        label="Disabled switch"
        disabled
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <Switch
        label="Disabled switch"
        disabled
        checked={!isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        mt={2}
      />
    </>
  );
};
Disabled.storyName = "Disabled";

export const Required: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Label"
      name="required"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      required
    />
  );
};
Required.storyName = "Required";

export const Loading: Story = () => {
  const [state1, setState1] = useState(true);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(true);
  const [state4, setState4] = useState(false);

  return (
    <>
      <Switch
        label="small on"
        size="small"
        loading
        mb={2}
        name="small-on-loader"
        checked={state1}
        onChange={(ev) => setState1(ev.target.checked)}
      />
      <Switch
        label="small off"
        size="small"
        loading
        mb={2}
        name="small-off-loader"
        checked={state2}
        onChange={(ev) => setState2(ev.target.checked)}
      />
      <Switch
        name="large-on-loader"
        checked={state3}
        onChange={(ev) => setState3(ev.target.checked)}
        label="large on"
        size="large"
        loading
        mb={2}
      />
      <Switch
        label="large off"
        size="large"
        name="large-off-loader"
        checked={state4}
        onChange={(ev) => setState4(ev.target.checked)}
        loading
        mb={2}
      />
    </>
  );
};
Loading.storyName = "Loading";

export const WithLabelInline: Story = () => {
  const { state, setValue } = useMultiInputBoolean();

  return (
    <>
      <Switch
        label="With labelInline"
        labelInline
        mb={2}
        name="with-label-inline"
        checked={state["with-label-inline"] || false}
        onChange={setValue}
      />
    </>
  );
};
WithLabelInline.storyName = "With labelInline";

export const WithDarkBackground: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  return (
    <Box m={2} padding={3} backgroundColor="#000000">
      <CarbonProvider validationRedesignOptIn>
        <Switch
          label="Example Switch"
          mb="2"
          fieldHelp="Field help text"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <Switch
          label="Example Switch"
          labelHint="Hint text"
          error="Error message"
          fieldHelp="Field help text"
          checked={isChecked2}
          onChange={(e) => setIsChecked2(e.target.checked)}
        />
      </CarbonProvider>
    </Box>
  );
};
WithDarkBackground.storyName = "With Dark Background";
