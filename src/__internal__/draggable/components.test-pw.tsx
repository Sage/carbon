import React, { useRef } from "react";
import DraggableItem from "./draggable-item";
import DraggableContainer, {
  DraggableContainerProps,
} from "./draggable-container";

export const BasicConfiguration = (props: Partial<DraggableContainerProps>) => (
  <DraggableContainer data-role="draggable-container" {...props}>
    <DraggableItem uniqueId="1">Item 1</DraggableItem>
    <DraggableItem uniqueId="2">Item 2</DraggableItem>
    <DraggableItem uniqueId="3">Item 3</DraggableItem>
    <DraggableItem uniqueId="4">Item 4</DraggableItem>
    <DraggableItem uniqueId="5">Item 5</DraggableItem>
  </DraggableContainer>
);

export const OutOfBoundsConfiguration = (
  props: Partial<DraggableContainerProps>,
) => (
  <>
    <DraggableContainer data-role="draggable-container" {...props}>
      <DraggableItem uniqueId="1">Item 1</DraggableItem>
      <DraggableItem uniqueId="2">Item 2</DraggableItem>
      <DraggableItem uniqueId="3">Item 3</DraggableItem>
      <DraggableItem uniqueId="4">Item 4</DraggableItem>
      <DraggableItem uniqueId="5">Item 5</DraggableItem>
    </DraggableContainer>
    <div>Out of bounds</div>
  </>
);

export const MultipleContainersConfiguration = (
  props: Partial<DraggableContainerProps>,
) => (
  <>
    <DraggableContainer data-role="draggable-container-1" {...props}>
      <DraggableItem uniqueId="1">Item 1</DraggableItem>
      <DraggableItem uniqueId="2">Item 2</DraggableItem>
      <DraggableItem uniqueId="3">Item 3</DraggableItem>
      <DraggableItem uniqueId="4">Item 4</DraggableItem>
      <DraggableItem uniqueId="5">Item 5</DraggableItem>
    </DraggableContainer>
    <DraggableContainer data-role="draggable-container-2" {...props}>
      <DraggableItem uniqueId="6">Item 6</DraggableItem>
      <DraggableItem uniqueId="7">Item 7</DraggableItem>
      <DraggableItem uniqueId="8">Item 8</DraggableItem>
      <DraggableItem uniqueId="9">Item 9</DraggableItem>
      <DraggableItem uniqueId="10">Item 10</DraggableItem>
    </DraggableContainer>
  </>
);
