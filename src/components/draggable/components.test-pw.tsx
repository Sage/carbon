import React, { useState } from "react";
import {
  DraggableContainer,
  DraggableContainerGroup,
  DraggableContainerProps,
  DraggableItem,
} from ".";
import Box from "../box";
import Card from "../card";
import { Tile } from "../tile";
import { Checkbox } from "../checkbox";
import { WithCardsStory, WithTilesStory } from "./draggable.stories";
import {
  Default,
  DraggableFlexDirection,
  DraggableCustom,
  CustomElementsAndComponentsStory,
} from "./draggable-test.stories";

export const WithAnnouncedTestStory = ({
  variant,
}: {
  variant: "default" | "flex-direction" | "custom";
}) => {
  const Component = {
    default: Default,
    "flex-direction": DraggableFlexDirection,
    custom: DraggableCustom,
  }[variant];
  return <Component />;
};

export const WithCustomDraggablePanels = () => (
  <CustomElementsAndComponentsStory />
);

export const WithDraggableMenus = ({
  kind,
}: {
  kind: "card" | "tile" | "custom";
}) => {
  if (kind === "card") return <WithCardsStory />;
  if (kind === "tile") return <WithTilesStory />;
  return <CustomElementsAndComponentsStory />;
};

export const SimpleDraggable = ({ getOrder }: DraggableContainerProps) => (
  <DraggableContainer getOrder={getOrder}>
    <DraggableItem id="apple">Apple</DraggableItem>
    <DraggableItem id="mercury">Mercury</DraggableItem>
    <DraggableItem id="venus">Venus</DraggableItem>
  </DraggableContainer>
);

export const WithDraggableCheckbox = ({
  getOrder,
}: DraggableContainerProps) => {
  const [value, setValue] = useState(false);

  return (
    <DraggableContainer getOrder={getOrder}>
      <DraggableItem id="apple">
        <Checkbox
          label="Apple"
          checked={value}
          onChange={() => setValue(!value)}
        />
      </DraggableItem>
      <DraggableItem id="saturn">Saturn</DraggableItem>
      <DraggableItem id="uranus">Uranus</DraggableItem>
      <DraggableItem id="neptune">Neptune</DraggableItem>
    </DraggableContainer>
  );
};

export const WithMultipleContainers = ({
  getOrder,
}: DraggableContainerProps) => (
  <>
    <DraggableContainer mb={9} getOrder={getOrder} data-role="fruits">
      <DraggableItem id="apple">Apple</DraggableItem>
      <DraggableItem id="mango">Mango</DraggableItem>
      <DraggableItem id="cherry">Cherry</DraggableItem>
    </DraggableContainer>
    <DraggableContainer data-role="planets">
      <DraggableItem id="pluto">Pluto</DraggableItem>
    </DraggableContainer>
  </>
);

export const WithLinkedContainers = ({ getOrder }: DraggableContainerProps) => (
  <DraggableContainerGroup>
    <DraggableContainer data-role="linked-fruits" getOrder={getOrder}>
      <DraggableItem id={1}>Apple</DraggableItem>
      <DraggableItem id="banana">Banana</DraggableItem>
    </DraggableContainer>
    <DraggableContainer data-role="linked-planets" getOrder={getOrder}>
      <DraggableItem id="venus">Venus</DraggableItem>
    </DraggableContainer>
  </DraggableContainerGroup>
);

export const WithControlledLinkedContainers = () => {
  const [first, setFirst] = useState(["Apple"]);
  const [second, setSecond] = useState(["Venus"]);
  const [checked, setChecked] = useState(true);
  const item = (id: string) => (
    <DraggableItem key={id} id={id}>
      <Checkbox
        label={id}
        checked={id === "Apple" && checked}
        onChange={() => setChecked((value) => !value)}
      />
    </DraggableItem>
  );
  return (
    <DraggableContainerGroup>
      <DraggableContainer
        data-role="controlled-first"
        getOrder={(ids) => setFirst(ids as string[])}
      >
        {first.map(item)}
      </DraggableContainer>
      <DraggableContainer
        data-role="controlled-second"
        getOrder={(ids) => setSecond(ids as string[])}
      >
        {second.map(item)}
      </DraggableContainer>
    </DraggableContainerGroup>
  );
};

export const WithBoxCardsAndTiles = ({ getOrder }: DraggableContainerProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <DraggableContainer getOrder={getOrder}>
      <Box
        data-role="custom-parent"
        display="flex"
        flexDirection="column"
        gap={2}
        width="600px"
      >
        <DraggableItem id="card-one">
          <Card width="100%" m={0}>
            <Checkbox
              label="First card"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </Card>
        </DraggableItem>
        <DraggableItem id="tile">
          <Tile>
            <Box width="50%" data-role="tile-first-column">
              Middle{" "}
            </Box>
            <Box width="50%" data-role="tile-second-column">
              tile
            </Box>
          </Tile>
        </DraggableItem>
        <DraggableItem id="card-two">
          <Card width="100%" m={0}>
            Last card
          </Card>
        </DraggableItem>
      </Box>
    </DraggableContainer>
  );
};

export const WithDirectionalDropIndicators = ({
  kind = "card",
  direction = "ltr",
}: {
  kind?: "card" | "tile";
  direction?: "ltr" | "rtl";
}) => (
  <DraggableContainer dir={direction} pt={2}>
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(min(100%, 240px), 1fr))"
      width="100%"
      maxWidth="900px"
      gap={2}
    >
      {[1, 2, 3, 4, 5, 6].map((id) => (
        <DraggableItem id={id} key={id}>
          {kind === "card" ? (
            <Card width="auto" height="160px" m={0} roundness="moderate">
              Item {id}
            </Card>
          ) : (
            <Tile height="160px" roundness="curved">
              Item {id}
            </Tile>
          )}
        </DraggableItem>
      ))}
    </Box>
  </DraggableContainer>
);

export const WithInsertionLayout = ({
  layout = "vertical",
  direction = "ltr",
  getOrder,
}: DraggableContainerProps & {
  layout?: "vertical" | "grid";
  direction?: "ltr" | "rtl";
}) => (
  <DraggableContainerGroup>
    <DraggableContainer
      data-role="insertion-target"
      getOrder={getOrder}
      dir={direction}
    >
      <Box
        display="grid"
        gridTemplateColumns={
          layout === "grid" ? "repeat(3, minmax(0, 1fr))" : "1fr"
        }
        gap="24px"
        width="720px"
        maxWidth="100%"
      >
        {["A", "B", "C", "D", "E"].map((id) => (
          <DraggableItem key={id} id={id}>
            <Box p={2} height="64px">
              {id}
            </Box>
          </DraggableItem>
        ))}
      </Box>
    </DraggableContainer>
    <DraggableContainer data-role="insertion-source">
      <DraggableItem id="X">X</DraggableItem>
    </DraggableContainer>
  </DraggableContainerGroup>
);
