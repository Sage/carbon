import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import {
  DraggableContainer,
  DraggableContainerGroup,
  DraggableContainerProps,
  DraggableItem,
  useDraggableItemContext,
} from ".";
import Box from "../box";
import { Checkbox } from "../checkbox";
import Card from "../card";
import { Tile } from "../tile";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import Button from "../button/__next__";
import Icon from "../icon";
import Typography from "../typography";

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
    controls: { disable: true },
    themeProvider: {
      chromatic: {
        theme: "sage",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DraggableContainer>;

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
      {/* Alternating existing regions also announces consecutive identical messages. */}
      {[0, 1].map((slot) => (
        <Typography
          key={slot}
          as="div"
          screenReaderOnly
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {announcement.revision % 2 === slot ? announcement.text : ""}
        </Typography>
      ))}
    </>
  );
};

const ReorderControls = ({ label }: { label: string }) => {
  const { index, itemCount, moveTo } = useDraggableItemContext();
  return (
    <ActionPopover
      size="small"
      renderButton={({ "data-element": dataElement, ariaAttributes }) => (
        <Button
          variantType="subtle"
          size="small"
          data-element={dataElement}
          {...ariaAttributes}
        >
          <Icon type="ellipsis_vertical" />
        </Button>
      )}
      m={0}
      rightAlignMenu
      aria-label={`Reorder ${label}`}
    >
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
      {Array.from({ length: 12 }, (_, index) => String(index + 1)).map((id) => (
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
      {Array.from({ length: 12 }, (_, index) => String(index + 1)).map((id) => (
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

export const WithControlledLinkedContainersStory = () => {
  const [first, setFirst] = React.useState(["Apple"]);
  const [second, setSecond] = React.useState(["Venus"]);
  const [checked, setChecked] = React.useState<Record<string, boolean>>({
    Apple: true,
    Venus: false,
  });
  const transfer = (id: string) => {
    const inFirst = first.includes(id);
    setFirst((ids) =>
      inFirst ? ids.filter((item) => item !== id) : [...ids, id],
    );
    setSecond((ids) =>
      inFirst ? [...ids, id] : ids.filter((item) => item !== id),
    );
  };
  const item = (id: string) => (
    <DraggableItem key={id} id={id}>
      <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
        <Checkbox
          label={id}
          checked={checked[id]}
          onChange={() =>
            setChecked((values) => ({ ...values, [id]: !values[id] }))
          }
        />
        <Button size="small" onClick={() => transfer(id)}>
          Move {id} to {first.includes(id) ? "second" : "first"} container
        </Button>
      </Box>
    </DraggableItem>
  );
  return (
    <DraggableContainerGroup>
      <Box display="flex" flexWrap="wrap" gap={3}>
        <DraggableContainer
          minWidth="260px"
          minHeight="160px"
          p={2}
          aria-label="First container"
          role="group"
          data-role="controlled-first"
          getOrder={(ids) => setFirst(ids as string[])}
        >
          {first.map(item)}
        </DraggableContainer>
        <DraggableContainer
          minWidth="260px"
          minHeight="160px"
          p={2}
          aria-label="Second container"
          role="group"
          data-role="controlled-second"
          getOrder={(ids) => setSecond(ids as string[])}
        >
          {second.map(item)}
        </DraggableContainer>
      </Box>
    </DraggableContainerGroup>
  );
};

WithControlledLinkedContainersStory.storyName =
  "With Controlled Linked Containers";
