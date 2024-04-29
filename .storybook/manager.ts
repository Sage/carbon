import { addons } from "@storybook/manager-api";
import { types } from "@storybook/addons";
import sageTheme from "./sageTheme";
import { ADDON_ID, TOOL_ID } from "./version-picker/constants";
import { VersionPicker } from "./version-picker";
import { API_PreparedIndexEntry, API_StatusObject } from "@storybook/types";

console.log("inside manager.ts");

if (process.env.NODE_ENV === "production") {
  console.log("node_env is production");
  addons.register(ADDON_ID, () => {
    console.log("addon.register called");
    addons.add(TOOL_ID, {
      type: types.TOOL,
      title: "Version picker",
      match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
      render: VersionPicker,
    });
  });
}

addons.setConfig({
  theme: sageTheme,
  panelPosition: "bottom",
  showNav: true,
  showPanel: true,
  sidebar: {
    filters: {
      patterns: (
        item: API_PreparedIndexEntry & {
          status: Record<string, API_StatusObject | null>;
        }
      ): boolean => {
        return !(item.tags ?? []).includes("hideInSidebar");
      },
    },
  },
});
