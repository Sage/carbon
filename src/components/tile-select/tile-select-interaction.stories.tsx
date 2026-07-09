import React, { useState } from "react";
import type { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { TileSelect, TileSelectGroup, TileSelectDeselectEvent } from ".";
import Button from "../button";
import Box from "../box";
import Pill from "../pill";
import Image from "../image";
import Typography from "../typography";
import Icon from "../icon";

import flexibleSvg from "../../../.assets/flexible.svg";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj;

export default {
  title: "Tile Select/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

const SnapshotComponent = () => {
  const [footerChecked, setFooterChecked] = useState(false);
  const [additionalChecked, setAdditionalChecked] = useState(false);
  const [accordionChecked, setAccordionChecked] = useState(false);
  const [accordionExpanded, setAccordionExpanded] = useState(true);
  const [spacingValue, setSpacingValue] = useState<string | null>(null);
  const [actionButtonValue, setActionButtonValue] = useState<string | null>(
    null,
  );

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <TileSelect
        value="1"
        id="footer-1"
        aria-label="footer-1"
        name="footer"
        title="Title Short and descriptive description"
        subtitle="Subtitle Short and descriptive description"
        checked={footerChecked}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
        ) => setFooterChecked(e.target.value !== null)}
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

      <TileSelect
        value="1"
        id="prefix-1"
        aria-label="prefix-1"
        name="prefix"
        title="Title"
        subtitle="Subtitle"
        checked
        data-role="tile-focus-target"
        prefixAdornment={
          <Image
            height="40px"
            width="40px"
            backgroundImage={`url("${flexibleSvg}")`}
          />
        }
        titleAdornment={<Pill>Message</Pill>}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
        ) => setAdditionalChecked(e.target.value !== null)}
        description="Short and descriptive description"
      />

      <TileSelect
        value="1"
        id="additional-1"
        aria-label="additional-1"
        name="additional"
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
        checked={additionalChecked}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
        ) => setAdditionalChecked(e.target.value !== null)}
      />

      <TileSelect
        value="1"
        id="accordion-1"
        aria-label="accordion-1"
        name="accordion"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked={accordionChecked}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
        ) => setAccordionChecked(e.target.value !== null)}
        data-role="pseudo-target"
        prefixAdornment={
          <Image
            height="40px"
            width="40px"
            backgroundImage={`url("${flexibleSvg}")`}
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
            onClick={() =>
              setAccordionExpanded((expandedState) => !expandedState)
            }
            px={1}
            mt={2}
            aria-controls={contentId}
            aria-expanded={accordionExpanded}
            id={controlId}
          >
            {accordionExpanded ? "Close" : "Open"} accordion
          </Button>
        )}
        accordionExpanded={accordionExpanded}
      />

      <TileSelectGroup
        name="action-button-adornment"
        value={actionButtonValue}
        legend="With Action Button Adornment"
        description="Pick one of the available options"
        onChange={(e) => setActionButtonValue(e.target.value)}
      >
        <TileSelect
          value="1"
          id="action-1"
          aria-label="action-1"
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
              onClick={() => setActionButtonValue("1")}
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
          id="action-2"
          aria-label="action-2"
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

      <TileSelectGroup
        name="Tile Select"
        value={spacingValue}
        legend="Tile Select"
        description="Pick one of the available options"
        onChange={(e) => setSpacingValue(e.target.value)}
        m={6}
      >
        <TileSelect
          value="1"
          id="spacing-1"
          aria-label="spacing-1"
          title="Title"
          subtitle="Subtitle"
          description="Short and descriptive description"
        />
        <TileSelect
          value="2"
          id="spacing-2"
          aria-label="spacing-2"
          title="Title"
          subtitle="Subtitle"
          titleAdornment={<Pill>Message</Pill>}
          description="Short and descriptive description"
          mt={1}
        />
        <TileSelect
          value="3"
          id="spacing-3"
          aria-label="spacing-3"
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
          id="spacing-4"
          aria-label="spacing-4"
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
    </Box>
  );
};

export const ChromaticSnapshot: Story = {
  render: () => <SnapshotComponent />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const firstInput = canvas.getAllByRole("checkbox")[0];
    await userEvent.tab();
    await expect(firstInput).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
  parameters: {
    pseudo: {
      hover: ['[data-role="pseudo-target"]'],
      focus: ['[data-role="pseudo-target"] button'],
    },
  },
};
