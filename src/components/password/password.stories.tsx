import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box/box.component";
import CarbonProvider from "../carbon-provider";
import Password from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Password> = {
  title: "Password",
  component: Password,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { themeProvider: { chromatic: { theme: "sage" } } },
};

export default meta;
type Story = StoryObj<typeof Password>;

const SIZES = ["small", "medium", "large"] as const;
const VALIDATIONS = ["error", "warning", "info"] as const;

export const Default: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Password label="Password" value={state} onChange={setValue} />;
};
Default.storyName = "Default";

export const ForceObscurity: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      forceObscurity
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
ForceObscurity.storyName = "Force Obscurity";

export const InputHint: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      inputHint="Hint text (optional)."
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
InputHint.storyName = "Input Hint";

export const CharacterCounter: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      label="Password"
      value={state}
      characterLimit={10}
      onChange={setValue}
    />
  );
};
CharacterCounter.storyName = "Character Counter";

export const Prefix: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      prefix="prefix"
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
Prefix.storyName = "Prefix";

export const Sizes: Story = () => {
  const [smallState, setSmallState] = useState("Password");
  const setSmallValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSmallState(target.value);
  };
  const [mediumState, setMediumState] = useState("Password");
  const setMediumValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setMediumState(target.value);
  };
  const [largeState, setLargeState] = useState("Password");
  const setLargeValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setLargeState(target.value);
  };

  return (
    <>
      <Password
        key="Password - Small"
        label="Password - Small"
        value={smallState}
        size="small"
        onChange={setSmallValue}
        mb={2}
      />
      <Password
        key="Password - Medium"
        label="Password - Medium"
        value={mediumState}
        size="medium"
        onChange={setMediumValue}
        mb={2}
      />
      <Password
        key="Password - Large"
        label="Password - Large"
        value={largeState}
        size="large"
        onChange={setLargeValue}
        mb={2}
      />
    </>
  );
};
Sizes.storyName = "Sizes";

export const Margins: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Password m={4} label="Password" value={state} onChange={setValue} />;
};
Margins.storyName = "Margins";

export const Disabled: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password disabled label="Password" value={state} onChange={setValue} />
  );
};
Disabled.storyName = "Disabled";

export const ReadOnly: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password readOnly label="Password" value={state} onChange={setValue} />
  );
};
ReadOnly.storyName = "Read Only";

export const AutoFocus: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password autoFocus label="Password" value={state} onChange={setValue} />
  );
};
AutoFocus.storyName = "Auto Focus";
AutoFocus.parameters = { chromatic: { disable: true } };

export const WithLabelInline: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password labelInline label="Password" value={state} onChange={setValue} />
  );
};
WithLabelInline.storyName = "With Label Inline";
WithLabelInline.parameters = { chromatic: { disable: true } };

export const WithLabelAlign: Story = () => {
  const [leftAlignState, setLeftAlignState] = useState("Password");
  const setVLeftAlignValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLeftAlignState(target.value);
  };

  const [rightAlignState, setRightAlignState] = useState("Password");
  const setRightAlignValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setRightAlignState(target.value);
  };

  return (
    <>
      <Password
        label="Password"
        labelInline
        value={leftAlignState}
        onChange={setVLeftAlignValue}
        inputWidth={50}
        key="left"
        labelAlign="left"
      />
      <Password
        label="Password"
        labelInline
        value={rightAlignState}
        onChange={setRightAlignValue}
        inputWidth={50}
        key="right"
        labelAlign="right"
      />
    </>
  );
};
WithLabelAlign.storyName = "With Label Align";

export const WithCustomLabelWidthAndInputWidth: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      labelWidth={50}
      inputWidth={50}
      labelInline
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
WithCustomLabelWidthAndInputWidth.storyName =
  "With Custom labelWidth and inputWidth";

export const WithCustomMaxWidth: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      maxWidth="70%"
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
WithCustomMaxWidth.storyName = "With Custom maxWidth";

export const WithFieldHelp: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      fieldHelp="help"
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
WithFieldHelp.storyName = "With fieldHelp";

export const WithLabelHelp: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      labelHelp="help"
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
WithLabelHelp.storyName = "With labelHelp";

export const WithRequired: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password required label="Password" value={state} onChange={setValue} />
  );
};
WithRequired.storyName = "With Required";

export const ValidationsAsAString: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <Box key={`${validationType}-string-component`}>
          <Password
            label="Password"
            value={state}
            onChange={setValue}
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Password
            label="Password - readOnly"
            value="Password"
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </Box>
      ))}
    </Box>
  );
};
ValidationsAsAString.storyName = "Validations - String - Component";

export const ValidationsAsAStringWithTooltipCustom: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <Box key={`${validationType}-string-component`}>
          <Password
            label="Password"
            value={state}
            onChange={setValue}
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </Box>
      ))}
    </Box>
  );
};
ValidationsAsAStringWithTooltipCustom.storyName =
  "Validations - String - With tooltipPosition Overriden - Component";
ValidationsAsAStringWithTooltipCustom.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsAsAStringDisplayedOnLabel: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <Box key={`${validationType}-string-label`}>
          <Password
            label="Password"
            value={state}
            onChange={setValue}
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Password
            label="Password - readOnly"
            value="Password"
            validationOnLabel
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </Box>
      ))}
    </Box>
  );
};
ValidationsAsAStringDisplayedOnLabel.storyName = "Validations - String - Label";

export const NewDesignsValidation: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Box>
      <CarbonProvider validationRedesignOptIn>
        {(["error", "warning"] as const).map((validationType) =>
          SIZES.map((size) => (
            <Box width="296px" key={`${validationType}-${size}`}>
              <Password
                m={4}
                label={`${size} - ${validationType}`}
                value={state}
                onChange={setValue}
                inputHint="Hint text (optional)"
                size={size}
                {...{ [validationType]: "Message" }}
              />
              <Password
                m={4}
                label={`readOnly - ${size} - ${validationType}`}
                value="Password"
                size={size}
                inputHint="Hint text (optional)."
                readOnly
                {...{ [validationType]: "Message" }}
              />
            </Box>
          )),
        )}
      </CarbonProvider>
    </Box>
  );
};
NewDesignsValidation.storyName = "Validations - String - New Design";

export const ValidationsAsAStringWithTooltipDefault: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <Box key={`${validationType}-string-label`}>
          <Password
            label="Password"
            value={state}
            onChange={setValue}
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </Box>
      ))}
    </Box>
  );
};
ValidationsAsAStringWithTooltipDefault.storyName =
  "Validations - String - With tooltipPosition overriden - Label";
ValidationsAsAStringWithTooltipDefault.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsAsABoolean: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <Box key={`${validationType}-boolean-component`}>
          <Password
            label="Password"
            value={state}
            onChange={setValue}
            {...{ [validationType]: true }}
            mb={2}
          />
          <Password
            label="Password - readOnly"
            value="Password"
            readOnly
            {...{ [validationType]: true }}
            mb={2}
          />
        </Box>
      ))}
    </Box>
  );
};
ValidationsAsABoolean.storyName = "Validations - Boolean";
