import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
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

export const PillVariationsAndFocus = {
  render: () => {
    const noop = () => {};
    return (
      <>
        <Box>
          <Pill wrapText mb={1} maxWidth="100px">
            ThisIsAVeryLongWordThatShouldWrap
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill size="S" mr={1}>
            default
          </Pill>
          <Pill size="S" fill mr={1}>
            default
          </Pill>
          <Pill size="S" onDelete={noop} mr={1}>
            default
          </Pill>
          <Pill size="S" onDelete={noop} fill data-role="default-pill">
            default
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill size="M" mr={1}>
            default
          </Pill>
          <Pill size="M" fill mr={1}>
            default
          </Pill>
          <Pill size="M" onDelete={noop} mr={1}>
            default
          </Pill>
          <Pill size="M" onDelete={noop} fill data-role="default-pill">
            default
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill size="L" mr={1}>
            default
          </Pill>
          <Pill size="L" fill mr={1}>
            default
          </Pill>
          <Pill size="L" onDelete={noop} mr={1}>
            default
          </Pill>
          <Pill size="L" onDelete={noop} fill data-role="default-pill">
            default
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill size="XL" mr={1}>
            default
          </Pill>
          <Pill size="XL" fill mr={1}>
            default
          </Pill>
          <Pill size="XL" onDelete={noop} mr={1}>
            default
          </Pill>
          <Pill size="XL" onDelete={noop} fill data-role="default-pill">
            default
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" size="S" mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" size="S" fill mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" size="S" onDelete={noop} mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" size="S" onDelete={noop} fill>
            neutral
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" fill mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" onDelete={noop} mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" onDelete={noop} fill>
            neutral
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" size="L" mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" size="L" fill mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" size="L" onDelete={noop} mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" size="L" onDelete={noop} fill>
            neutral
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" size="XL" mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" size="XL" fill mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" size="XL" onDelete={noop} mr={1}>
            neutral
          </Pill>
          <Pill pillRole="status" size="XL" onDelete={noop} fill>
            neutral
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="positive" size="S" mr={1}>
            positive
          </Pill>
          <Pill pillRole="status" colorVariant="positive" size="S" fill mr={1}>
            positive
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="positive"
            size="S"
            onDelete={noop}
            mr={1}
          >
            positive
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="positive"
            size="S"
            onDelete={noop}
            fill
          >
            positive
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="positive" mr={1}>
            positive
          </Pill>
          <Pill pillRole="status" colorVariant="positive" fill mr={1}>
            positive
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="positive"
            onDelete={noop}
            mr={1}
          >
            positive
          </Pill>
          <Pill pillRole="status" colorVariant="positive" onDelete={noop} fill>
            positive
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="positive" size="L" mr={1}>
            positive
          </Pill>
          <Pill pillRole="status" colorVariant="positive" size="L" fill mr={1}>
            positive
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="positive"
            size="L"
            onDelete={noop}
            mr={1}
          >
            positive
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="positive"
            size="L"
            onDelete={noop}
            fill
          >
            positive
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="positive" size="XL" mr={1}>
            positive
          </Pill>
          <Pill pillRole="status" colorVariant="positive" size="XL" fill mr={1}>
            positive
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="positive"
            size="XL"
            onDelete={noop}
            mr={1}
          >
            positive
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="positive"
            size="XL"
            onDelete={noop}
            fill
          >
            positive
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="negative" size="S" mr={1}>
            negative
          </Pill>
          <Pill pillRole="status" colorVariant="negative" size="S" fill mr={1}>
            negative
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="negative"
            size="S"
            onDelete={noop}
            mr={1}
          >
            negative
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="negative"
            size="S"
            onDelete={noop}
            fill
          >
            negative
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="negative" mr={1}>
            negative
          </Pill>
          <Pill pillRole="status" colorVariant="negative" fill mr={1}>
            negative
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="negative"
            onDelete={noop}
            mr={1}
          >
            negative
          </Pill>
          <Pill pillRole="status" colorVariant="negative" onDelete={noop} fill>
            negative
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="negative" size="L" mr={1}>
            negative
          </Pill>
          <Pill pillRole="status" colorVariant="negative" size="L" fill mr={1}>
            negative
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="negative"
            size="L"
            onDelete={noop}
            mr={1}
          >
            negative
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="negative"
            size="L"
            onDelete={noop}
            fill
          >
            negative
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="negative" size="XL" mr={1}>
            negative
          </Pill>
          <Pill pillRole="status" colorVariant="negative" size="XL" fill mr={1}>
            negative
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="negative"
            size="XL"
            onDelete={noop}
            mr={1}
          >
            negative
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="negative"
            size="XL"
            onDelete={noop}
            fill
          >
            negative
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="warning" size="S" mr={1}>
            warning
          </Pill>
          <Pill pillRole="status" colorVariant="warning" size="S" fill mr={1}>
            warning
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="warning"
            size="S"
            onDelete={noop}
            mr={1}
          >
            warning
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="warning"
            size="S"
            onDelete={noop}
            fill
          >
            warning
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="warning" mr={1}>
            warning
          </Pill>
          <Pill pillRole="status" colorVariant="warning" fill mr={1}>
            warning
          </Pill>
          <Pill pillRole="status" colorVariant="warning" onDelete={noop} mr={1}>
            warning
          </Pill>
          <Pill pillRole="status" colorVariant="warning" onDelete={noop} fill>
            warning
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="warning" size="L" mr={1}>
            warning
          </Pill>
          <Pill pillRole="status" colorVariant="warning" size="L" fill mr={1}>
            warning
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="warning"
            size="L"
            onDelete={noop}
            mr={1}
          >
            warning
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="warning"
            size="L"
            onDelete={noop}
            fill
          >
            warning
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="warning" size="XL" mr={1}>
            warning
          </Pill>
          <Pill pillRole="status" colorVariant="warning" size="XL" fill mr={1}>
            warning
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="warning"
            size="XL"
            onDelete={noop}
            mr={1}
          >
            warning
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="warning"
            size="XL"
            onDelete={noop}
            fill
          >
            warning
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="information" size="S" mr={1}>
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            size="S"
            fill
            mr={1}
          >
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            size="S"
            onDelete={noop}
            mr={1}
          >
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            size="S"
            onDelete={noop}
            fill
          >
            information
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="information" mr={1}>
            information
          </Pill>
          <Pill pillRole="status" colorVariant="information" fill mr={1}>
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            onDelete={noop}
            mr={1}
          >
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            onDelete={noop}
            fill
          >
            information
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="information" size="L" mr={1}>
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            size="L"
            fill
            mr={1}
          >
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            size="L"
            onDelete={noop}
            mr={1}
          >
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            size="L"
            onDelete={noop}
            fill
          >
            information
          </Pill>
        </Box>
        <Box mb={1}>
          <Pill pillRole="status" colorVariant="information" size="XL" mr={1}>
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            size="XL"
            fill
            mr={1}
          >
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            size="XL"
            onDelete={noop}
            mr={1}
          >
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            size="XL"
            onDelete={noop}
            fill
          >
            information
          </Pill>
        </Box>
        <Box backgroundColor="#262626" p={2}>
          <Box mb={1}>
            <Pill mr={1} isDarkBackground>
              default
            </Pill>
            <Pill fill mr={1} isDarkBackground>
              default
            </Pill>
            <Pill onDelete={noop} mr={1} isDarkBackground>
              default
            </Pill>
            <Pill onDelete={noop} fill isDarkBackground>
              default
            </Pill>
          </Box>
          <Box mb={1}>
            <Pill pillRole="status" mr={1} isDarkBackground>
              neutral
            </Pill>
            <Pill pillRole="status" fill mr={1} isDarkBackground>
              neutral
            </Pill>
            <Pill pillRole="status" onDelete={noop} mr={1} isDarkBackground>
              neutral
            </Pill>
            <Pill pillRole="status" onDelete={noop} fill isDarkBackground>
              neutral
            </Pill>
          </Box>

          <Box mb={1}>
            <Pill
              pillRole="status"
              colorVariant="positive"
              mr={1}
              isDarkBackground
            >
              positive
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="positive"
              fill
              mr={1}
              isDarkBackground
            >
              positive
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="positive"
              onDelete={noop}
              mr={1}
              isDarkBackground
            >
              positive
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="positive"
              onDelete={noop}
              fill
              isDarkBackground
            >
              positive
            </Pill>
          </Box>

          <Box mb={1}>
            <Pill
              pillRole="status"
              colorVariant="negative"
              mr={1}
              isDarkBackground
            >
              negative
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="negative"
              fill
              mr={1}
              isDarkBackground
            >
              negative
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="negative"
              onDelete={noop}
              mr={1}
              isDarkBackground
            >
              negative
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="negative"
              onDelete={noop}
              fill
              isDarkBackground
            >
              negative
            </Pill>
          </Box>

          <Box mb={1}>
            <Pill
              pillRole="status"
              colorVariant="warning"
              mr={1}
              isDarkBackground
            >
              warning
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="warning"
              fill
              mr={1}
              isDarkBackground
            >
              warning
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="warning"
              onDelete={noop}
              mr={1}
              isDarkBackground
            >
              warning
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="warning"
              onDelete={noop}
              fill
              isDarkBackground
            >
              warning
            </Pill>
          </Box>

          <Box mb={1}>
            <Pill
              pillRole="status"
              colorVariant="information"
              mr={1}
              isDarkBackground
            >
              information
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="information"
              fill
              mr={1}
              isDarkBackground
            >
              information
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="information"
              onDelete={noop}
              mr={1}
              isDarkBackground
            >
              information
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="information"
              onDelete={noop}
              fill
              isDarkBackground
            >
              information
            </Pill>
          </Box>

          <Box mb={1}>
            <Pill
              pillRole="status"
              colorVariant="neutralWhite"
              fill
              mr={1}
              isDarkBackground
            >
              neutralWhite
            </Pill>
            <Pill
              pillRole="status"
              colorVariant="neutralWhite"
              onDelete={noop}
              fill
              isDarkBackground
            >
              neutralWhite
            </Pill>
          </Box>
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

export const WithCustomAriaLabels = ({ ...args }: PillProps) => {
  const noop = () => action("delete");

  const [selectedPills, setSelectedPills] = useState(["1", "4"]);
  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPills(event.target.value as unknown as string[]);
  };

  return (
    <>
      <Pill onDelete={noop} {...args}>
        Localised
      </Pill>
      <Pill
        ariaLabelOfRemoveButton="Remove the pill with a custom ARIA label value"
        onDelete={noop}
        {...args}
      >
        This should not be read out
      </Pill>

      <Pill ariaLabelOfRemoveButton="remove pill" onDelete={noop} {...args}>
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
