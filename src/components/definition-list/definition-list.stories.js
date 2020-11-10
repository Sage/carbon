import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Dl from "./dl.component";
import Dt from "./dt.component";
import Dd from "./dd.component";

export default {
  title: "Test/Definition List",
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disabled: true,
    },
  },
};

export const Basic = () => {
  return (
    <Dl data-component="definition-list">
      <Dt>Name</Dt>
      <Dd>Daniel Dipper</Dd>

      <Dt>Phone</Dt>
      <Dd>Yes, I have a phone</Dd>
    </Dl>
  );
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
