import { Meta, Canvas } from "@storybook/addon-docs/blocks";

import * as ExtendingStylesStories from "./extending-styles-using-styled-components.stories";

<Meta title="Documentation/Extending Styles of Carbon Components" />

# Extending Styles of Carbon Components

> ⚠️ **WARNING:**
>
> **[We strongly discourage extending the styles of Carbon components](./?path=/docs/documentation-recommended-practices--docs).**
>
> **Please use the available component props to control visuals, or reach out if you have any questions.**
>
> **Extending styles should only be considered as a last resort.**

While it is rare, there may be cases where you need to extend the styles of a Carbon component. If you need to, please proceed with caution. We cannot guarantee our components' internal HTML/CSS will remain unchanged in future updates, therefore extending styles could make your application more fragile. If you decide to go ahead, you can use `styled-components` to create a custom component and apply the necessary styles.

## Example: Extending `Box`

Here we are using the `Box` component and applying styles that are not available through the component's prop interface.

We would always recommend not using this method to manage z-indexes, as this can cause issues with the stacking order of components.
**This method is to be used as a last resort.**

```jsx
// import `styled` interface from the `styled-components` library.
import styled from "styled-components";
// import the component you would like to extend the styles of. In this case, we are using the `Box` component.
import Box from "carbon-react/lib/components/box";

// Creating the custom components for the additional styling to be applied to.
const CustomStyledBox = styled(Box)`
  z-index: 2;
  border: solid 2px red;
`;

const CustomStyledBoxBorders = styled(Box)`
  border-right: dotted 2px red;
  border-left: solid 3px red;
  border-top: dashed 2px black;
  border-bottom: solid 2px black;
`;

// Using the `CustomStyledBox` and `CustomStyledBoxBorders` alongside props that are currently available to the Box component.
return (
  <>
    <CustomStyledBox m={2} bg="aqua" height="250px" width="250px" />
    <CustomStyledBoxBorders m={2} bg="grey" height="250px" width="250px" />
  </>
);
```

Here is an example of the above code in action.

<Canvas of={ExtendingStylesStories.CustomStyledBoxExample} />
