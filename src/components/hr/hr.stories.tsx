/* eslint-disable no-console */
import React from "react";
import { ComponentStory } from "@storybook/react";

import Hr from ".";
import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";

export const Default: ComponentStory<typeof Hr> = () => <Hr />;

export const DifferentSpacing: ComponentStory<typeof Hr> = () => (
  <Hr mt={7} mb={7} />
);

export const InsideForm: ComponentStory<typeof Hr> = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <Button onClick={() => console.log("cancel")}>Cancel</Button>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter={false}
  >
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Hr mb={7} mt={7} />
    <Textbox label="Textbox" />
  </Form>
);

export const InsideFormInlineLabels: ComponentStory<typeof Hr> = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <Button onClick={() => console.log("cancel")}>Cancel</Button>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter={false}
  >
    <Textbox
      label="Textbox"
      labelAlign="right"
      labelInline
      labelWidth={10}
      inputWidth={50}
    />
    <Textbox
      label="Textbox"
      labelAlign="right"
      labelInline
      labelWidth={10}
      inputWidth={50}
    />
    <Hr mb={7} mt={7} ml="10%" mr="40%" />
    <Textbox
      label="Textbox"
      labelAlign="right"
      labelInline
      labelWidth={10}
      inputWidth={50}
    />
  </Form>
);

export const EnablingAdaptiveBehaviour: ComponentStory<typeof Hr> = () => (
  <Hr mb={7} mt={7} ml="10%" mr="40%" adaptiveMxBreakpoint={960} />
);
EnablingAdaptiveBehaviour.parameters = { chromatic: { disableSnapshot: true } };
