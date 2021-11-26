import { addons, types } from "@storybook/addons";
import sageTheme from "./sageTheme";
import { ADDON_ID, TOOL_ID } from "./version-picker/constants";
import { VersionPicker } from "./version-picker";

addons.setConfig({
  theme: sageTheme,
  panelPosition: "bottom",
  showNav: true,
  showPanel: true,
});

if (process.env.NODE_ENV === "production") {
  addons.register(ADDON_ID, () => {
    addons.add(TOOL_ID, {
      type: types.TOOL,
      title: "Version picker",
      match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
      render: VersionPicker,
    });
  });
}

window.STORYBOOK_GA_ID = "UA-77028225-13";
