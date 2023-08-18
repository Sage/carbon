import React from "react";
import Hr, { HrProps } from ".";
import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";

export const Default = (props: HrProps) => {
  return <Hr {...props} />;
};

export const DifferentSpacing = () => <Hr mt={7} mb={7} />;

export const InsideForm = () => (
  <Form
    onSubmit={() => {}}
    leftSideButtons={<Button onClick={() => {}}>Cancel</Button>}
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

export const InsideFormInlineLabels = () => (
  <Form
    onSubmit={() => {}}
    leftSideButtons={<Button onClick={() => {}}>Cancel</Button>}
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

export const EnablingAdaptiveBehaviour = () => (
  <Hr mb={7} mt={7} ml="10%" mr="40%" adaptiveMxBreakpoint={960} />
);
