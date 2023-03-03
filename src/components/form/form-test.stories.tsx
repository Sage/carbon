import React from "react";
import Form from ".";
import Button from "../button";
import { Tab, Tabs } from "../tabs";
import Box from "../box";
import Textbox from "../textbox";

export default {
  title: "Form/Test",
  includeStories: "DefaultWithStickyFooter",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultWithStickyFooter = () => (
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
    stickyFooter
  >
    <Tabs mb={2}>
      <Tab
        pl="3px"
        customLayout={
          <Box mx="16px" my="10px">
            Tab1
          </Box>
        }
        tabId="tab1"
      />
    </Tabs>
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
  </Form>
);

DefaultWithStickyFooter.storyName = "default";

export const FormComponent = ({ ...props }) => {
  return (
    <Form
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      {...props}
    >
      <Textbox label="Textbox1" />
      <Textbox label="Textbox2" />
      <Textbox label="Textbox3" />
    </Form>
  );
};
