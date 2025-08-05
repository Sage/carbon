import React, { useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Dialog, { DialogProps } from "./dialog.component";
import { DIALOG_SIZES } from "./dialog.config";

import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";
import Icon from "../icon";
import DateInput, { DateChangeEvent } from "../date";
import { Checkbox } from "../checkbox";
import { Select, Option } from "../select";
import TextEditor from "../text-editor";

import Box from "../box";
import Typography from "../typography";
import {
  FlexTileCell,
  FlexTileContainer,
  FlexTileDivider,
  Tile,
} from "../tile";
import { allModes } from "../../../.storybook/modes";
import { StepFlow } from "../step-flow";

export default {
  title: "Dialog/Test",
  component: Dialog,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    size: {
      options: DIALOG_SIZES,
      control: {
        type: "select",
      },
    },
    highlightVariant: {
      options: ["default", "ai"],
      control: {
        type: "select",
      },
    },
  },
};

interface StoryProps {
  stickyFooter: boolean;
}

export const Default = ({
  stickyFooter,
  title,
  subtitle,
  ...args
}: Partial<DialogProps> & StoryProps) => {
  const [date, setDate] = useState("01/06/2020");
  const [isOpen, setIsOpen] = useState(true);
  const handleCancel = (
    evt:
      | React.KeyboardEvent<HTMLElement>
      | KeyboardEvent
      | React.MouseEvent<HTMLElement>,
  ) => {
    setIsOpen(false);
    action("cancel")(evt);
  };
  const handleOpen = (evt: React.MouseEvent<HTMLElement>) => {
    setIsOpen(true);
    action("open")(evt);
  };

  const selectOptions = [
    {
      id: "1",
      name: "Orange",
    },
    {
      id: "2",
      name: "Blue",
    },
    {
      id: "3",
      name: "Green",
    },
    {
      id: "4",
      name: "Black",
    },
    {
      id: "5",
      name: "Yellow",
    },
    {
      id: "6",
      name: "White",
    },
    {
      id: "7",
      name: "Magenta",
    },
    {
      id: "8",
      name: "Cyan",
    },
    {
      id: "9",
      name: "Red",
    },
    {
      id: "10",
      name: "Grey",
    },
    {
      id: "11",
      name: "Purple",
    },
  ];
  return (
    <div>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={handleCancel}
        title={title}
        subtitle={subtitle}
        {...args}
      >
        <Form
          stickyFooter={stickyFooter}
          leftSideButtons={<Button onClick={handleCancel}>Cancel</Button>}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
          <DateInput
            name="date"
            label="Birthday"
            value={date}
            onChange={(e: DateChangeEvent) =>
              setDate(e.target.value.formattedValue)
            }
          />
          <Select label="Color">
            {selectOptions.map((option) => (
              <Option key={option.name} value={option} text={option.name} />
            ))}
          </Select>
          <Textbox label="Pet Name" />
          <DateInput
            name="date"
            label="Pet's birthday"
            value={date}
            onChange={(e: DateChangeEvent) =>
              setDate(e.target.value.formattedValue)
            }
          />
          <TextEditor labelText="Additional notes" />
          <Checkbox name="checkbox" label="Do you like my Dog" />
          <div>This is an example of a dialog with a Form as content</div>
        </Form>
      </Dialog>
    </div>
  );
};

Default.storyName = "default";
Default.args = {
  height: "",
  title: "Example Dialog",
  subtitle: "Example Subtitle",
  size: "medium",
  showCloseIcon: true,
  disableEscKey: false,
  stickyFooter: false,
};

type StoryType = StoryObj<typeof Dialog>;

export const WithTwoDifferentNodes: StoryType = (
  props: Partial<DialogProps>,
) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog
      open={isOpen}
      title="Example Dialog"
      subtitle={
        <>
          <Icon type="add" />
          <br />
          Subtitle line 2
        </>
      }
      showCloseIcon
      onCancel={() => setIsOpen(false)}
      {...props}
    >
      <Textbox label="Textbox1" value="Textbox1" />
      <Textbox label="Textbox2" value="Textbox2" />
      <Textbox label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

WithTwoDifferentNodes.storyName = "with two different nodes in subtitle";
WithTwoDifferentNodes.decorators = [
  (Story) => (
    <Box height="400px" width="100%">
      <Story />
    </Box>
  ),
];
WithTwoDifferentNodes.parameters = { chromatic: { disableSnapshot: false } };

export const MaxSizeTest: StoryType = () => {
  return (
    <Dialog size="maximise" open title="Title" subtitle="Subtitle">
      <Form
        stickyFooter
        leftSideButtons={<Button>Cancel</Button>}
        saveButton={
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        }
      >
        <Textbox label="First Name" />
        <Textbox label="Middle Name" />
        <Textbox label="Surname" />
        <Textbox label="Birth Place" />
        <Textbox label="Favourite Colour" />
        <Textbox label="Address" />
        <Textbox label="First Name" />
        <Textbox label="Middle Name" />
        <Textbox label="Surname" />
        <Textbox label="Birth Place" />
        <Textbox label="Favourite Colour" />
        <Textbox label="Address" />
      </Form>
    </Dialog>
  );
};

MaxSizeTest.storyName = "With Maximised Size";
MaxSizeTest.decorators = [
  (Story) => (
    <Box height="100vh" width="100vw">
      <Story />
    </Box>
  ),
];

MaxSizeTest.parameters = {
  themeProvider: { chromatic: { theme: "none" } },
  chromatic: { disableSnapshot: false, viewports: [1200, 900] },
  layout: "fullscreen",
};

export const MaxSizeTestNonOverflowedForm: StoryType = () => {
  return (
    <Dialog size="maximise" open title="Title" subtitle="Subtitle">
      <Form
        stickyFooter
        leftSideButtons={<Button>Cancel</Button>}
        saveButton={
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        }
      >
        <Textbox label="First Name" />
      </Form>
    </Dialog>
  );
};

MaxSizeTestNonOverflowedForm.storyName =
  "With Maximised Size and a Non-Overflowed Form";
MaxSizeTestNonOverflowedForm.decorators = [
  (Story) => (
    <Box height="100vh" width="100vw">
      <Story />
    </Box>
  ),
];

MaxSizeTestNonOverflowedForm.parameters = {
  themeProvider: { chromatic: { theme: "none" } },
  chromatic: {
    disableSnapshot: false,
    modes: {
      lg: allModes.lg,
      xsm: allModes.xsm,
    },
  },
  layout: "fullscreen",
};

export const DialogWithLongHeaderContent: StoryType = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
      modes: {
        lg: allModes.lg,
        xsm: allModes.xsm,
      },
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Box height="100vh" width="100vw">
        <Story />
      </Box>
    ),
  ],
  render: ({ size, ...args }) => (
    <Dialog
      {...args}
      size={size || "maximise"}
      open
      title={
        <Box width="100%">
          <Icon type="ledger" />
          <Typography variant="h1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam.
          </Typography>
        </Box>
      }
    >
      <Form
        stickyFooter
        leftSideButtons={<Button buttonType="primary">Submit</Button>}
      >
        <Box height="800px">
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
          <Tile mb={1} py={0}>
            <FlexTileContainer columnGap={6}>
              <FlexTileCell>
                <FlexTileDivider />
                <Box>1</Box>
              </FlexTileCell>
            </FlexTileContainer>
          </Tile>
        </Box>
      </Form>
    </Dialog>
  ),
};

export const WithButton = {
  render: () => {
    return (
      <Dialog open title="Dialog with Button">
        <Button onClick={() => {}}>This is a button</Button>
      </Dialog>
    );
  },
};

export const WithStickyForm: StoryType = {
  render: (args) => {
    const DialogForm = () => (
      <Form
        stickyFooter
        leftSideButtons={<Button onClick={() => {}}>Cancel</Button>}
        saveButton={
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        }
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
      </Form>
    );

    return (
      <Dialog fullscreen {...args}>
        <DialogForm />
      </Dialog>
    );
  },
  args: {
    open: true,
    title: "Example Dialog",
    subtitle: "I have a sticky form!",
    showCloseIcon: true,
    onCancel: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ height: 900, width: "100%" }}>
        <Story />
      </div>
    ),
  ],
};
WithStickyForm.storyName = "Fullscreen: With Sticky Form";

export const Nested: StoryType = () => {
  const [mainDialogOpen, setMainDialogOpen] = useState(false);

  const [nestedDialogOpen, setNestedDialogOpen] = useState(false);

  const handleMainDialogOpen = () => {
    setMainDialogOpen(true);
    action("main dialog open")();
  };

  const handleMainDialogCancel = () => {
    setMainDialogOpen(false);
    action("main dialog cancel")();
  };

  const handleNestedDialogOpen = () => {
    setNestedDialogOpen(true);
    action("nested dialog open")();
  };

  const handleNestedDialogCancel = () => {
    setNestedDialogOpen(false);
    action("nested dialog cancel")();
  };

  return (
    <>
      <Button onClick={handleMainDialogOpen}>Open Main Dialog</Button>
      <Dialog
        fullscreen
        open={mainDialogOpen}
        onCancel={handleMainDialogCancel}
        title="Main Dialog"
      >
        <Button onClick={handleNestedDialogOpen}>Open Nested Dialog</Button>
        <Dialog
          open={nestedDialogOpen}
          onCancel={handleNestedDialogCancel}
          title="Nested Dialog"
        >
          Nested Dialog Content
        </Dialog>
      </Dialog>
    </>
  );
};

Nested.storyName = "Fullscreen: Nested";
Nested.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithStepFlowInHeader: StoryType = {
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <Dialog fullscreen {...rest}>
        {children}
      </Dialog>
    );
  },
  args: {
    children: "Content",
    open: true,
    title: (
      <Box maxWidth="750px" width="100%" data-testid="test">
        <StepFlow
          category="category"
          title="title"
          currentStep={1}
          totalSteps={6}
          showProgressIndicator
        />
      </Box>
    ),
    showCloseIcon: false,
    onCancel: () => {},
  },
  decorators: [
    (Story) => (
      <Box height="900px" width="100%">
        <Story />
      </Box>
    ),
  ],
};
WithStepFlowInHeader.storyName = "Fullscreen: With StepFlow in header";

export const FullscreenWithTwoDifferentNodes: StoryType = ({
  ...props
}: Partial<DialogProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Dialog
        fullscreen
        focusFirstElement={ref}
        open={isOpen}
        showCloseIcon
        title="Example Dialog Full Screen"
        subtitle={
          <>
            <Icon type="add" />
            <br />
            Subtitle line 2
          </>
        }
        onCancel={() => setIsOpen(false)}
        {...props}
      >
        <Textbox label="Textbox1" value="Textbox1" />
        <Textbox label="Textbox2" value="Textbox2" />
        <Textbox label="Textbox3" value="Textbox3" />
      </Dialog>
    </>
  );
};

FullscreenWithTwoDifferentNodes.storyName =
  "Fullscreen: With two different nodes in subtitle";
FullscreenWithTwoDifferentNodes.decorators = [
  (Story) => (
    <div style={{ height: 900, width: "100%" }}>
      <Story />
    </div>
  ),
];
FullscreenWithTwoDifferentNodes.parameters = {
  layout: "fullscreen",
};

export const WithWrappedStickyForm: StoryType = {
  args: {
    children: (
      <Box p="0px 40px" minHeight="0">
        <Form
          stickyFooter
          leftSideButtons={<Button onClick={() => {}}>Cancel</Button>}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
        </Form>
      </Box>
    ),
    fullscreen: true,
    open: true,
    onCancel: () => {},
    title: "Title",
    subtitle: "Subtitle",
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
WithWrappedStickyForm.storyName = "Fullscreen: With Wrapped Sticky Form";

export const WithLongTitle: StoryType = {
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <Dialog fullscreen {...rest}>
        {children}
      </Dialog>
    );
  },
  args: {
    children:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias labore nostrum quo deserunt repellendus accusamus facilis voluptatem? Dicta illo esse non! Corrupti suscipit reprehenderit ea nesciunt delectus. Non voluptate expedita, repellendus ea vitae dolor nobis aperiam ullam unde ducimus aliquam quidem veniam necessitatibus, suscipit eaque exercitationem aut corrupti, qui ipsa.",
    open: true,
    title:
      "Really long title for Dialog Full Screen that should wrap in small screens",
    subtitle: "Subtitle",
    showCloseIcon: true,
    onCancel: () => {},
  },
};

WithLongTitle.storyName = "Fullscreen: With Long Title";
WithLongTitle.parameters = {
  chromatic: { disableSnapshot: false, viewports: [500] },
  themeProvider: { chromatic: { theme: "sage" } },
};
