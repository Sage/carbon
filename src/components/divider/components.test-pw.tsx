import React from "react";
import Divider, { DividerProps } from "./divider.component";
import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";

export const DividerComponent = (props: Partial<DividerProps>) => {
  return <Divider {...props} />;
};

export default DividerComponent;

export const DifferentSpacing = () => (
  <Divider type="horizontal" mt={7} mb={7} />
);

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
    <Textbox label="Textbox" value="" onChange={() => {}} />
    <Textbox label="Textbox" value="" onChange={() => {}} />
    <Divider type="horizontal" mb={7} mt={7} />
    <Textbox label="Textbox" value="" onChange={() => {}} />
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
      value=""
      onChange={() => {}}
    />
    <Textbox
      label="Textbox"
      labelAlign="right"
      labelInline
      labelWidth={10}
      inputWidth={50}
      value=""
      onChange={() => {}}
    />
    <Divider type="horizontal" mb={7} mt={7} ml="10%" mr="40%" />
    <Textbox
      label="Textbox"
      labelAlign="right"
      labelInline
      labelWidth={10}
      inputWidth={50}
      value=""
      onChange={() => {}}
    />
  </Form>
);

export const EnablingAdaptiveBehaviour = () => (
  <Divider
    type="horizontal"
    mb={7}
    mt={7}
    ml="10%"
    mr="40%"
    adaptiveMxBreakpoint={960}
  />
);
