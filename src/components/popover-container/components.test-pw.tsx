import React, { useState } from "react";
import Button from "../button";
import Box from "../box";
import { Select, Option } from "../select";
import RadioButton, { RadioButtonGroup } from "../radio-button";
import PopoverContainer, {
  PopoverContainerProps,
} from "./popover-container.component";

export const Default = ({ title, open }: { title?: string; open: boolean }) => (
  <PopoverContainer title={title} open={open} />
);

export const PopoverContainerComponent = (
  props: Partial<PopoverContainerProps>,
) => {
  const [isOpen, setIsOpen] = useState(true);
  const onOpen = () => setIsOpen(isOpen);
  const onClose = () => setIsOpen(!isOpen);
  return (
    <Box height="150px" margin="100px">
      <PopoverContainer
        title="Playwright is awesome"
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        {...props}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
};

export const PopoverContainerComponentCoverButton = (
  props: Partial<PopoverContainerProps>,
) => {
  return (
    <Box height="150px" margin="100px">
      <PopoverContainer
        title="Playwright is awesome"
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        open
        {...props}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
};

export const PopoverContainerWithSelect = () => {
  const [value, setValue] = useState("");

  return (
    <Box height="100">
      <PopoverContainer
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        title="select example"
      >
        <Select
          label="my select"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <Option value="red" text="red" />
          <Option value="green" text="green" />
          <Option value="blue" text="blue" />
        </Select>
      </PopoverContainer>
    </Box>
  );
};

export const CoverButton = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="100px">
      <PopoverContainer
        title="Cover Button"
        shouldCoverButton
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        {children || "Contents"}
      </PopoverContainer>
    </Box>
  );
};

export const DisableAnimation = () => (
  <Box height="100px">
    <PopoverContainer
      title="Disabled Animation Popover Container"
      disableAnimation
    >
      Contents
    </PopoverContainer>
  </Box>
);

export const WithRenderOpenButtonComponent = () => (
  <Box height="100px">
    <PopoverContainerComponent
      open={false}
      renderOpenComponent={() => (
        <Button
          buttonType="primary"
          iconPosition="after"
          iconType="filter_new"
          size="medium"
        >
          Test
        </Button>
      )}
    />
  </Box>
);

export const WithRenderCloseButtonComponent = () => (
  <Box height="100px">
    <PopoverContainerComponent
      open
      renderCloseComponent={() => (
        <Button
          buttonType="primary"
          iconPosition="after"
          iconType="filter_new"
          size="medium"
        >
          Test
        </Button>
      )}
    />
  </Box>
);

export const PopoverContainerFocusOrder = (
  props: Partial<PopoverContainerProps>,
) => {
  const [isOpen, setIsOpen] = useState(true);
  const onOpen = () => setIsOpen(isOpen);
  const onClose = () => setIsOpen(!isOpen);
  return (
    <Box height="150px" margin="100px">
      <PopoverContainer
        title="Playwright is awesome"
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        {...props}
      >
        <button type="button">Inside container</button>
      </PopoverContainer>
      <button type="button">After open button</button>
    </Box>
  );
};

export const WithRadioButtons = () => {
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState("1");

  return (
    <Box padding="25px" display="inline-flex">
      <PopoverContainer
        position="left"
        onOpen={() => setOpen1(true)}
        onClose={() => setOpen1(false)}
        open={open1}
        renderOpenComponent={({ ref, onClick }) => (
          <Button aria-label="open" ref={ref} onClick={onClick}>
            With Radio children
          </Button>
        )}
        p={0}
      >
        <Box display="flex" justifyContent="space-between" p={2}>
          <RadioButtonGroup
            name="bar"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <RadioButton value="1" label="radio 1" />
            <RadioButton value="2" label="radio 2" />
          </RadioButtonGroup>
        </Box>
      </PopoverContainer>
      <Button>foo</Button>
    </Box>
  );
};
