/* eslint-disable no-console */
import React from "react";
import { ComponentStory } from "@storybook/react";

import Hr from ".";
import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";

export const Default: ComponentStory<typeof Hr> = () => <Hr />;
Default.storyName = "default";

export const DifferentSpacing: ComponentStory<typeof Hr> = () => (
  <Hr mt={7} mb={7} />
);
DifferentSpacing.storyName = "different spacing";

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

InsideForm.storyName = "inside form";

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
InsideFormInlineLabels.storyName = "inside form inline labels";

export const EnablingAdaptiveBehaviour: ComponentStory<typeof Hr> = () => (
  <Hr mb={7} mt={7} ml="10%" mr="40%" adaptiveMxBreakpoint={960} />
);
EnablingAdaptiveBehaviour.storyName = "enabling adaptive behaviour";
EnablingAdaptiveBehaviour.parameters = { chromatic: { disableSnapshot: true } };
