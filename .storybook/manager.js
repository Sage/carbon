import { addons } from "@storybook/addons";
import sageTheme from "./sageTheme";

addons.setConfig({
  theme: sageTheme,
  panelPosition: "bottom",
  showNav: true,
  showPanel: true,
});

window.STORYBOOK_GA_ID = "UA-77028225-13";
