import React from "react";
import { DraggableContainer, DraggableContainerProps, DraggableItem } from ".";
import { Checkbox } from "../checkbox";

export const SimpleDraggable = ({ getOrder }: DraggableContainerProps) => (
  <DraggableContainer getOrder={getOrder}>
    <DraggableItem id="apple">Apple</DraggableItem>
    <DraggableItem id="mercury">Mercury</DraggableItem>
    <DraggableItem id="venus">Venus</DraggableItem>
  </DraggableContainer>
);

export const WithDraggableCheckbox = ({
  getOrder,
}: DraggableContainerProps) => (
  <DraggableContainer getOrder={getOrder}>
    <DraggableItem id="apple">
      <Checkbox label="Apple" />
    </DraggableItem>
    <DraggableItem id="saturn">Saturn</DraggableItem>
    <DraggableItem id="uranus">Uranus</DraggableItem>
    <DraggableItem id="neptune">Neptune</DraggableItem>
  </DraggableContainer>
);

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
