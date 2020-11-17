import React from "react";
import MountInApp from "./mount-in-app";

export default {
  title: "Mount In App/Test",
  component: MountInApp,
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

export const basic = () => {
  return (
    <div>
      <div id="carbon-demo">Some content to be replaced.</div>
      <MountInApp targetId="carbon-demo">
        <div>Content to be mounted!</div>
      </MountInApp>
    </div>
  );
};

basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
