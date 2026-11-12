import React, { useState } from "react";
import { DraggableContainer, DraggableContainerProps, DraggableItem } from ".";
import Box from "../box";
import Card from "../card";
import { Tile } from "../tile";
import { Checkbox } from "../checkbox";
import {
  WithCardsStory,
  WithTilesStory,
  CustomElementsAndComponentsStory,
} from "./draggable.stories";

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
  <DraggableContainer dir={direction}>
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
