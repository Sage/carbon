import React from "react";
import DraggableItem from "./draggable-item";
import DraggableContainer, {
  DraggableContainerProps,
} from "./draggable-container";

export const BasicConfiguration = (props: Partial<DraggableContainerProps>) => (
  <DraggableContainer
    containerProps={{ "data-role": "draggable-container" }}
    {...props}
  >
    <DraggableItem id="1">Item 1</DraggableItem>
    <DraggableItem id="2">Item 2</DraggableItem>
    <DraggableItem id="3">Item 3</DraggableItem>
    <DraggableItem id="4">Item 4</DraggableItem>
    <DraggableItem id="5">Item 5</DraggableItem>
  </DraggableContainer>
);

export const OutOfBoundsConfiguration = (
  props: Partial<DraggableContainerProps>,
) => (
  <>
    <DraggableContainer
      containerProps={{ "data-role": "draggable-container" }}
      {...props}
    >
      <DraggableItem id="1">Item 1</DraggableItem>
      <DraggableItem id="2">Item 2</DraggableItem>
      <DraggableItem id="3">Item 3</DraggableItem>
      <DraggableItem id="4">Item 4</DraggableItem>
      <DraggableItem id="5">Item 5</DraggableItem>
    </DraggableContainer>
    <div>Out of bounds</div>
  </>
);

export const MultipleContainersConfiguration = (
  props: Partial<DraggableContainerProps>,
) => (
  <>
    <DraggableContainer
      containerProps={{ "data-role": "draggable-container-1" }}
      {...props}
    >
      <DraggableItem id="1">Item 1</DraggableItem>
      <DraggableItem id="2">Item 2</DraggableItem>
      <DraggableItem id="3">Item 3</DraggableItem>
      <DraggableItem id="4">Item 4</DraggableItem>
      <DraggableItem id="5">Item 5</DraggableItem>
    </DraggableContainer>
    <DraggableContainer
      containerProps={{ "data-role": "draggable-container-2" }}
      {...props}
    >
      <DraggableItem id="6">Item 6</DraggableItem>
      <DraggableItem id="7">Item 7</DraggableItem>
      <DraggableItem id="8">Item 8</DraggableItem>
      <DraggableItem id="9">Item 9</DraggableItem>
      <DraggableItem id="10">Item 10</DraggableItem>
    </DraggableContainer>
  </>
);
