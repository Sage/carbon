import React, { useState, useRef, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import {
  Select,
  Option,
  ActionOption,
  OptionGroupHeader,
  CustomSelectChangeEvent,
} from "..";
import Button from "../../button";
import Dialog from "../../dialog";
import Icon from "../../icon";
import Box from "../../box";
import Typography from "../../typography";
import Portrait from "../../portrait";
import Textbox from "../../textbox";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import SimpleSelect, { SimpleSelectProps } from "./simple-select.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof SimpleSelect> = {
  title: "Select",
  component: SimpleSelect,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
      theme: "sage",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimpleSelect>;

const DIALOG_CLOSE_FOCUS_DELAY = 350;

const PlaygroundStory = (args: Partial<SimpleSelectProps>) => {
  const [value, setValue] = useState(args.value ?? "select");

  useEffect(() => {
    setValue(args.value ?? "select");
  }, [args.value]);

  return (
    <Box height={500}>
      <Select
        {...args}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <Option text="Select an option" value="select" />
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Green" value="4" />
        <Option text="Orange" value="5" />
      </Select>
    </Box>
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundStory {...args} />,
  args: {
    label: "Color",
    size: "medium",
    variant: "typical",
    disabled: false,
    readOnly: false,
    required: false,
    isLoading: false,
    openOnFocus: false,
    labelInline: false,
    flipEnabled: true,
    enableVirtualScroll: false,
    virtualScrollOverscan: 5,
    disableNavigationLoop: false,
    typeaheadTimeout: 1500,
    value: "select",
  },
  parameters: {
    controls: {
      include: [
        "validationMessagePositionTop",
        "maxWidth",
        "inputWidth",
        "formattedValue",
        "inputHint",
        "prefix",
        "autoFocus",
        "warning",
        "error",
        "required",
        "value",
        "listMaxHeight",
        "flipEnabled",
        "typeaheadTimeout",
        "virtualScrollOverscan",
        "enableVirtualScroll",
        "disableNavigationLoop",
        "labelInline",
        "openOnFocus",
        "isLoading",
        "readOnly",
        "disabled",
        "variant",
        "size",
        "label",
      ],
    },
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    variant: {
      options: ["typical", "subtle"],
      control: { type: "radio" },
    },
    error: {
      control: { type: "text" },
    },
    warning: {
      control: { type: "text" },
    },
    inputWidth: {
      control: { type: "range", min: 10, max: 100, step: 10 },
    },
    listMaxHeight: {
      control: { type: "range", min: 80, max: 400, step: 20 },
    },
    typeaheadTimeout: {
      control: { type: "number", min: 0, step: 100 },
    },
    virtualScrollOverscan: {
      control: { type: "number", min: 0, step: 1 },
    },
  },
};
Playground.storyName = "Playground";

export const LazyLoading: Story = () => {
  const preventLoading = useRef(false);
  const [value, setValue] = useState("select");
  const [isLoading, setIsLoading] = useState(true);
  const [optionList, setOptionList] = useState<React.ReactElement[]>([]);

  function loadList() {
    if (preventLoading.current) {
      return;
    }

    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setOptionList([
        <Option text="Select an option" value="select" key="Select" />,
        <Option text="Amber" value="amber" key="Amber" />,
        <Option text="Black" value="black" key="Black" />,
        <Option text="Blue" value="blue" key="Blue" />,
        <Option text="Brown" value="brown" key="Brown" />,
        <Option text="Green" value="green" key="Green" />,
      ]);
      setIsLoading(false);
    }, 2000);
  }

  function reset() {
    setOptionList([]);
    setValue("select");
    setIsLoading(true);
    preventLoading.current = false;
  }

  return (
    <Box height={300}>
      <Button onClick={reset} mb={2}>
        Reset
      </Button>
      <Select
        name="lazyLoading"
        id="lazyLoading"
        label="Color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onOpen={loadList}
        isLoading={isLoading}
      >
        {optionList}
      </Select>
    </Box>
  );
};
LazyLoading.storyName = "Lazy Loading";

export const WithInfiniteScroll: Story = () => {
  const selectRef = useRef<HTMLInputElement>(null);
  const preventLoading = useRef(false);
  const preventLazyLoading = useRef(false);
  const lazyLoadingCounter = useRef(0);
  const [value, setValue] = useState("select");
  const [isLoading, setIsLoading] = useState(true);
  const asyncList = [
    <Option text="Select an option" value="select" key="Select" />,
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];
  const getLazyLoaded = () => {
    const counter = lazyLoadingCounter.current;
    return [
      <Option
        text={`Lazy Loaded A${counter}`}
        value={`lazyA${counter}`}
        key={`lazyA${counter}`}
      />,
      <Option
        text={`Lazy Loaded B${counter}`}
        value={`lazyB${counter}`}
        key={`lazyB${counter}`}
      />,
      <Option
        text={`Lazy Loaded C${counter}`}
        value={`lazyC${counter}`}
        key={`lazyC${counter}`}
      />,
    ];
  };
  const [optionList, setOptionList] = useState<React.ReactElement[]>([
    <Option text="Select an option" value="select" key="Select" />,
  ]);

  useEffect(() => {
    if (!isLoading) {
      selectRef.current?.focus();
    }
  }, [isLoading]);

  function loadList() {
    if (preventLoading.current) {
      return;
    }
    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setOptionList(asyncList);
      setIsLoading(false);
    }, 2000);
  }
  function onLazyLoading() {
    if (preventLazyLoading.current) {
      return;
    }
    preventLazyLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      preventLazyLoading.current = false;
      lazyLoadingCounter.current += 1;
      setOptionList((prevList) => [...prevList, ...getLazyLoaded()]);
      setIsLoading(false);
    }, 2000);
  }
  function clearData() {
    setOptionList([]);
    setValue("select");
    preventLoading.current = false;
  }
  return (
    <Box height={400}>
      <Button onClick={clearData} mb={2}>
        reset
      </Button>
      <Select
        ref={selectRef}
        name="infiniteScroll"
        id="infiniteScroll"
        label="color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onOpen={() => loadList()}
        isLoading={isLoading}
        onListScrollBottom={onLazyLoading}
      >
        {optionList}
      </Select>
    </Box>
  );
};
WithInfiniteScroll.storyName = "With infinite scroll";

export const Virtualised: Story = () => {
  const [value, setValue] = useState("0");
  return (
    <Box height={320}>
      <Select
        name="virtualised"
        id="virtualised"
        label="choose an option"
        labelInline
        enableVirtualScroll
        virtualScrollOverscan={20}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        {Array(10000)
          .fill(undefined)
          .map((_, index) => (
            <Option
              key={`option-${index + 1}`}
              value={`${index}`}
              text={index === 0 ? "Select an option" : `Option ${index + 1}`}
            />
          ))}
      </Select>
    </Box>
  );
};
Virtualised.storyName = "Virtualised";

export const SelectionConfirmedStory: Story = () => {
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  const [value, setValue] = useState("select");
  return (
    <Box height={380}>
      <Typography variant="strong">
        Selection Confirmed:{" "}
        {selectionConfirmed ? (
          <Icon type="tick" bg="primary" color="white" />
        ) : (
          <Icon type="cross" bg="red" color="white" />
        )}
      </Typography>
      <Select
        value={value}
        onChange={(ev: CustomSelectChangeEvent) => {
          setSelectionConfirmed(!!ev.selectionConfirmed);
          setValue(ev.target.value);
        }}
        name="selection confirmed"
        id="selection confirmed"
        label="color"
      >
        <Option text="Select an option" value="select" />
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
  );
};
SelectionConfirmedStory.storyName = "Selection Confirmed";

const options = ["Select an option", "A", "B", "C", "D", "E"];
const allOptions = ["All"];

export const SelectWithDynamicallyAddedOption: Story = () => {
  const [optionsList, setOptionsList] = useState(options);
  const [currentOption, setCurrentOption] = useState<string | null>(
    "Select an option",
  );
  useEffect(() => {
    if (currentOption && currentOption !== "Select an option") {
      setOptionsList([...allOptions, ...options]);
    }
  }, [currentOption]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentOption(e.target.value);
  };
  return (
    <Box height={320}>
      <Select
        label="Choose your option"
        data-role="selector"
        onChange={handleChange}
        value={currentOption || ""}
      >
        {optionsList.map((opt) => (
          <Option
            data-role={`option-${opt}`}
            text={opt}
            value={opt}
            key={opt}
          />
        ))}
      </Select>
    </Box>
  );
};
SelectWithDynamicallyAddedOption.storyName = "Dynamically Adding Options";

export const AddOptionFromDialog: Story = () => {
  const selectRef = useRef<HTMLInputElement>(null);
  const nextOptionId = useRef(4);
  const shouldRestoreSelectFocus = useRef(false);
  const [value, setValue] = useState("option-1");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [optionList, setOptionList] = useState([
    { value: "option-1", text: "Dropdown item 1" },
    { value: "option-2", text: "Dropdown item 2" },
    { value: "option-3", text: "Dropdown item 3" },
  ]);

  useEffect(() => {
    if (dialogOpen || !shouldRestoreSelectFocus.current) return;

    shouldRestoreSelectFocus.current = false;
    const focusTimer = window.setTimeout(
      () => selectRef.current?.focus(),
      DIALOG_CLOSE_FOCUS_DELAY,
    );

    return () => window.clearTimeout(focusTimer);
  }, [dialogOpen]);

  const closeDialogAndFocusSelect = () => {
    shouldRestoreSelectFocus.current = true;
    setDialogOpen(false);
  };

  const addOption = () => {
    const text = newOptionLabel.trim();
    if (!text) return;

    const optionValue = `option-${nextOptionId.current}`;
    nextOptionId.current += 1;
    setOptionList((currentOptions) => [
      ...currentOptions,
      { value: optionValue, text },
    ]);
    setNewOptionLabel("");
    closeDialogAndFocusSelect();
  };

  return (
    <Box height={300}>
      <Select
        ref={selectRef}
        name="addOption"
        id="addOption"
        label="Object"
        required
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <ActionOption
          value="add-option"
          text="Add an option"
          leading={<Icon type="add" />}
          onClick={() => setDialogOpen(true)}
        />
        {optionList.map((option) => (
          <Option key={option.value} {...option} />
        ))}
      </Select>

      <Dialog
        open={dialogOpen}
        onCancel={closeDialogAndFocusSelect}
        restoreFocusOnClose={false}
        title="Add an option"
        footer={
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={closeDialogAndFocusSelect}>Cancel</Button>
            <Button
              buttonType="primary"
              disabled={!newOptionLabel.trim()}
              onClick={addOption}
            >
              Add
            </Button>
          </Box>
        }
      >
        <Textbox
          autoFocus
          label="Option label"
          value={newOptionLabel}
          onChange={(event) => setNewOptionLabel(event.target.value)}
        />
      </Dialog>
    </Box>
  );
};
AddOptionFromDialog.storyName = "Add Option From Dialog";

export const ComplexCompositions: Story = () => {
  const [value, setValue] = useState("select");
  return (
    <Box height={500}>
      <Select
        name="complexCompositions"
        id="complexCompositions"
        label="Option compositions"
        listMaxHeight={400}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <Option text="Select an option" value="select" />
        <Option
          text="Option with an icon"
          value="1"
          leading={<Icon type="favourite" />}
        />
        <Option text="Option with a divider" value="2" divider />
        <OptionGroupHeader label="Option heading" />
        <Option text="Option with a prefix" value="3" prefix="New " />
        <Option
          text="Option with subtext"
          value="4"
          subtext="Some helpful subtext"
        />
        <Option
          text="Option with an icon and portrait"
          value="5"
          leading={
            <>
              <Icon type="individual" />
              <Portrait initials="JD" size="XS" />
            </>
          }
        />
      </Select>
    </Box>
  );
};
ComplexCompositions.storyName = "Complex Compositions";
