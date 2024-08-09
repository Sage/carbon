import { addons } from "@storybook/manager-api";
import sageTheme from "./sage-docs-theme";
import { API_PreparedIndexEntry, API_StatusObject } from "@storybook/types";

addons.setConfig({
  theme: sageTheme,
  panelPosition: "bottom",
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
