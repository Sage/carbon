import React, { useState } from "react";
import { action } from "storybook/actions";
import Pill, { PillProps } from "./pill.component";
import Box from "../box";
import { MultiSelect, Option } from "../select";

export default {
  title: "Pill/Test",
  component: Pill,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    onDelete: {
      control: {
        type: "boolean",
      },
    },
  },
};

const noop = () => {};

const variants: NonNullable<PillProps["variant"]>[] = [
  "grey",
  "green",
  "red",
  "orange",
  "blue",
  "purple",
  "teal",
  "lime",
  "pink",
  "slate",
];
const sizes: PillProps["size"][] = ["S", "M", "L", "XL"];
const noInverseVariants: NonNullable<PillProps["variant"]>[] = [
  "teal",
  "lime",
  "pink",
  "slate",
];
const inverseVariants = variants.filter(
  (variant) => !noInverseVariants.includes(variant),
);

export const PillVariationsAndFocus = {
  render: () => {
    return (
      <>
        <Box>
          <Pill wrapText mb={1} maxWidth="100px">
            ThisIsAVeryLongWordThatShouldWrap
          </Pill>
        </Box>

        {sizes.map((size) => (
          <Box key={`size-${size}`} mb={1}>
            <Pill size={size} mr={1}>
              grey
            </Pill>
            <Pill size={size} variant="green" fill mr={1}>
              green
            </Pill>
            <Pill size={size} variant="blue" onDelete={noop} mr={1}>
              blue
            </Pill>
            <Pill
              size={size}
              variant="red"
              fill
              onDelete={noop}
              data-role="default-pill"
            >
              red
            </Pill>
          </Box>
        ))}

        <Box mb={1}>
          {variants.map((variant) => (
            <Pill key={`outline-${variant}`} variant={variant} mr={1} mb={1}>
              {variant}
            </Pill>
          ))}
        </Box>

        <Box mb={1}>
          {variants.map((variant) => (
            <Pill key={`fill-${variant}`} variant={variant} fill mr={1} mb={1}>
              {variant}
            </Pill>
          ))}
        </Box>

        <Box backgroundColor="#262626" p={2}>
          {inverseVariants.map((variant) => (
            <Box key={`inverse-${variant}`} mb={1}>
              <Pill variant={variant} inverse mr={1}>
                {variant}
              </Pill>
              <Pill variant={variant} fill inverse mr={1}>
                {variant}
              </Pill>
              <Pill variant={variant} onDelete={noop} inverse mr={1}>
                {variant}
              </Pill>
              <Pill variant={variant} onDelete={noop} fill inverse>
                {variant}
              </Pill>
            </Box>
          ))}
        </Box>
      </>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    pseudo: {
      focus: '[data-role="default-pill"] [data-element="close"]:first-of-type',
    },
  },
};

export const PillVariationsOnHover = {
  render: () => (
    // Required to prevent the hover styling applying to the next opened story
    <div data-role="hover">{PillVariationsAndFocus.render?.()}</div>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
    pseudo: {
      hover: '[data-role="hover"] button',
    },
  },
};

export const DeprecatedPropsCompatibility = {
  render: () => {
    return (
      <>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="positive" mr={1}>
            positive legacy
          </Pill>
          <Pill pillRole="status" colorVariant="negative" fill>
            negative legacy
          </Pill>
        </Box>

        <Box backgroundColor="#262626" p={2}>
          <Pill
            pillRole="status"
            colorVariant="neutralWhite"
            fill
            isDarkBackground
          >
            neutralWhite legacy
          </Pill>
        </Box>
      </>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export const WithCustomAriaLabels = ({ ...args }: PillProps) => {
  const noopAction = () => action("delete");

  const [selectedPills, setSelectedPills] = useState(["1", "4"]);
  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPills(event.target.value as unknown as string[]);
  };

  return (
    <>
      <Pill onDelete={noopAction} {...args}>
        Localised
      </Pill>
      <Pill
        ariaLabelOfRemoveButton="Remove the pill with a custom ARIA label value"
        onDelete={noopAction}
        {...args}
      >
        This should not be read out
      </Pill>

      <Pill
        ariaLabelOfRemoveButton="remove pill"
        onDelete={noopAction}
        {...args}
      >
        Prop passed but with default value
      </Pill>
      <br />
      <br />
      <MultiSelect
        name="multi-select-with-pills"
        value={selectedPills}
        onChange={handleActivityChange}
        onOpen={action("onOpen")}
        onClick={action("onClick")}
        onFilterChange={action("onFilterChange")}
        onFocus={action("onFocus")}
        onBlur={action("onBlur")}
        onKeyDown={action("onKeyDown")}
        openOnFocus
        label="Multi-Select with Pills"
        placeholder=" "
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
        <Option value="4" text="Four" />
        <Option value="5" text="Five" />
        <Option value="6" text="Six" />
        <Option value="7" text="Seven" />
        <Option value="8" text="Eight" />
        <Option value="9" text="Nine" />
        <Option value="10" text="Ten" />
      </MultiSelect>
    </>
  );
};
