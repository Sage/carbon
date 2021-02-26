import React from "react";
import Welcome from "./welcome.component";

export default {
  title: "Welcome",
  component: Welcome,
  parameters: {
    docs: {
      page: null,
    },
    options: {
      showPanel: false,
    },
    chromatic: {
      disable: true,
    },
  },
};

export const WelcomePage = () => <Welcome />;
