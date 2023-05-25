import React from "react";
import { ComponentStory } from "@storybook/react";

import ButtonToggleGroup from ".";
import ButtonToggle from "../button-toggle";

export const Error: ComponentStory<typeof ButtonToggleGroup> = () => (
  <>
    <ButtonToggleGroup
      id="button-toggle-group-error-id"
      name="button-toggle-group-error"
      label="Basic"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      error="Error Message"
    >
      <ButtonToggle name="first" key="first" value="first">
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second">
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third">
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
    <ButtonToggleGroup
      mt={2}
      id="button-toggle-group-error-grouped-id"
      name="button-toggle-group-error-grouped"
      label="Grouped"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      error="Error Message"
    >
      <ButtonToggle name="first" key="first" value="first" grouped>
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second" grouped>
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third" grouped>
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
    <ButtonToggleGroup
      mt={2}
      id="button-toggle-group-error-label-id"
      name="button-toggle-group-error-label"
      label="Error on the Label"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      error="Error Message"
      validationOnLabel
    >
      <ButtonToggle name="first" key="first" value="first">
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second">
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third">
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
    <ButtonToggleGroup
      mt={2}
      id="button-toggle-group-error-empty-id"
      name="button-toggle-group-error-empty"
      label="Without a message"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      error
    >
      <ButtonToggle name="first" key="first" value="first">
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second">
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third">
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
  </>
);

export const Warning: ComponentStory<typeof ButtonToggleGroup> = () => (
  <>
    <ButtonToggleGroup
      id="button-toggle-group-warning-id"
      name="button-toggle-group-warning"
      label="Basic"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      warning="Warning Message"
    >
      <ButtonToggle name="first" key="first" value="first">
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second">
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third">
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
    <ButtonToggleGroup
      mt={2}
      id="button-toggle-group-warning-grouped-id"
      name="button-toggle-group-warning-grouped"
      label="Grouped"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      warning="Warning Message"
    >
      <ButtonToggle name="first" key="first" value="first" grouped>
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second" grouped>
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third" grouped>
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
    <ButtonToggleGroup
      mt={2}
      id="button-toggle-group-warning-label-id"
      name="button-toggle-group-warning-label"
      label="Error on the Label"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      warning="Warning Message"
      validationOnLabel
    >
      <ButtonToggle name="first" key="first" value="first">
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second">
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third">
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
    <ButtonToggleGroup
      mt={2}
      id="button-toggle-group-warning-empty-id"
      name="button-toggle-group-warning-empty"
      label="Without a message"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      warning
    >
      <ButtonToggle name="first" key="first" value="first">
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second">
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third">
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
  </>
);

export const Info: ComponentStory<typeof ButtonToggleGroup> = () => (
  <>
    <ButtonToggleGroup
      id="button-toggle-group-info-id"
      name="button-toggle-group-info"
      label="Basic"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      info="Info Message"
    >
      <ButtonToggle name="first" key="first" value="first">
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second">
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third">
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
    <ButtonToggleGroup
      mt={2}
      id="button-toggle-group-info-grouped-id"
      name="button-toggle-group-info-grouped"
      label="Grouped"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      info="Info Message"
    >
      <ButtonToggle name="first" key="first" value="first" grouped>
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second" grouped>
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third" grouped>
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
    <ButtonToggleGroup
      mt={2}
      id="button-toggle-group-info-label-id"
      name="button-toggle-group-info-label"
      label="Error on the Label"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      info="Info Message"
      validationOnLabel
    >
      <ButtonToggle name="first" key="first" value="first">
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second">
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third">
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
    <ButtonToggleGroup
      mt={2}
      id="button-toggle-group-info-empty-id"
      name="button-toggle-group-info-empty"
      label="Without a message"
      labelHelp="help message"
      fieldHelp="field help message"
      onChange={() => {}}
      info
    >
      <ButtonToggle name="first" key="first" value="first">
        First
      </ButtonToggle>
      <ButtonToggle name="second" key="second" value="second">
        Second
      </ButtonToggle>
      <ButtonToggle name="third" key="third" value="third">
        Third
      </ButtonToggle>
    </ButtonToggleGroup>
  </>
);
