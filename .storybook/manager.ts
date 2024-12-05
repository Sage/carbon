import { addons, types } from "@storybook/manager-api";
import sageTheme from "./sage-docs-theme";
import { ADDON_ID, TOOL_ID } from "./version-picker/constants";
import { VersionPicker } from "./version-picker";
import { API_PreparedIndexEntry, API_StatusObject } from "@storybook/types";

const useVersionPicker = process.env.USE_VERSION_PICKER === "true";

if (useVersionPicker) {
  addons.register(ADDON_ID, () => {
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
  sidebar: {
    filters: {
      patterns: (
        item: API_PreparedIndexEntry & {
          status: Record<string, API_StatusObject | null>;
        },
      ): boolean => {
        return !(item.tags ?? []).includes("hideInSidebar");
      },
    },
  },
});
