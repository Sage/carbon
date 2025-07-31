import React, { useState } from "react";
import Hr, { HrProps } from ".";
import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";

export const Default = (props: HrProps) => {
  return <Hr {...props} />;
};

export const DifferentSpacing = () => <Hr mt={7} mb={7} />;

export const InsideForm = () => {
  const [value, setValue] = useState("");
  return (
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
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Textbox
        label="Textbox"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Hr mb={7} mt={7} />
      <Textbox
        label="Textbox"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </Form>
  );
};

export const InsideFormInlineLabels = () => {
  const [value, setValue] = useState("");

  return (
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
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Textbox
        label="Textbox"
        labelAlign="right"
        labelInline
        labelWidth={10}
        inputWidth={50}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Hr mb={7} mt={7} ml="10%" mr="40%" />
      <Textbox
        label="Textbox"
        labelAlign="right"
        labelInline
        labelWidth={10}
        inputWidth={50}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </Form>
  );
};

export const EnablingAdaptiveBehaviour = () => (
  <Hr mb={7} mt={7} ml="10%" mr="40%" adaptiveMxBreakpoint={960} />
);
