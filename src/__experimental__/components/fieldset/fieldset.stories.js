import React from "react";
import { text } from "@storybook/addon-knobs";
import Fieldset from "./fieldset.component";
import Textbox from "../textbox";
import { Checkbox } from "../checkbox";

export default {
  title: "Experimental/Fieldset/Test",
  component: Checkbox,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};
export const Default = () => {
  const legend = text("legend", "");

  return (
    <Fieldset legend={legend}>
      <Textbox
        label="First Name"
        labelInline
        labelAlign="right"
        labelWidth={30}
      />
      <Textbox
        label="Last Name"
        labelInline
        labelAlign="right"
        labelWidth={30}
      />
      <Textbox label="Address" labelInline labelAlign="right" labelWidth={30} />
      <Checkbox
        label="Checkbox"
        labelAlign="right"
        labelWidth={30}
        labelSpacing={2}
        reverse
      />
      <Textbox label="City" labelInline labelAlign="right" labelWidth={30} />
      <Textbox label="Country" labelInline labelAlign="right" labelWidth={30} />
      <Textbox
        label="Telephone"
        labelInline
        labelAlign="right"
        labelWidth={30}
      />
    </Fieldset>
  );
};

Default.story = {
  name: "default",
};

// function makeValidationsStory(name) {
//   const component = () => {
//     return (
//       <>
//         {["error", "warning", "info"].map((type) =>
//           ["Message", true].map((content) => (
//             <Fieldset
//               key={`${type}_${content}`}
//               legend={`${type} validation as ${
//                 typeof content === "string" ? "string" : "boolean"
//               }`}
//             >
//               <Textbox
//                 label="Address"
//                 labelInline
//                 labelAlign="right"
//                 {...{ [type]: content }}
//               />
//               <Textbox label="Town/City" labelInline labelAlign="right" />
//               <Select
//                 label="Province"
//                 labelInline
//                 labelAlign="right"
//                 {...{ [type]: content }}
//               >
//                 <Option key="ab" text="Alberta" value="ab" />
//                 <Option key="on" text="Ontario" value="on" />
//                 <Option key="qc" text="Quebec" value="qc" />
//               </Select>
//               <Textbox
//                 label="ZIP Code"
//                 labelInline
//                 labelAlign="right"
//                 styleOverride={{ input: { width: "120px", flex: "none" } }}
//               />
//             </Fieldset>
//           ))
//         )}
//       </>
//     );
//   };

//   const metadata = {
//     themeSelector: dlsThemeSelector,
//   };

//   return [name, component, metadata];
// }
