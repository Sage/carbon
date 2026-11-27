import React, { useState, useRef, useEffect, useMemo } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import Button from "../../button/__next__";
import Box from "../../box";
import Dialog from "../../dialog";
import Icon from "../../icon";
import Portrait from "../../portrait";
import Textbox from "../../textbox";
import Typography from "../../typography";
import { MultiSelect, Option, ActionOption, OptionGroupHeader } from "..";
import type { CustomSelectChangeEvent } from "../simple-select";
import type { MultiSelectProps } from "./multi-select.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof MultiSelect> = {
  title: "Select/MultiSelect",
  component: MultiSelect,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: {
      chromatic: {
        theme: "sage",
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const DIALOG_CLOSE_FOCUS_DELAY = 350;

const PLAYGROUND_VIRTUAL_OPTION_COUNT = 10000;

const PlaygroundStory = (args: MultiSelectProps) => {
  const [value, setValue] = useState(args.value ?? []);

  useEffect(() => {
    setValue(args.value ?? []);
  }, [args.value]);

  const virtualOptions = useMemo(() => {
    if (!args.enableVirtualScroll) return null;

    return Array.from(
      { length: PLAYGROUND_VIRTUAL_OPTION_COUNT - 5 },
      (_, index) => {
        const optionNumber = index + 6;
        return (
          <Option
            key={optionNumber}
            text={`Color ${optionNumber}`}
            value={String(optionNumber)}
          />
        );
      },
    );
  }, [args.enableVirtualScroll]);

  return (
    <Box height={500}>
      {args.isLoading && (
        <Typography mb={2}>
          The loading spinner appears at the end of the option list. Scroll down
          to see it.
        </Typography>
      )}
      <MultiSelect
        {...args}
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Green" value="4" />
        <Option text="Orange" value="5" />
        {virtualOptions}
      </MultiSelect>
    </Box>
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundStory {...args} />,
  args: {
    label: "Color",
    inputHint: "Select an option",
    size: "medium",
    disabled: false,
    readOnly: false,
    required: false,
    isLoading: false,
    openOnFocus: false,
    labelInline: false,
    flipEnabled: true,
    enableVirtualScroll: false,
    virtualScrollOverscan: 5,
    value: [],
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
        "listMaxHeight",
        "flipEnabled",
        "virtualScrollOverscan",
        "enableVirtualScroll",
        "labelInline",
        "openOnFocus",
        "isLoading",
        "readOnly",
        "disabled",
        "size",
        "label",
        "wrapPillText",
      ],
    },
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    error: { control: { type: "text" } },
    warning: { control: { type: "text" } },
    inputWidth: {
      control: { type: "range", min: 10, max: 100, step: 10 },
    },
    listMaxHeight: {
      control: { type: "range", min: 80, max: 400, step: 20 },
    },
    virtualScrollOverscan: {
      control: { type: "number", min: 0, step: 1 },
    },
  },
};
Playground.storyName = "Playground";

export const WithCustomColoredPills: Story = () => {
  const [value, setValue] = useState<string[]>(["1", "3"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }

  return (
    <Box height={250}>
      <MultiSelect
        name="simple"
        id="simple"
        label="color"
        value={value}
        onChange={onChangeHandler}
      >
        <Option text="Grey" value="1" variant="grey" />
        <Option text="Green" value="2" variant="green" fill />
        <Option text="Red" value="3" variant="red" />
        <Option text="Orange" value="4" variant="orange" />
        <Option text="Blue" value="5" variant="blue" />
        <Option text="Purple" value="6" variant="purple" />
        <Option text="Teal" value="7" variant="teal" fill />
        <Option text="Lime" value="8" variant="lime" fill />
        <Option text="Pink" value="9" variant="pink" />
        <Option text="Slate" value="10" variant="slate" fill />
      </MultiSelect>
    </Box>
  );
};
WithCustomColoredPills.storyName = "With Custom Colored Pills";

export const PillsWithLongText: Story = () => {
  const [value, setValue] = useState<string[]>(["1"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }

  return (
    <Box height={250} maxWidth="200px">
      <MultiSelect
        name="long-pill-text-wrapped"
        id="long-pill-text-wrapped"
        label="long pill text wrapped"
        wrapPillText
        value={value}
        onChange={onChangeHandler}
      >
        <Option text="Amber is the colour" value="1" />
        <Option text="Black is the colour" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
      </MultiSelect>
    </Box>
  );
};
PillsWithLongText.storyName = "Pills with Long Text";

const DEMO_LOADING_DELAY = 6000;

export const LazyLoading: Story = () => {
  const preventLoading = useRef(false);
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [optionList, setOptionList] = useState<React.ReactElement[]>([]);

  useEffect(
    () => () => {
      if (loadTimer.current !== null) clearTimeout(loadTimer.current);
    },
    [],
  );

  function loadList() {
    if (preventLoading.current) {
      return;
    }

    preventLoading.current = true;
    setIsLoading(true);
    loadTimer.current = setTimeout(() => {
      setOptionList([
        <Option text="Amber" value="amber" key="Amber" />,
        <Option text="Black" value="black" key="Black" />,
        <Option text="Blue" value="blue" key="Blue" />,
        <Option text="Brown" value="brown" key="Brown" />,
        <Option text="Green" value="green" key="Green" />,
      ]);
      setIsLoading(false);
      loadTimer.current = null;
    }, DEMO_LOADING_DELAY);
  }

  function reset() {
    if (loadTimer.current !== null) clearTimeout(loadTimer.current);
    loadTimer.current = null;
    setOptionList([]);
    setValue([]);
    setIsLoading(true);
    preventLoading.current = false;
  }

  return (
    <Box height={300}>
      <Button onClick={reset} mb={2}>
        Reset
      </Button>
      <MultiSelect
        name="lazyLoading"
        id="lazyLoading"
        label="Color"
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
        onOpen={loadList}
        isLoading={isLoading}
      >
        {optionList}
      </MultiSelect>
    </Box>
  );
};
LazyLoading.storyName = "Lazy Loading";

const INFINITE_SCROLL_BATCH_SIZE = 20;

export const WithInfiniteScroll: Story = () => {
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState<string[]>(["1"]);
  const [optionCount, setOptionCount] = useState(INFINITE_SCROLL_BATCH_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => () => {
      if (loadTimer.current !== null) clearTimeout(loadTimer.current);
    },
    [],
  );

  function loadMoreOptions() {
    if (loadTimer.current !== null) return;

    setIsLoading(true);
    loadTimer.current = setTimeout(() => {
      setOptionCount((count) => count + INFINITE_SCROLL_BATCH_SIZE);
      setIsLoading(false);
      loadTimer.current = null;
    }, DEMO_LOADING_DELAY);
  }

  function reset() {
    if (loadTimer.current !== null) clearTimeout(loadTimer.current);
    loadTimer.current = null;
    setOptionCount(INFINITE_SCROLL_BATCH_SIZE);
    setValue(["1"]);
    setIsLoading(false);
  }

  return (
    <Box height={400}>
      <Typography mb={2}>
        Scroll to the bottom to load {INFINITE_SCROLL_BATCH_SIZE} more options.
        Currently {optionCount} options loaded.
      </Typography>
      <Button onClick={reset} mb={2}>
        Reset
      </Button>
      <MultiSelect
        name="infiniteScroll"
        id="infiniteScroll"
        label="Options"
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
        enableVirtualScroll={false}
        isLoading={isLoading}
        onListScrollBottom={loadMoreOptions}
      >
        {Array.from({ length: optionCount }, (_, index) => {
          const optionNumber = index + 1;
          return (
            <Option
              key={optionNumber}
              text={`Option ${optionNumber}`}
              value={String(optionNumber)}
            />
          );
        })}
      </MultiSelect>
    </Box>
  );
};
WithInfiniteScroll.storyName = "With infinite scroll";

export const Virtualised: Story = () => {
  const [value, setValue] = useState<string[]>(["0"]);
  return (
    <Box height={320}>
      <MultiSelect
        name="virtualised"
        id="virtualised"
        label="choose an option"
        labelInline
        enableVirtualScroll
        virtualScrollOverscan={20}
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
      >
        {Array(10000)
          .fill(undefined)
          .map((_, index) => (
            <Option
              key={`option-${index + 1}`}
              value={`${index}`}
              text={`Option ${index + 1}`}
            />
          ))}
      </MultiSelect>
    </Box>
  );
};
Virtualised.storyName = "Virtualised";

export const SelectionConfirmedStory: Story = () => {
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  const [value, setValue] = useState<string[]>(["1"]);
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
      <MultiSelect
        value={value}
        onChange={(event: CustomSelectChangeEvent) => {
          setSelectionConfirmed(!!event.selectionConfirmed);
          setValue(event.target.value as unknown as string[]);
        }}
        name="selection confirmed"
        id="selection confirmed"
        label="color"
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
      </MultiSelect>
    </Box>
  );
};
SelectionConfirmedStory.storyName = "Selection Confirmed";

const options = ["A", "B", "C", "D", "E"];
const allOptions = ["All"];

export const SelectWithDynamicallyAddedOption: Story = () => {
  const [optionsList, setOptionsList] = useState(options);
  const [currentOptions, setCurrentOptions] = useState<string[]>(["A"]);
  useEffect(() => {
    if (currentOptions.some((option) => option !== "A")) {
      setOptionsList([...allOptions, ...options]);
    }
  }, [currentOptions]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentOptions(event.target.value as unknown as string[]);
  };
  return (
    <Box height={320}>
      <MultiSelect
        label="Choose your option"
        data-role="selector"
        onChange={handleChange}
        value={currentOptions}
      >
        {optionsList.map((opt) => (
          <Option
            data-role={`option-${opt}`}
            text={opt}
            value={opt}
            key={opt}
          />
        ))}
      </MultiSelect>
    </Box>
  );
};
SelectWithDynamicallyAddedOption.storyName = "Dynamically Adding Options";

export const AddOptionFromDialog: Story = () => {
  const selectRef = useRef<HTMLInputElement>(null);
  const nextOptionId = useRef(4);
  const shouldRestoreSelectFocus = useRef(false);
  const [value, setValue] = useState<string[]>(["option-1"]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [optionLabelError, setOptionLabelError] = useState("");
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
    setOptionLabelError("");
    shouldRestoreSelectFocus.current = true;
    setDialogOpen(false);
  };

  const addOption = () => {
    const text = newOptionLabel.trim();
    if (!text) {
      setOptionLabelError("Enter an option label.");
      return;
    }

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
      <MultiSelect
        ref={selectRef}
        name="addOption"
        id="addOption"
        label="Object"
        required
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
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
      </MultiSelect>

      <Dialog
        open={dialogOpen}
        onCancel={closeDialogAndFocusSelect}
        restoreFocusOnClose={false}
        title="Add an option"
        footer={
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button variantType="subtle" onClick={closeDialogAndFocusSelect}>
              Cancel
            </Button>
            <Button onClick={addOption}>Add</Button>
          </Box>
        }
      >
        <Textbox
          autoFocus
          label="Option label"
          value={newOptionLabel}
          error={optionLabelError || undefined}
          onChange={(event) => {
            setNewOptionLabel(event.target.value);
            setOptionLabelError("");
          }}
        />
      </Dialog>
    </Box>
  );
};
AddOptionFromDialog.storyName = "Add Option From Dialog";

export const ComplexCompositions: Story = () => {
  const [value, setValue] = useState<string[]>(["1"]);
  return (
    <Box height={500}>
      <MultiSelect
        name="complexCompositions"
        id="complexCompositions"
        label="Option compositions"
        listMaxHeight={400}
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
      >
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
      </MultiSelect>
    </Box>
  );
};
ComplexCompositions.storyName = "Complex Compositions";
