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
      disable: false,
    },
  },
};

export const Default = () => {
  return (
    <Dl data-component="definition-list">
      <Dt>Title</Dt>
      <Dd>Description</Dd>
      <>
        <Dt>Title inside of React Fragment</Dt>
        <Dd>Description inside of React Fragment</Dd>
      </>
    </Dl>
  );
};

Default.story = {
  name: "default",
};
