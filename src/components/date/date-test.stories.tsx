import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/test";

import DateInput, { DateChangeEvent } from "./date.component";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCaracters,
} from "../textbox/textbox-test.stories";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";
import styledSystemProps from "../../../.storybook/utils/styled-system-props";

export default {
  title: "Date Input/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: commonTextboxArgTypes(),
};

export const DateStory = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("2019-04-04");
  const setValue = (ev: DateChangeEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      name="dateinput"
      value={state}
      onChange={setValue}
      onBlur={(ev) => {
        action("onBlur")(ev.target.value);
      }}
      onKeyDown={(ev) =>
        action("onKeyDown")((ev.target as HTMLInputElement).value)
      }
      onClick={(ev) => action("onClick")((ev.target as HTMLInputElement).value)}
      {...getCommonTextboxArgsWithSpecialCaracters(args)}
    />
  );
};

DateStory.args = {
  minDate: "",
  maxDate: "",
  allowEmptyValue: false,
  mt: 0,
  ...getCommonTextboxArgs(),
};

export const NewValidationStory = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("2019-04-04");
  const setValue = (ev: DateChangeEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <DateInput
        name="dateinput"
        m={2}
        value={state}
        onChange={setValue}
        onBlur={(ev) => {
          action("onBlur")(ev.target.value);
        }}
        onKeyDown={(ev) =>
          action("onKeyDown")((ev.target as HTMLInputElement).value)
        }
        onClick={(ev) =>
          action("onClick")((ev.target as HTMLInputElement).value)
        }
        {...getCommonTextboxArgsWithSpecialCaracters(args)}
      />
    </CarbonProvider>
  );
};

NewValidationStory.args = {
  minDate: "",
  maxDate: "",
  allowEmptyValue: false,
  mt: 0,
  ...getCommonTextboxArgs(),
};

// Play Functions
const meta: Meta<typeof DateInput> = {
  title: "DateInput",
  component: DateInput,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export { meta };

type Story = StoryObj<typeof Date>;

const DateInputDefaultComponent = () => {
  const [state, setState] = useState("2019-04-04");
  const setValue = (ev: DateChangeEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      name="dateinput"
      value={state}
      onChange={setValue}
      onBlur={(ev) => {
        action("onBlur")(ev.target.value);
      }}
      onKeyDown={(ev) =>
        action("onKeyDown")((ev.target as HTMLInputElement).value)
      }
      onClick={(ev) => action("onClick")((ev.target as HTMLInputElement).value)}
    />
  );
};

export const DateInputClick: Story = {
  render: () => <DateInputDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dateInputElement = canvas.getByRole("textbox");

    await userEvent.click(dateInputElement);
  },
};

DateInputClick.storyName = "Date Input Click";

export const DateInputKeyboardInteraction: Story = {
  render: () => <DateInputDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dateInputElement = canvas.getByRole("textbox");

    await userEvent.click(dateInputElement);
    await waitFor(() => userInteractionPause(300));

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await waitFor(() => userInteractionPause(300));

    await userEvent.keyboard("{arrowdown}");
    await waitFor(() => userInteractionPause(300));

    await userEvent.keyboard("{arrowdown}");
    await waitFor(() => userInteractionPause(300));
  },
};

DateInputKeyboardInteraction.storyName = "Date Input Keyboard Interaction";

export const DateInputTyped: Story = {
  render: () => <DateInputDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dateInputElement = canvas.getByRole("textbox");

    await userEvent.click(dateInputElement);
  },
};
