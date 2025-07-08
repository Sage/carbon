import { addons, types } from "@storybook/manager-api";
import sageTheme from "./sage-docs-theme";
import { ADDON_ID, TOOL_ID } from "./version-picker/constants";
import {
  INTERACTION_TOGGLE_ADDON_ID,
  INTERACTION_TOGGLE_TOOL_ID,
} from "./interaction-toggle/constants";
import { InteractionToggle } from "./interaction-toggle/reduced-motion";
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

addons.register(INTERACTION_TOGGLE_ADDON_ID, () => {
  addons.add(INTERACTION_TOGGLE_TOOL_ID, {
    type: types.TOOL,
    title: "Interaction toggle",
    match: ({ viewMode, tabId }) => viewMode === "story" && !tabId,
    render: InteractionToggle,
  });
});

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
