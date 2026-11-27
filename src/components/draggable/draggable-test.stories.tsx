import React from "react";
import { action } from "storybook/actions";

import DraggableContainer, {
  DraggableContainerProps,
} from "./draggable-container.component";
import DraggableItem from "./draggable-item/draggable-item.component";
import { Checkbox } from "../checkbox";
import Textbox from "../textbox";
import Box from "../box";
import DraggableContainerGroup from "./draggable-container-group.component";
import { Tile } from "../tile";
import Typography from "../typography";
import Button from "../button/__next__";
import Icon from "../icon";
import {
  ActionPopover,
  ActionPopoverItem,
  ActionPopoverHandle,
} from "../action-popover";
import useDraggableItemContext from "./use-draggable-item-context";
import DragHandle from "./drag-handle";

export default {
  title: "Draggable/Test",
  parameters: {
    controls: { disable: true },
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const LargeList = () => (
  <Box height="480px" overflowY="auto" data-role="large-list-scroll-area">
    <DraggableContainer data-role="large-list">
      {Array.from({ length: 120 }, (_, index) => (
        <DraggableItem key={index} id={`item-${index + 1}`}>
          Item {index + 1}
        </DraggableItem>
      ))}
    </DraggableContainer>
  </Box>
);

const testItemLabels: Record<string, string> = {
  1: "Draggable Label One",
  2: "Draggable Label Two",
  3: "Draggable Label Three",
  4: "Draggable Label Four",
  5: "Draggable Textbox",
};

const AnnouncedTestDraggableContainer = ({
  getOrder,
  getLabel = (id) => testItemLabels[id] ?? `Item ${id}`,
  ...props
}: DraggableContainerProps & { getLabel?: (id: string) => string }) => {
  const [announcement, setAnnouncement] = React.useState("");
  const handleOrder: DraggableContainerProps["getOrder"] = (ids, movedId) => {
    getOrder?.(ids, movedId);
    if (!ids || movedId === undefined) return;
    const position = ids.findIndex((id) => String(id) === String(movedId));
    if (position < 0) return;
    setAnnouncement(
      `${getLabel(String(movedId))} moved to position ${position + 1} of ${ids.length}.`,
    );
  };

  return (
    <>
      <DraggableContainer {...props} getOrder={handleOrder} />
      <Typography
        as="div"
        screenReaderOnly
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </Typography>
    </>
  );
};

export const Default = () => {
  const handleUpdate = (items?: (string | number | undefined)[]) => {
    action("onUpdate")(items);
  };
  return (
    <AnnouncedTestDraggableContainer getOrder={handleUpdate}>
      <DraggableItem key="1" id={1}>
        <Checkbox
          label="Draggable Label One"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="2" id={2}>
        <Checkbox
          label="Draggable Label Two"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="3" id={3}>
        <Checkbox
          label="Draggable Label Three"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="4" id={4}>
        <Checkbox
          label="Draggable Label Four"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="5" id={5}>
        <Textbox label="Draggable Textbox" value="" onChange={() => {}} />
      </DraggableItem>
    </AnnouncedTestDraggableContainer>
  );
};

Default.story = {
  name: "default",
};

export const DraggableFlexDirection = () => {
  const handleUpdate = (items?: (string | number | undefined)[]) => {
    action("onUpdate")(items);
  };
  return (
    <AnnouncedTestDraggableContainer
      getOrder={handleUpdate}
      flexDirection="row-reverse"
    >
      <DraggableItem key="1" id={1}>
        <Checkbox
          label="Draggable Label One"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="2" id={2}>
        <Checkbox
          label="Draggable Label Two"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="3" id={3}>
        <Checkbox
          label="Draggable Label Three"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="4" id={4}>
        <Checkbox
          label="Draggable Label Four"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="5" id={5}>
        <Textbox label="Draggable Textbox" value="" onChange={() => {}} />
      </DraggableItem>
    </AnnouncedTestDraggableContainer>
  );
};

DraggableFlexDirection.story = {
  name: "Flex Direction",
};

export const DraggableCustom = ({
  getOrder,
  ...props
}: DraggableContainerProps) => {
  return (
    <AnnouncedTestDraggableContainer {...props} getOrder={getOrder}>
      <DraggableItem key="1" id={1}>
        <Checkbox
          label="Draggable Label One"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="2" id={2}>
        <Checkbox
          label="Draggable Label Two"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="3" id={3}>
        <Checkbox
          label="Draggable Label Three"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
      <DraggableItem key="4" id={4}>
        <Checkbox
          label="Draggable Label Four"
          checked={false}
          onChange={() => {}}
        />
      </DraggableItem>
    </AnnouncedTestDraggableContainer>
  );
};

const differentContainerLabels: Record<number, string> = {
  4: "Item Four",
  5: "Item Five",
  6: "Item Six",
  7: "Item Seven",
};

const DifferentContainerItem = ({
  label,
  destination,
  onTransfer,
  popoverRef,
}: {
  label: string;
  destination: string;
  onTransfer: () => void;
  popoverRef: React.Ref<ActionPopoverHandle>;
}) => {
  const { index, itemCount, moveTo } = useDraggableItemContext();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      gap={2}
    >
      <Typography m={0}>{label}</Typography>
      <ActionPopover
        ref={popoverRef}
        aria-label={`Reorder ${label}`}
        size="small"
        m={0}
        rightAlignMenu
        renderButton={({
          ref,
          "data-element": dataElement,
          ariaAttributes,
        }) => (
          <Button
            ref={ref as React.Ref<HTMLButtonElement>}
            data-element={dataElement}
            {...ariaAttributes}
            variantType="subtle"
            size="small"
          >
            <Icon size="small" type="ellipsis_vertical" />
          </Button>
        )}
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
          Move first
        </ActionPopoverItem>
        <ActionPopoverItem
          disabled={index === itemCount - 1}
          onClick={() => moveTo(itemCount - 1)}
        >
          Move last
        </ActionPopoverItem>
        <ActionPopoverItem onClick={onTransfer}>
          {`Move to ${destination} container`}
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const DraggableDifferentContainers = ({
  getOrder,
  ...props
}: DraggableContainerProps) => {
  const [firstItems, setFirstItems] = React.useState([4, 5, 6]);
  const [secondItems, setSecondItems] = React.useState([7]);
  const [announcement, setAnnouncement] = React.useState("");
  const focusAfterTransfer = React.useRef<{
    id: number;
    container: "first" | "second";
  } | null>(null);

  const handleOrder = (
    container: "first" | "second",
    ids?: (string | number | undefined)[],
    movedId?: string | number,
  ) => {
    if (!ids) return;
    const nextItems = ids.map(Number);
    (container === "first" ? setFirstItems : setSecondItems)(nextItems);
    getOrder?.(ids, movedId);
    const position = nextItems.indexOf(Number(movedId));
    if (position >= 0) {
      setAnnouncement(
        `${differentContainerLabels[Number(movedId)]} moved to the ${container} container, position ${position + 1} of ${ids.length}.`,
      );
    }
  };

  const transferItem = (id: number) => {
    const isInFirst = firstItems.includes(id);
    focusAfterTransfer.current = {
      id,
      container: isInFirst ? "second" : "first",
    };
    handleOrder(
      "first",
      isInFirst
        ? firstItems.filter((item) => item !== id)
        : [...firstItems, id],
      id,
    );
    handleOrder(
      "second",
      isInFirst
        ? [...secondItems, id]
        : secondItems.filter((item) => item !== id),
      id,
    );
  };

  return (
    <DraggableContainerGroup>
      <Box display="flex" gap="8px">
        {(["first", "second"] as const).map((container) => (
          <Tile p={0} key={container} width="max-content">
            <DraggableContainer
              getOrder={(ids, movedId) => handleOrder(container, ids, movedId)}
              minWidth="260px"
              minHeight="160px"
              p="16px"
              {...(container === "first" ? props : {})}
            >
              {(container === "first" ? firstItems : secondItems).map((id) => (
                <DraggableItem key={id} id={id}>
                  <DifferentContainerItem
                    label={differentContainerLabels[id]}
                    destination={container === "first" ? "second" : "first"}
                    onTransfer={() => transferItem(id)}
                    popoverRef={(popover) => {
                      // Containers reconcile their children after the parent
                      // renders. Focus only when the destination mounts it.
                      if (
                        popover &&
                        focusAfterTransfer.current?.id === id &&
                        focusAfterTransfer.current.container === container
                      ) {
                        popover.focusButton();
                        focusAfterTransfer.current = null;
                      }
                    }}
                  />
                </DraggableItem>
              ))}
            </DraggableContainer>
          </Tile>
        ))}
      </Box>
      <Typography
        as="div"
        screenReaderOnly
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </Typography>
    </DraggableContainerGroup>
  );
};

const CustomReorderControls = ({ label }: { label: string }) => {
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <DragHandle />
          <CustomReorderControls label={title} />
        </Box>
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
  <AnnouncedTestDraggableContainer
    getLabel={(id) => customItemLabels[id] ?? id}
  >
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
  </AnnouncedTestDraggableContainer>
);
CustomElementsAndComponentsStory.storyName = "Custom Elements And Components";
