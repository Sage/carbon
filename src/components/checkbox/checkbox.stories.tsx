import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import { Checkbox } from ".";

// eslint-disable-next-line import/prefer-default-export
export const CheckboxComponent: ComponentStory<typeof Checkbox> = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Checkbox
      label="Example checkbox"
      name="checkbox-default"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};

//     export const CheckboxComponentSizes: ComponentStory<
//   typeof Checkbox
// > = () => {
//       return ["small", "large"].map((size) => (
//         <Checkbox
//           label={size}
//           key={`checkbox-${size}`}
//           name={`checkbox-default`}
//           size={size}
//         />);
//       };

export const CheckboxComponentDisabled: ComponentStory<
  typeof Checkbox
> = () => {
  return <Checkbox label="Disabled checkbox" disabled />;
};

export const CheckboxComponentReversed: ComponentStory<
  typeof Checkbox
> = () => {
  return <Checkbox label="Reversed checkbox" reverse />;
};

//   export const CheckboxComponentWithFieldHelp: ComponentStory<
//   typeof Checkbox
// > = () => {
//   return (
//   <Checkbox
//     label="With fieldHelp"
//     fieldHelp="This text provides help for the input."
//   />

//   <Checkbox
//     label="With inline fieldHelp"
//     fieldHelp="This text provides help for the input."
//     fieldHelpInline
//   />
//         );
//       };

export const CheckboxComponentWithLabelHelp: ComponentStory<
  typeof Checkbox
> = () => {
  return (
    <Checkbox
      label="With labelHelp"
      labelHelp="This text provides more information for the label."
      helpAriaLabel="This text provides more information for the label."
    />
  );
};

//   export const CheckboxComponentWithCustomLabelWidth: ComponentStory<
//   typeof Checkbox
// > = () => {
//   return (
//   <Checkbox label="With custom labelWidth" labelWidth={100} />
//   <Checkbox
//     label="With custom labelWidth and label aligned to right"
//     labelWidth={100}
//     labelAlign="right"
//   />
//         );
//       };

// export const CheckboxGroupComponent: ComponentStory<
//   typeof CheckboxGroup
// > = () => {
//   return (
//     <CheckboxGroup
//     id="checkbox-group"
//     name="checkbox-group"
//     legend="Checkbox Group"
//   >
//     {["One", "Two", "Three"].map((label) => (
//       <Checkbox
//         id={`checkbox_${name}-${label}`}
//         key={`checkbox_${name}-${label}`}
//         name={`checkbox_${name}-${label}`}
//         label={label}
//       />
//     ))}
//   </CheckboxGroup>
//   );
// };

// export const CheckboxGroupComponentWithInlineLegend: ComponentStory<
//   typeof CheckboxGroup
// > = () => {
//   return (
//     <CheckboxGroup
//     id="checkbox-group"
//     name="checkbox-group"
//     legend="Checkbox Group"
//   >
//     {["One", "Two", "Three"].map((label) => (
//       <Checkbox
//         id={`checkbox_${name}-${label}`}
//         key={`checkbox_${name}-${label}`}
//         name={`checkbox_${name}-${label}`}
//         label={label}
//       />
//     ))}
//   </CheckboxGroup>
//   );
// };
