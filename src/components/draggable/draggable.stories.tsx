import React from "react";
import styled from "styled-components";
import visuallyHiddenStyles from "../../style/utils/visually-hidden";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import {
  DraggableContainer,
  DraggableContainerProps,
  DraggableItem,
  DragHandle,
  useDraggableItemContext,
} from ".";
import Box from "../box";
import Card from "../card";
import { Tile } from "../tile";
import { ActionPopover, ActionPopoverItem } from "../action-popover";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof DraggableContainer> = {
  title: "Draggable",
  component: DraggableContainer,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: {
      chromatic: {
        theme: "sage",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DraggableContainer>;

const ReorderStatus = styled.div`
  ${visuallyHiddenStyles}
`;

// Consumer-owned announcements: getOrder runs for both dragging and moveTo.
const AnnouncedDraggableContainer = ({
  children,
  flexDirection,
  getLabel = (id) => `Item ${id}`,
}: Pick<DraggableContainerProps, "children" | "flexDirection"> & {
  getLabel?: (id: string) => string;
}) => {
  const [announcement, setAnnouncement] = React.useState({
    text: "",
    revision: 0,
  });
  const handleOrder: DraggableContainerProps["getOrder"] = (ids, movedId) => {
    if (!ids || movedId === undefined) return;
    const position = ids.findIndex((id) => String(id) === String(movedId)) + 1;
    if (!position) return;
    setAnnouncement((previous) => ({
      text: `${getLabel(String(movedId))} moved to position ${position} of ${ids.length}.`,
      revision: previous.revision + 1,
    }));
  };
  return (
    <>
      <DraggableContainer getOrder={handleOrder} flexDirection={flexDirection}>
        {children}
      </DraggableContainer>
      <ReorderStatus>
        {/* Alternating existing regions also announces consecutive identical messages. */}
        {[0, 1].map((slot) => (
          <div key={slot} role="status" aria-live="polite" aria-atomic="true">
            {announcement.revision % 2 === slot ? announcement.text : ""}
          </div>
        ))}
      </ReorderStatus>
    </>
  );
};

const ReorderControls = ({ label }: { label: string }) => {
  const { index, itemCount, moveTo } = useDraggableItemContext();
  return (
    <ActionPopover m={0} rightAlignMenu aria-label={`Reorder ${label}`}>
      <ActionPopoverItem
        disabled={index === 0}
        onClick={() => moveTo(index - 1)}
      >
        Move earlier
      </ActionPopoverItem>
      <ActionPopoverItem
        disabled={index === itemCount - 1}
        onClick={() => moveTo(index + 1)}
      >
        Move later
      </ActionPopoverItem>
      <ActionPopoverItem disabled={index === 0} onClick={() => moveTo(0)}>
        Move First
      </ActionPopoverItem>
      <ActionPopoverItem
        disabled={index === itemCount - 1}
        onClick={() => moveTo(itemCount - 1)}
      >
        Move Last
      </ActionPopoverItem>
    </ActionPopover>
  );
};

export const DefaultStory: Story = () => (
  <AnnouncedDraggableContainer>
    <DraggableItem key="1" id={1}>
      <Box display="flex" alignItems="center" gap={2}>
        Some content 1
        <ReorderControls label="item 1" />
      </Box>
    </DraggableItem>
    <DraggableItem key="2" id={2}>
      <Box display="flex" alignItems="center" gap={2}>
        Some content 2
        <ReorderControls label="item 2" />
      </Box>
    </DraggableItem>
    <DraggableItem key="3" id={3}>
      <Box display="flex" alignItems="center" gap={2}>
        Some content 3
        <ReorderControls label="item 3" />
      </Box>
    </DraggableItem>
    <DraggableItem key="4" id={4}>
      <Box display="flex" alignItems="center" gap={2}>
        Some content 4
        <ReorderControls label="item 4" />
      </Box>
    </DraggableItem>
  </AnnouncedDraggableContainer>
);
DefaultStory.storyName = "Default";

export const FlexDirectionStory: Story = () => (
  <AnnouncedDraggableContainer flexDirection="row-reverse">
    <DraggableItem key="1" id={1}>
      <Box display="flex" alignItems="center" gap={2}>
        Some first content goes here
        <ReorderControls label="item 1" />
      </Box>
    </DraggableItem>
    <DraggableItem key="2" id={2}>
      <Box display="flex" alignItems="center" gap={2}>
        Some second content goes here
        <ReorderControls label="item 2" />
      </Box>
    </DraggableItem>
    <DraggableItem key="3" id={3}>
      <Box display="flex" alignItems="center" gap={2}>
        Some third content goes here
        <ReorderControls label="item 3" />
      </Box>
    </DraggableItem>
    <DraggableItem key="4" id={4}>
      <Box display="flex" alignItems="center" gap={2}>
        Some fourth content goes here
        <ReorderControls label="item 4" />
      </Box>
    </DraggableItem>
  </AnnouncedDraggableContainer>
);
FlexDirectionStory.storyName = "With Flex Direction";

export const WithCardsStory = () => (
  <AnnouncedDraggableContainer getLabel={(id) => `Card ${id}`}>
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(min(100%, 240px), 1fr))"
      gap={2}
      width="100%"
      maxWidth="960px"
    >
      {["1", "2", "3", "4", "5", "6"].map((id) => (
        <DraggableItem key={id} id={id}>
          <Card m={0} rightChildren={<ReorderControls label={`card ${id}`} />}>
            Card {id}
          </Card>
        </DraggableItem>
      ))}
    </Box>
  </AnnouncedDraggableContainer>
);
WithCardsStory.storyName = "With Cards";

export const WithTilesStory = () => (
  <AnnouncedDraggableContainer getLabel={(id) => `Tile ${id}`}>
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(min(100%, 240px), 1fr))"
      gap={2}
      width="100%"
      maxWidth="960px"
    >
      {["1", "2", "3", "4", "5", "6"].map((id) => (
        <DraggableItem key={id} id={id}>
          <Tile rightChildren={<ReorderControls label={`tile ${id}`} />}>
            Tile {id}
          </Tile>
        </DraggableItem>
      ))}
    </Box>
  </AnnouncedDraggableContainer>
);
WithTilesStory.storyName = "With Tiles";

const CustomExampleGrid = ({ children }: { children: React.ReactNode }) => (
  <section
    aria-label="Custom draggable items"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
      gap: "16px",
      width: "100%",
      maxWidth: "960px",
    }}
  >
    {children}
  </section>
);

const customPanelStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  boxSizing: "border-box",
  padding: "24px",
  border: "1px solid var(--container-standard-border-default)",
  backgroundColor: "var(--container-standard-bg-alt)",
  color: "var(--container-standard-txt-default)",
};

// The component owns its surface and handle without forwarding refs.
const CustomExamplePanel = ({
  title,
  borderRadius,
  componentId = "article",
}: {
  title: string;
  borderRadius: string;
  componentId?: string;
}) => {
  const [clicks, setClicks] = React.useState(0);
  const { isDraggable, surfaceRef } = useDraggableItemContext();
  return React.createElement(
    componentId,
    {
      ref: surfaceRef,
      "aria-label": title,
      style: { ...customPanelStyle, borderRadius },
    },
    <>
      {isDraggable && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DragHandle />
          <ReorderControls label={title} />
        </div>
      )}
      <h3 style={{ margin: "0 0 12px" }}>{title}</h3>
      <button
        type="button"
        aria-label={`Increment ${title}`}
        onClick={() => setClicks((current) => current + 1)}
      >
        Clicked {clicks} times
      </button>
    </>,
  );
};

const customItemLabels: Record<string, string> = {
  "custom-rounded-article": "Rounded article component",
  "custom-rounded-section": "Rounded section component",
  "custom-asymmetric-article": "Asymmetric article component",
  "custom-asymmetric-section": "Asymmetric section component",
  "custom-square-article": "Square article component",
  "custom-square-section": "Square section component",
};

export const CustomElementsAndComponentsStory = () => (
  <AnnouncedDraggableContainer getLabel={(id) => customItemLabels[id] ?? id}>
    <CustomExampleGrid>
      <DraggableItem id="custom-rounded-article" py={0}>
        <CustomExamplePanel
          title="Rounded article component"
          borderRadius="24px"
        />
      </DraggableItem>
      <DraggableItem id="custom-rounded-section" py={0}>
        <CustomExamplePanel
          title="Rounded section component"
          borderRadius="24px"
          componentId="section"
        />
      </DraggableItem>
      <DraggableItem id="custom-asymmetric-article" py={0}>
        <CustomExamplePanel
          title="Asymmetric article component"
          borderRadius="32px 8px 24px 4px"
        />
      </DraggableItem>
      <DraggableItem id="custom-asymmetric-section" py={0}>
        <CustomExamplePanel
          title="Asymmetric section component"
          componentId="section"
          borderRadius="32px 8px 24px 4px"
        />
      </DraggableItem>
      <DraggableItem id="custom-square-article" py={0}>
        <CustomExamplePanel title="Square article component" borderRadius="0" />
      </DraggableItem>
      <DraggableItem id="custom-square-section" py={0}>
        <CustomExamplePanel
          title="Square section component"
          borderRadius="0"
          componentId="section"
        />
      </DraggableItem>
    </CustomExampleGrid>
  </AnnouncedDraggableContainer>
);
CustomElementsAndComponentsStory.storyName = "Custom Elements And Components";
