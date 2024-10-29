import React, { useState } from "react";
import Button from "../button";
import Link from "../link";
import { DraggableContainer, DraggableItem } from "../draggable";
import { Checkbox } from "../checkbox";
import Pill from "../pill";
import Badge from "../badge";
import Box from "../box";
import { Select, Option } from "../select";
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
  return (
    <Box height="100">
      <PopoverContainer
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        title="select example"
      >
        <Select label="my select">
          <Option value="red" text="red" />
          <Option value="green" text="green" />
          <Option value="blue" text="blue" />
        </Select>
      </PopoverContainer>
    </Box>
  );
};

export const Title = () => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="100px">
      <PopoverContainer
        title="With a title"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
};

export const Position = () => {
  const [open, setOpen] = useState(false);
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

export const RenderProps = () => (
  <Box height="250px">
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

export const Controlled = () => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="150px">
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
    </Box>
  );
};

export const Complex = () => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="330px">
      <PopoverContainer
        title="Popover Container Title"
        open={open}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Link href="#example">This is example link text</Link>
        <Box padding="25px 0 15px 0">
          <Button>Small</Button>
          <Button ml={2}>Compact</Button>
        </Box>
        <Box mt="4px" mb="4px">
          <Select name="simple" id="simple" label="color" labelInline>
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
            <Checkbox name="one" label="Draggable Label One" />
          </DraggableItem>
          <DraggableItem key="2" id={2}>
            <Checkbox name="two" label="Draggable Label Two" />
          </DraggableItem>
          <DraggableItem key="3" id={3}>
            <Checkbox name="three" label="Draggable Label Three" />
          </DraggableItem>
          <DraggableItem key="4" id={4}>
            <Checkbox name="four" label="Draggable Label Four" />
          </DraggableItem>
        </DraggableContainer>
      </PopoverContainer>
    </Box>
  );
};

export const Filter = () => {
  type OptionsType = {
    value: string;
    checked: boolean;
  };

  const initValues: OptionsType[] = [
    { value: "Option 1", checked: false },
    { value: "Option 2", checked: false },
    { value: "Option 3", checked: false },
  ];
  const [open, setOpen] = useState(false);
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
        renderCloseComponent={() => {
          return <></>;
        }}
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
