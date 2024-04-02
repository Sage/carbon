import { addons } from "@storybook/manager-api";
import { types } from "@storybook/addons";
import sageTheme from "./sageTheme";
import { ADDON_ID, TOOL_ID } from "./version-picker/constants";
import { VersionPicker } from "./version-picker";
import { API_PreparedIndexEntry, API_StatusObject } from "@storybook/types";

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
