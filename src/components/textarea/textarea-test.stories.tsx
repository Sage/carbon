import React, { useState } from "react";
import { StoryObj } from "@storybook/react/*";
import Textarea, { TextareaProps } from ".";
import Dialog from "../dialog";
import Form from "../form";
import Box from "../box";
import Button from "../button";
import isChromatic from "../../../.storybook/isChromatic";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import useMultiInput from "../../hooks/use-multi-input";

interface TextareaTestProps extends TextareaProps {
  labelHelp?: string;
}

export default {
  title: "Textarea/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    labelAlign: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    rows: {
      control: {
        min: 0,
        max: 100,
        step: 1,
        type: "range",
      },
    },
    inputWidth: {
      control: {
        min: 0,
        max: 100,
        step: 1,
        type: "range",
      },
    },
    labelWidth: {
      control: {
        min: 0,
        max: 100,
        step: 1,
        type: "range",
      },
    },
    adaptiveLabelBreakpoint: {
      control: {
        type: "number",
      },
    },
    children: {
      control: {
        type: "text",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    warning: {
      control: {
        type: "text",
      },
    },
    info: {
      control: {
        type: "text",
      },
    },
    characterLimit: {
      control: {
        type: "number",
      },
    },
    maxWidth: {
      control: {
        type: "text",
      },
    },
    borderRadius: {
      options: [
        "",
        "borderRadius000",
        "borderRadius010",
        "borderRadius025",
        "borderRadius050",
        "borderRadius100",
        "borderRadius200",
        "borderRadius400",
        "borderRadiusCircle",
      ],
      control: {
        type: "select",
      },
    },
    hideBorders: {
      control: {
        type: "boolean",
      },
    },
    minHeight: {
      control: {
        type: "number",
      },
    },
  },
  args: {
    expandable: false,
    rows: 0,
    disabled: false,
    autoFocus: false,
    readOnly: false,
    placeholder: "",
    fieldHelp: "",
    characterLimit: undefined,
    inputWidth: 100,
    label: "Textarea",
    labelHelp: "",
    labelInline: false,
    labelWidth: 30,
    labelAlign: undefined,
    adaptiveLabelBreakpoint: undefined,
    required: false,
    borderRadius: "borderRadius050",
    hideBorders: false,
  },
};

export const Default = ({
  placeholder,
  label,
  labelHelp,
  characterLimit,
  fieldHelp,
  ...args
}: TextareaTestProps) => {
  const [state, setState] = useState("");
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };
  return (
    <Textarea
      {...args}
      name="textarea"
      onChange={handleChange}
      value={state}
      placeholder={placeholder}
      label={label}
      labelHelp={labelHelp}
      helpAriaLabel={labelHelp}
      characterLimit={characterLimit}
      fieldHelp={fieldHelp}
    />
  );
};
Default.storyName = "Default";

export const Validation = () => {
  const { state, setValue } = useMultiInput();
  return (
    <>
      <Textarea
        label="Textarea"
        error="Error Message"
        mb={2}
        name="ta-error"
        value={state["ta-error"] || ""}
        onChange={setValue}
      />
      <Textarea
        label="Textarea"
        warning="Warning Message"
        mb={2}
        name="ta-warning"
        value={state["ta-warning"] || ""}
        onChange={setValue}
      />
      <Textarea
        label="Textarea"
        info="Info Message"
        mb={2}
        name="ta-info"
        value={state["ta-info"] || ""}
        onChange={setValue}
      />

      <Textarea
        label="Textarea"
        error="Error Message"
        validationOnLabel
        mb={2}
        name="ta-error-vol"
        value={state["ta-error-vol"] || ""}
        onChange={setValue}
      />
      <Textarea
        label="Textarea"
        warning="Warning Message"
        validationOnLabel
        mb={2}
        name="ta-warn-vol"
        value={state["ta-warn-vol"] || ""}
        onChange={setValue}
      />
      <Textarea
        label="Textarea"
        info="Info Message"
        validationOnLabel
        mb={2}
        name="ta-info-vol"
        value={state["ta-info-vol"] || ""}
        onChange={setValue}
      />

      <Textarea
        label="Textarea"
        error
        mb={2}
        name="ta-error-bool"
        value={state["ta-error-bool"] || ""}
        onChange={setValue}
      />
      <Textarea
        label="Textarea"
        warning
        mb={2}
        name="ta-warn-bool"
        value={state["ta-warn-bool"] || ""}
        onChange={setValue}
      />
      <Textarea
        label="Textarea"
        info
        mb={2}
        name="ta-info-bool"
        value={state["ta-info-bool"] || ""}
        onChange={setValue}
      />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = () => {
  const { state, setValue } = useMultiInput();

  return (
    <CarbonProvider validationRedesignOptIn>
      <Textarea
        label="Textarea"
        error="Error Message"
        mb={2}
        name="ta-error"
        value={state["ta-error"] || ""}
        onChange={setValue}
      />
      <Textarea
        label="Textarea"
        warning="Warning Message"
        mb={2}
        name="ta-warn"
        value={state["ta-warn"] || ""}
        onChange={setValue}
      />
      <Textarea
        validationMessagePositionTop={false}
        label="Textarea"
        error="Error Message"
        mb={2}
        name="ta-error-bottom"
        value={state["ta-error-bottom"] || ""}
        onChange={setValue}
      />
      <Textarea
        validationMessagePositionTop={false}
        label="Textarea"
        warning="Warning Message"
        name="ta-warn-bottom"
        value={state["ta-warn-bottom"] || ""}
        onChange={setValue}
      />
    </CarbonProvider>
  );
};
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const InScrollableContainer = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [value, setValue] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus in ornare quam viverra orci sagittis eu. Pellentesque nec nam aliquam sem et tortor consequat. Nibh sit amet commodo nulla. Cursus metus aliquam eleifend mi. Mi proin sed libero enim sed faucibus turpis in. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Est lorem ipsum dolor sit amet consectetur. Morbi enim nunc faucibus a pellentesque sit. Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Feugiat vivamus at augue eget arcu dictum varius. Eget velit aliquet sagittis id consectetur purus ut faucibus. Tincidunt arcu non sodales neque sodales. Ipsum faucibus vitae aliquet nec ullamcorper sit. Faucibus a pellentesque sit amet. Amet porttitor eget dolor morbi non. Arcu non odio euismod lacinia at quis risus sed vulputate. Blandit volutpat maecenas volutpat blandit. Purus ut faucibus pulvinar elementum integer enim neque. Viverra mauris in aliquam sem fringilla ut morbi. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Nibh mauris cursus mattis molestie a. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Consequat mauris nunc congue nisi vitae. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Eu facilisis sed odio morbi quis commodo. Ultrices vitae auctor eu augue ut lectus arcu. Ut tellus elementum sagittis vitae et leo duis ut. Sapien eget mi proin sed libero. Dictum non consectetur a erat nam at. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Pretium fusce id velit ut tortor pretium. Donec pretium vulputate sapien nec sagittis aliquam malesuada. Semper quis lectus nulla at volutpat diam.Velit dignissim sodales ut eu sem integer. In massa tempor nec feugiat nisl pretium fusce id. Eu scelerisque felis imperdiet proin fermentum. Amet purus gravida quis blandit. Feugiat in fermentum posuere urna nec tincidunt praesent. Sit amet mauris commodo quis. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Velit laoreet id donec ultrices tincidunt arcu non sodales neque. A scelerisque purus semper eget duis. Ut faucibus pulvinar elementum integer enim neque. Integer feugiat scelerisque varius morbi enim nunc faucibus a. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Egestas purus viverra accumsan in nisl nisi. Sed turpis tincidunt id aliquet risus feugiat in ante. In mollis nunc sed id semper risus in hendrerit gravida. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Ornare arcu dui vivamus arcu felis bibendum ut. Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio. Lacinia quis vel eros donec ac odio. Amet volutpat consequat mauris nunc congue nisi vitae. Ultrices dui sapien eget mi proin sed. Adipiscing bibendum est ultricies integer quis auctor elit. Sagittis nisl rhoncus mattis rhoncus urna neque. Integer enim neque volutpat ac tincidunt. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor.",
  );

  return (
    <Dialog
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      title="Title"
      subtitle="Subtitle"
      size="small"
    >
      <Form
        stickyFooter
        height="300px"
        leftSideButtons={
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        }
        saveButton={
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        }
      >
        <Textarea
          value={value}
          onChange={({ target }) => setValue(target.value)}
          expandable
          rows={5}
        />
      </Form>
    </Dialog>
  );
};

const defaultOpenState = isChromatic();
type StoryType = StoryObj<typeof Textarea>;

export const WithExpandableAndRows: StoryType = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [value, setValue] = useState("Generic text");

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
        size="small"
      >
        <Form
          stickyFooter
          height="300px"
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textarea
            value={value}
            onChange={({ target }) => setValue(target.value)}
            expandable
            rows={11}
          />
        </Form>
      </Dialog>
    </>
  );
};

WithExpandableAndRows.storyName =
  "With expandable and rows in a dialog with form";
WithExpandableAndRows.decorators = [
  (Story) => (
    <Box height="100vh" width="100vw">
      <Story />
    </Box>
  ),
];
WithExpandableAndRows.parameters = {
  chromatic: { disableSnapshot: false },
};

export const LabelAlign: StoryType = () => {
  const { state, setValue } = useMultiInput();

  return (
    <CarbonProvider validationRedesignOptIn>
      {["left", "right"].map((labelAlign) => (
        <Textarea
          key={labelAlign}
          label="Textarea"
          inputHint="help text"
          labelAlign={labelAlign as TextareaProps["labelAlign"]}
          mb={2}
          name={`ta-${labelAlign}`}
          value={state[`ta-${labelAlign}`] || ""}
          onChange={setValue}
        />
      ))}
    </CarbonProvider>
  );
};
LabelAlign.storyName = "With Label Align";
LabelAlign.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const AutoFocusStory = () => {
  const [value, setValue] = useState("");

  return (
    <Textarea
      label="Textarea"
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
AutoFocusStory.storyName = "Auto Focus";
AutoFocusStory.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
