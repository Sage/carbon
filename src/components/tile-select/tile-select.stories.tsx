import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Pill from "../pill";
import Icon from "../icon";
import Button from "../button";
import Box from "../box";
import Image from "../image";
import Typography from "../typography";
import { TileSelect, TileSelectGroup, TileSelectDeselectEvent } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof TileSelect> = {
  title: "Tile Select",
  component: TileSelect,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof TileSelect>;

export const Default: Story = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
      />
      <TileSelect
        value="3"
        id="3"
        aria-label="3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
            disabled
          />
        }
        description="Short and descriptive description"
      />
      <TileSelect
        value="4"
        id="4"
        aria-label="4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
      />
    </TileSelectGroup>
  );
};
Default.storyName = "Default";

export const WithCustomActionButton: Story = () => {
  const [value, setValue] = useState<string | null>(null);
  const [activated, setActivated] = useState(false);
  const [removed, setRemoved] = useState(false);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Pill pillRole="status" colorVariant="neutral">
            {activated ? "Active" : "Inactive"}
          </Pill>
        }
        description="Short and descriptive description"
        customActionButton={
          activated
            ? undefined
            : () => (
                <Button
                  onClick={() => {
                    setValue("1");
                    setActivated(true);
                  }}
                  buttonType="tertiary"
                  type="button"
                  size="small"
                >
                  Reactivate
                </Button>
              )
        }
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          removed ? undefined : (
            <Pill pillRole="status" colorVariant="neutral">
              Active
            </Pill>
          )
        }
        description="Short and descriptive description"
        customActionButton={(onClick) => (
          <Button
            onClick={() => {
              setRemoved(true);
              onClick();
            }}
            buttonType="tertiary"
            type="button"
            size="small"
            destructive
            disabled={removed}
          >
            Remove
          </Button>
        )}
      />
    </TileSelectGroup>
  );
};
WithCustomActionButton.storyName = "With Custom Action Button";

export const WithActionButtonAdornment: Story = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Pill pillRole="status" colorVariant="neutral">
            Inactive
          </Pill>
        }
        description="Short and descriptive description"
        customActionButton={() => (
          <Button
            onClick={() => setValue("1")}
            buttonType="tertiary"
            type="button"
            px={1}
            size="small"
            disabled
          >
            Reactivate
          </Button>
        )}
        actionButtonAdornment={
          <Icon
            type="info"
            tooltipMessage="This tile cannot be reactivated at this time"
          />
        }
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        customActionButton={(onClick) => (
          <Button
            onClick={onClick}
            buttonType="tertiary"
            type="button"
            px={1}
            size="small"
            destructive
            disabled
          >
            Remove
          </Button>
        )}
        actionButtonAdornment={
          <Icon
            type="info"
            tooltipMessage="This tile cannot be removed at this time"
          />
        }
      />
    </TileSelectGroup>
  );
};
WithActionButtonAdornment.storyName = "With Action Button Adornment";

export const MultiSelect: Story = () => {
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);
  const [value4, setValue4] = useState(false);

  return (
    <TileSelectGroup
      legend="Tile Select"
      description="Pick any number of available options"
      multiSelect
      name="Tile Select"
    >
      <TileSelect
        value="1"
        name="multi-1"
        id="multi-1"
        aria-label="multi-1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked={value1}
        onChange={(e) => setValue1(e.target.checked)}
      />
      <TileSelect
        value="2"
        name="multi-2"
        id="multi-2"
        aria-label="multi-2"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
        checked={value2}
        onChange={(e) => setValue2(e.target.checked)}
      />
      <TileSelect
        value="3"
        name="multi-3"
        id="multi-3"
        aria-label="multi-3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
            disabled
          />
        }
        description="Short and descriptive description"
        checked={value3}
        onChange={(e) => setValue3(e.target.checked)}
      />
      <TileSelect
        value="4"
        name="multi-4"
        id="multi-4"
        aria-label="multi-4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        checked={value4}
        onChange={(e) => setValue4(e.target.checked)}
      />
    </TileSelectGroup>
  );
};
MultiSelect.storyName = "Multi Select";

export const SingleTile: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };

  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
    />
  );
};
SingleTile.storyName = "Single Tile";

export const WithAFooter: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title Short and descriptive description"
      subtitle="Subtitle Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
      description="Short and descriptive description"
      footer={
        <Box pt={1} display="flex" alignItems="baseline">
          Here is some &nbsp;
          <Typography variant="strong">footer text</Typography>
          <Button
            ml={1}
            buttonType="tertiary"
            iconPosition="after"
            iconType="home"
          >
            Footer Button
          </Button>
        </Box>
      }
    />
  );
};
WithAFooter.storyName = "With a Footer";

export const WithAPrefixAdornment: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };

  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      checked={isChecked}
      prefixAdornment={
        <Image
          height="40px"
          width="40px"
          // eslint-disable-next-line global-require
          backgroundImage={`url(${require("../../../.assets/flexible.svg")})`}
        />
      }
      titleAdornment={<Pill>Message</Pill>}
      onChange={handleChange}
      description="Short and descriptive description"
    />
  );
};
WithAPrefixAdornment.storyName = "With a Prefix Adornment";

export const WithAdditionalInformation: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      titleAdornment={<Pill>Message</Pill>}
      description="Short and descriptive description"
      additionalInformation={
        <>
          <Pill fill mr={1} mb="4px">
            Further information
          </Pill>
          <Pill fill mr={1} mb="4px">
            Further information
          </Pill>
          <Pill fill mb={1}>
            Further information
          </Pill>
        </>
      }
      checked={isChecked}
      onChange={handleChange}
    />
  );
};
WithAdditionalInformation.storyName = "With Additional Information";

export const WithAccordionFooter: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
      prefixAdornment={
        <Image
          height="40px"
          width="40px"
          // eslint-disable-next-line global-require
          backgroundImage={`url(${require("../../../.assets/flexible.svg")})`}
        />
      }
      accordionContent={
        <Box display="flex" flexWrap="wrap">
          <Box flexGrow={1} pr={1}>
            <Box
              width="100%"
              height="100px"
              bg="primary"
              display="inline-block"
            />
          </Box>
          <Box flexGrow={1} pl={1}>
            <Box
              width="100%"
              height="100px"
              bg="primary"
              display="inline-block"
            />
          </Box>
        </Box>
      }
      accordionControl={(controlId, contentId) => (
        <Button
          buttonType="tertiary"
          iconPosition="before"
          iconType="chevron_down"
          data-element="accordion-button"
          onClick={() => setExpanded((expandedState) => !expandedState)}
          px={1}
          mt={2}
          aria-controls={contentId}
          aria-expanded={expanded}
          id={controlId}
        >
          {expanded ? "Close" : "Open"} accordion
        </Button>
      )}
      accordionExpanded={expanded}
    />
  );
};
WithAccordionFooter.storyName = "With Accordion Footer";

export const WithCustomSpacing: Story = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
      m={6}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
        mt={1}
      />
      <TileSelect
        value="3"
        id="3"
        aria-label="3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
            disabled
          />
        }
        description="Short and descriptive description"
        mt={1}
      />
      <TileSelect
        value="4"
        id="4"
        aria-label="4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        mt={1}
      />
    </TileSelectGroup>
  );
};
WithCustomSpacing.storyName = "With Custom Spacing";
