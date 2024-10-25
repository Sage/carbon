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
import Box from "../box";
import Confirm from "../confirm";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";
import styledSystemProps from "../../../.storybook/utils/styled-system-props";

export default {
  title: "Date Input/Test",
  excludeStories: ["meta"],
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

export const MultipleDates: StoryObj<typeof DateInput> = () => {
  const [date, setDate] = useState("01/01/24");
  const [date2, setDate2] = useState("01/01/24");
  const [showDialog, setShowDialog] = useState(false);
  const [active, setActive] = useState<null | number>(null);

  return (
    <Box
      padding="25px"
      display="flex"
      flexDirection="row"
      gap="var(--spacing200)"
      minWidth="320px"
      maxWidth="1024px"
      boxSizing="border-box"
    >
      <DateInput
        disablePortal
        label="Component A"
        onChange={(e) => setDate(e.target.value.formattedValue)}
        value={date}
        onPickerOpen={() => {
          setActive(1);
        }}
        onPickerClose={() => {
          setShowDialog(true);
        }}
        disabled={active === 2}
      />
      <DateInput
        disablePortal
        label="Component B"
        onChange={(e) => setDate2(e.target.value.formattedValue)}
        value={date2}
        onPickerOpen={() => {
          setActive(2);
        }}
        onPickerClose={() => {
          setShowDialog(true);
        }}
        disabled={active === 1}
      />
      <Confirm
        open={showDialog}
        onConfirm={() => {
          setShowDialog(false);
          setActive(null);
        }}
      >
        content
      </Confirm>
    </Box>
  );
};
MultipleDates.storyName =
  "Multiple Dates with onPickerOpen and onPickerClose callbacks";
MultipleDates.parameters = { chromatic: { disableSnapshot: true } };
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

export const DateInputDayClick: Story = {
  render: () => <DateInputDefaultComponent />,
  play: async ({ canvasElement }) => {
    // This is required due to a known issue with the canvasElement not being the parent of the component when a Portal is used.
    // https://github.com/storybookjs/storybook/issues/26963
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = within(canvasElement.parentElement!);
    const dateInputElement = canvas.getByRole("textbox");

    await userEvent.click(dateInputElement);
    await waitFor(() => userInteractionPause(300));

    const dayElement = canvas.getByText("26");
    await userEvent.click(dayElement);
  },
};

DateInputDayClick.storyName = "Date Input Day Click";

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
    await waitFor(() => userInteractionPause(300));
    await userEvent.clear(dateInputElement);
    await waitFor(() => userInteractionPause(300));

    await userEvent.type(dateInputElement, "22/2/1978", { delay: 100 });
    await waitFor(() => userInteractionPause(300));
    await userEvent.keyboard("{enter}");
  },
};
