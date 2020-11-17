import React from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";
import { action } from "@storybook/addon-actions";
import { cloneDeep } from "lodash";
import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import notes from "./documentation";
import { ConfigurableItems, ConfigurableItemRow } from ".";
import getDocGenInfo from "../../utils/helpers/docgen-info";

const ConfigurableItemsWrapper = (props) => <ConfigurableItems {...props} />;
ConfigurableItemsWrapper.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /configurable-items\.component(?!spec)/
);

ConfigurableItemRow.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /configurable-item-row\.component(?!spec)/
);

const defaultConfigurableItemsData = [
  {
    enabled: true,
    locked: true,
    name: "test 1",
    key: "1",
  },
  {
    enabled: true,
    locked: false,
    name: "test 2",
    key: "2",
  },
  {
    enabled: false,
    locked: false,
    name: "test 3",
    key: "3",
  },
];
const store = new Store({
  configurableItemsData: cloneDeep(defaultConfigurableItemsData),
});
const handleDrag = (draggedIndex, hoveredIndex) => {
  const configurableItemsData = store.get("configurableItemsData");
  const draggedItem = configurableItemsData[draggedIndex];

  configurableItemsData[draggedIndex] = configurableItemsData[hoveredIndex];
  configurableItemsData[hoveredIndex] = draggedItem;

  store.set("configurableItemsData", configurableItemsData);
  action("dragged")();
};
const handleChange = (rowIndex) => {
  const configurableItemsData = store.get("configurableItemsData");
  configurableItemsData[rowIndex].enabled = !configurableItemsData[rowIndex]
    .enabled;
  store.set({ configurableItemsData });
  action("changed")();
};
const handleSave = (event) => {
  event.persist();

  action("saved")();
};
const handleReset = () => {
  store.set({ configurableItemsData: cloneDeep(defaultConfigurableItemsData) });
  action("reset")();
};
const rows = (data) =>
  data.map((column, rowIndex) => {
    return (
      <ConfigurableItemRow
        enabled={column.enabled}
        key={column.key}
        locked={column.locked}
        name={column.name}
        rowIndex={rowIndex}
        onChange={() => handleChange(rowIndex)}
      />
    );
  });

function makeStory(name, themeSelector) {
  const component = () => {
    return (
      <ConfigurableItemsWrapper
        onDrag={handleDrag}
        onCancel={action("canceled")}
        onReset={handleReset}
        onSave={handleSave}
      >
        <State store={store}>
          {(state) => [rows(state.configurableItemsData)]}
        </State>
      </ConfigurableItemsWrapper>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    info: {
      propTablesExclude: [State],
    },
  };

  return [name, component, metadata];
}

storiesOf("Configurable Items", module).add(
  ...makeStory("default", dlsThemeSelector)
);
