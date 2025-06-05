import React from "react";
import Welcome from "./welcome.component";

export default {
  title: "Welcome",
  component: Welcome,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    layout: "fullscreen",
  },
};

export const WelcomePage = {
  render: () => <Welcome />,
};
