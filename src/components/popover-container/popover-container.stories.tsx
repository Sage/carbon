import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import { DraggableContainer, DraggableItem } from "../draggable";
import { Checkbox } from "../checkbox";
import Button from "../button";
import Link from "../link";
import Pill from "../pill";
import Badge from "../badge";
import isChromatic from "../../../.storybook/isChromatic";
import { Select, Option } from "../select";
import PopoverContainer, {
  PopoverContainerHandle,
} from "./popover-container.component";
import Textbox from "../textbox";
import Form from "../form";

const styledSystemProps = generateStyledSystemProps({
  padding: true,
});

const defaultOpenState = isChromatic();

const meta: Meta<typeof PopoverContainer> = {
  title: "Popover Container",
  component: PopoverContainer,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (Story) => (
      <>
        {defaultOpenState ? (
          <Box width="100vw" height="100vh">
            <Story />
          </Box>
        ) : (
          <Story />
        )}
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PopoverContainer>;

export const Default: Story = () => {
  return (
    <Box height={100}>
      <PopoverContainer
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
      >
        Contents
      </PopoverContainer>
    </Box>
  );
};
Default.story = {
  name: "Default",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Title: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <div style={{ height: 100 }}>
      <PopoverContainer
        title="With a title"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </div>
  );
};
Title.storyName = "Title";

export const RightPosition: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <div style={{ height: 150, float: "right", clear: "right" }}>
      <PopoverContainer
        title="Right Aligned"
        position="left"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </div>
  );
};
RightPosition.storyName = "Right Position";

export const CenterPosition: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height={150} display="flex" justifyContent="center">
      <PopoverContainer
        title="Center Aligned"
        position="center"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
};
CenterPosition.storyName = "Center Position";

export const BorderRadius: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height={100}>
      <PopoverContainer
        title="Border Radius"
        borderRadius="borderRadius000 borderRadius000 borderRadius200 borderRadius200"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
};
BorderRadius.storyName = "Border Radius";

export const Offset: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height={100}>
      <PopoverContainer
        title="Offset"
        offset={0}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
};
Offset.storyName = "Offset";

export const CoverButton: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <div style={{ height: 100 }}>
      <PopoverContainer
        title="Cover Button"
        shouldCoverButton
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Content
      </PopoverContainer>
    </div>
  );
};
CoverButton.storyName = "Cover Button";

export const RenderProps: Story = () => {
  return (
    <Box height={250}>
      <PopoverContainer
        title="Custom Open &amp; Close Button"
        renderOpenComponent={({
          isOpen,
          "data-element": dataElement,
          onClick,
          ref,
          "aria-label": ariaLabel,
          id,
          "aria-expanded": ariaExpanded,
          "aria-haspopup": ariaHasPopup,
        }) => (
          <Button
            iconType={!isOpen ? "filter_new" : "close"}
            iconPosition="after"
            data-element={dataElement}
            aria-label={ariaLabel}
            aria-haspopup={ariaHasPopup}
            aria-expanded={ariaExpanded}
            ref={ref}
            id={id}
            onClick={onClick}
          >
            Filter
          </Button>
        )}
        renderCloseComponent={({
          "data-element": dataElement,
          onClick,
          ref,
          "aria-label": ariaLabel,
        }) => (
          <Button
            data-element={dataElement}
            aria-label={ariaLabel}
            ref={ref}
            onClick={onClick}
          >
            Close
          </Button>
        )}
      >
        Content
      </PopoverContainer>
    </Box>
  );
};
RenderProps.storyName = "Render Props";

export const Controlled: Story = () => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <div style={{ height: 150 }}>
      <Button onClick={onOpen}>Open Popover</Button>
      <Button onClick={onClose} ml={2}>
        Close Popover
      </Button>
      <br />
      <PopoverContainer
        title="Controlled"
        open={open}
        onOpen={onOpen}
        onClose={onClose}
      >
        Contents
      </PopoverContainer>
    </div>
  );
};
Controlled.storyName = "Controlled";

export const Complex: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height={330}>
      <PopoverContainer
        title="Popover Container Title"
        open={open}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Link href="#example">This is example link text</Link>
        <Box p="25px 0 15px 0">
          <Button>Small</Button>
          <Button ml={2}>Compact</Button>
        </Box>
        <Box mt="4px" mb="4px">
          <Select
            name="simple"
            id="simple"
            label="color"
            labelInline
            value=""
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
        </Box>
        <DraggableContainer>
          <DraggableItem key="1" id={1}>
            <Checkbox
              name="one"
              label="Draggable Label One"
              checked
              onChange={() => {}}
            />
          </DraggableItem>
          <DraggableItem key="2" id={2}>
            <Checkbox
              name="two"
              label="Draggable Label Two"
              checked
              onChange={() => {}}
            />
          </DraggableItem>
          <DraggableItem key="3" id={3}>
            <Checkbox
              name="three"
              label="Draggable Label Three"
              checked
              onChange={() => {}}
            />
          </DraggableItem>
          <DraggableItem key="4" id={4}>
            <Checkbox
              name="four"
              label="Draggable Label Four"
              checked
              onChange={() => {}}
            />
          </DraggableItem>
        </DraggableContainer>
      </PopoverContainer>
    </Box>
  );
};
Complex.storyName = "Complex";

export const Filter: Story = () => {
  type OptionsType = {
    value: string;
    checked: boolean;
  };

  const initValues: OptionsType[] = [
    { value: "Option 1", checked: false },
    { value: "Option 2", checked: false },
    { value: "Option 3", checked: false },
  ];
  const [open, setOpen] = useState(defaultOpenState);
  const [options, setOptions] = useState<OptionsType[]>(initValues);
  const [filters, setFilters] = useState<OptionsType[]>([]);
  const clearAllOptions = () => {
    const temps = options;
    for (let i = 0; i < temps.length; i++) {
      temps[i].checked = false;
    }
    setOptions([...temps]);
  };
  const clearFilters = () => setFilters([]);
  const updateCheckValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temps = options;
    const findCorrectIndex = temps.findIndex(
      (item) => item.value === e.target.value,
    );
    if (findCorrectIndex !== -1) {
      temps[findCorrectIndex].checked = !temps[findCorrectIndex].checked;
      setOptions([...temps]);
    }
  };
  const updateFilters = () =>
    setFilters(options.filter((filter) => filter.checked === true));
  const handleBadgeClose = () => {
    clearAllOptions();
    clearFilters();
  };
  const applyFilters = () => {
    updateFilters();
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const renderCheckboxes = () => {
    const checkboxStyle = {
      marginBottom: "10px",
    };
    return options.map((option) => {
      return (
        <Checkbox
          onChange={updateCheckValue}
          style={checkboxStyle}
          label={option.value}
          name={option.value}
          value={option.value}
          checked={option.checked}
          key={option.value}
        />
      );
    });
  };
  const renderPills = () => {
    return filters.map((filter) => {
      return filter.checked ? (
        <Pill key={filter.value} mx={8}>
          {filter.value}
        </Pill>
      ) : null;
    });
  };
  return (
    <Box margin={2} height="280px">
      <PopoverContainer
        title="How to create Filter component"
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        renderOpenComponent={({ isOpen, ref, ...rest }) => (
          <Badge counter={filters.length} onClick={handleBadgeClose}>
            <Button
              mr={0}
              buttonType={isOpen ? "primary" : "darkBackground"}
              iconPosition="after"
              iconType={!isOpen ? "filter_new" : "close"}
              size="small"
              ref={ref}
              {...rest}
            >
              Filter
            </Button>
          </Badge>
        )}
        renderCloseComponent={undefined}
      >
        {renderCheckboxes()}
        <Button onClick={applyFilters} my={20}>
          Apply
        </Button>
      </PopoverContainer>
      {renderPills()}
    </Box>
  );
};
Filter.storyName = "Filter";

export const DisableAnimation: Story = () => {
  return (
    <Box height={100}>
      <PopoverContainer
        title="Disabled Animation Popover Container"
        disableAnimation
      >
        Contents
      </PopoverContainer>
    </Box>
  );
};
DisableAnimation.storyName = "Disable Animation";

export const FocusButton = () => {
  const [isPopOverOpen, setIsPopOverOpen] = useState(defaultOpenState);
  const ref = useRef<PopoverContainerHandle>(null);

  const handleCancel = () => {
    setIsPopOverOpen(false);
    ref.current?.focusButton();
  };

  return (
    <PopoverContainer
      p={0}
      ref={ref}
      containerAriaLabel="popover with form"
      open={isPopOverOpen}
      onOpen={() => setIsPopOverOpen(true)}
      onClose={() => setIsPopOverOpen(false)}
      renderOpenComponent={({ ...props }) => (
        <Button
          size="small"
          buttonType="secondary"
          iconType="settings"
          {...props}
        >
          popover
        </Button>
      )}
      renderCloseComponent={() => <></>}
    >
      <Form
        height="400px"
        onSubmit={() => {}}
        leftSideButtons={<Button onClick={() => handleCancel()}>Cancel</Button>}
        saveButton={
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        }
        stickyFooter
      >
        <Box m={2}>
          <Textbox label="Textbox" onChange={() => {}} value="" />
          <Textbox label="Textbox" onChange={() => {}} value="" />
          <Textbox label="Textbox" onChange={() => {}} value="" />
          <Textbox label="Textbox" onChange={() => {}} value="" />
          <Textbox label="Textbox" onChange={() => {}} value="" />
          <Textbox label="Textbox" onChange={() => {}} value="" />
        </Box>
      </Form>
    </PopoverContainer>
  );
};
FocusButton.storyName = "Focus Button Programmatically";
