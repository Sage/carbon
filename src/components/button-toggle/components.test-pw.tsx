import React from "react";
import {
  ButtonToggle,
  ButtonToggleGroup,
  ButtonToggleGroupProps,
  ButtonToggleProps,
} from ".";
import Box from "../box";

export const ButtonToggleComponent = ({
  children = "This is an example of an alert",
  ...props
}: ButtonToggleProps) => {
  return (
    <Box>
      <ButtonToggle onBlur={() => {}} onFocus={() => {}} {...props}>
        {children}
      </ButtonToggle>
      <ButtonToggle onBlur={() => {}} onFocus={() => {}} {...props}>
        Second
      </ButtonToggle>
      <ButtonToggle onBlur={() => {}} onFocus={() => {}} {...props}>
        Third
      </ButtonToggle>
    </Box>
  );
};

export const ButtonToggleGroupComponent = (
  props: Partial<ButtonToggleGroupProps>,
) => (
  <Box margin={4} display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Grouped example"
      labelHelp="help message"
      helpAriaLabel="Help"
      fieldHelp="field help message"
      onChange={() => {}}
      {...props}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const ButtonToggleGroupNotInBox = (
  props: Partial<ButtonToggleGroupProps>,
) => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    label="Grouped example"
    {...props}
  >
    <ButtonToggle value="foo">Foo</ButtonToggle>
    <ButtonToggle value="bar">Bar</ButtonToggle>
    <ButtonToggle value="baz">Baz</ButtonToggle>
  </ButtonToggleGroup>
);

export const WithOutsideButtons = () => {
  return (
    <>
      <button type="button" id="button-before">
        button before
      </button>
      <ButtonToggleGroup
        id="button-toggle-group"
        label="Button Toggle Group test"
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
      <button type="button" id="button-after">
        button after
      </button>
    </>
  );
};
