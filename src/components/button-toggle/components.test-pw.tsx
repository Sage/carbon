import React from "react";
import {
  ButtonToggle,
  ButtonToggleGroup,
  ButtonToggleGroupProps,
  ButtonToggleProps,
} from ".";
import Icon from "../icon";

export const ButtonToggleGroupComponent = (
  props: Partial<ButtonToggleGroupProps>,
) => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    onChange={() => {}}
    value=""
    {...props}
  >
    <ButtonToggle value="foo">Foo</ButtonToggle>
    <ButtonToggle value="bar">Bar</ButtonToggle>
    <ButtonToggle value="baz">Baz</ButtonToggle>
  </ButtonToggleGroup>
);

export const ButtonToggleIconOnly = ({ ...props }: ButtonToggleProps) => {
  return (
    <ButtonToggleGroup id="button-toggle-group-id" onChange={() => {}} value="">
      <ButtonToggle value="foo" {...props}>
        <Icon ariaLabel="Placeholder 1" type="placeholder" />
      </ButtonToggle>
      <ButtonToggle value="bar" {...props}>
        <Icon ariaLabel="Placeholder 2" type="placeholder" />
      </ButtonToggle>
      <ButtonToggle value="baz" {...props}>
        <Icon ariaLabel="Placeholder 3" type="placeholder" />
      </ButtonToggle>
    </ButtonToggleGroup>
  );
};
