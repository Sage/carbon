import { Meta, Canvas } from "@storybook/blocks";
import * as DeprecationMigrationStories from "./deprecation-migration.stories";

<Meta title="Documentation/Deprecation Migration" />

# Carbon Components Deprecation Migration Guide

Several Carbon components have been recently deprecated. This guide provides migration paths to facilitate the transition to alternative patterns and components. Some deprecated components can be rebuilt using other existing Carbon components. Consult the specific migration documentation below for implementation details.

## Recommended Alternatives

The following section provides migration guidance for deprecated components that can't be either fully replicated or almost fully replicated using a composition of Carbon components:

- For `ButtonBar`, a combination of [`Button`](?path=/docs/button--docs) components wrapped in a layout component such as [`Box`](?path=/docs/box--docs).
- For `ButtonMinor` or `MinorButton` use any relevant [`Button`](?path=/docs/button--docs) with the desired `buttonType`.
- For `DuellingPicklist`, a combination of [`Select`](?path=/docs/select--docs), [`Checkbox`](?path=/docs/checkbox--docs) and [`Profile`](?path=/docs/profile--docs) components, as well as layout components such as [`Box`](?path=/docs/box--docs) can be used to achieve an alternative pattern. See the [Design System pattern here](https://zeroheight.com/35ee2cc26/v/latest/p/7505ab-profile-selector) for more information.
- For `Grid`, [`Box`](?path=/docs/box--docs) is recommended as the preferred alternative, `Box` has all of the necessary grid layout capabilities through its style properties.
- For `IconButton`, eventually [`Button`](?path=/docs/button--docs) with an [`Icon`](?path=/docs/icon--docs) passed as a child will be the preferred alternative.
- For `InlineInput`, using inputs which are placed next to each other horizontally is recommended as the preferred alternative - **however** ensure labels are clearly associated with the relevant input for accessibility.
- For `Pages`, [`StepFlow`](?path=/docs/step-flow--docs) is recommended as the preferred alternative.
- For `Pod`, [`Tile`](?path=/docs/tile--docs) is recommended as the preferred alternative. Any additional button's for save/edit functionality can be added via [`Button`](?path=/docs/button--docs) with an [`Icon`](?path=/docs/icon--docs) passed as a child.
- For `Toast`, [`Message`](?path=/docs/message--docs) is recommended as the preferred alternative.
- For `Tooltip`, using visible input hints are recommended as the preferred alternative. Relying on a tooltip can lead to discoverability issues, it's better to provide context directly which is instantly available.
- For `Hr`, [`Divider`](?path=/docs/divider--docs) is recommended as the preferred alternative.
- For `VerticalDivider`, [`Divider`](?path=/docs/divider--docs) is recommended as the preferred alternative.
- For `LoaderBar`, `LoaderStar` and `LoaderSpinner`: the new [`Loader`](?path=/docs/loader--docs) is recommended as the preferred alternative.

## Alternative Patterns

The following sections provide migration guidance for deprecated components that can be either be fully replicated or almost fully replicated using a composition of other Carbon components:

- [Alert](#alert)
- [Confirm](#confirm)
- [Content](#content)
- [Detail](#detail)
- [Dismissible Box](#dismissible-box)
- [Grouped Character](#grouped-character)
- [Heading](#heading)
- [Number](#number)
- [Setting sRow](#settings-row)
- [Hr](#hr)
- [VerticalDivider](#vertical-divider)

## Alert

The `Alert` component can be replaced by a `Dialog` with a role of `alertdialog`. This approach maintains semantic accessibility whilst providing the same functionality.

```js
import Dialog from "carbon-react/lib/components/dialog";
```

<Canvas of={DeprecationMigrationStories.Alert} />

## Confirm

The `Confirm` component can be replaced by a `Dialog` with a role of `alertdialog` containing cancel and confirm `Button` components passed as children. 
A layout-based component such as `Box` can be used to position the `Button` components as required to match the original design.

Since the `Button` components are passed as children, complete control over the `Button` properties is now available, allowing for customisation of appearance and behaviour. 
It is recommended to use the `Button` component's `buttonType` and `destructive` properties to differentiate between primary and secondary actions.

```js
import Dialog from "carbon-react/lib/components/dialog";
import Button from "carbon-react/lib/components/button";
import Box from "carbon-react/lib/components/box";
```

<Canvas of={DeprecationMigrationStories.Confirm} />

## Content

The `Content` component can be replaced with the `Typography` component, `Typography` provides consistent styling and typography hierarchy.

```js
import Typography from "carbon-react/lib/components/typography";
```

<Canvas of={DeprecationMigrationStories.Content} />

## Detail


The `Detail` component can be replaced with the `Typography` component, `Typography` provides consistent styling and typography hierarchy.

<Canvas of={DeprecationMigrationStories.Detail} />

## Dismissible Box

A close replication of the `DismissibleBox` component can be achieved using the `Box` component for layout and structure. An `IconButton` can be used for the close functionality. 
Additional styling can be achieved using the `Box` component's style props. The `VerticalDivider` component can be used to separate content sections as needed.

> **Note**: Currently there is no way to add a border using `Box`, however if one is required a border can be added to a `<div>` element. 

```js
import Box from "carbon-react/lib/components/box";
import IconButton from "carbon-react/lib/components/icon-button";
import Icon from "carbon-react/lib/components/icon";
import VerticalDivider from "carbon-react/lib/components/vertical-divider";
import Typography from "carbon-react/lib/components/typography";
```

<Canvas of={DeprecationMigrationStories.DismissibleBox} />

## Grouped Character

The `GroupedCharacter` component can be replaced with the `Textbox` component.

It is **strongly recommended** to consider the user experience implications of real-time formatting. 
While automatic formatting can improve data entry consistency, overly restrictive input handling may interfere with users who paste formatted data, use assistive technologies, or have different input patterns. 
Instead, consider validating the pattern on blur or submission events whilst providing clear visual feedback and error messages that show the expected format.

```js
import Textbox from "carbon-react/lib/components/textbox";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
```

<Canvas of={DeprecationMigrationStories.GroupedCharacter} />

## Heading

The `Heading` component can be replaced with the `Typography` component with a `variant` of `"h1"`, `Typography` provides consistent styling and typography hierarchy.

The `Hr` component provides a horizontal rule below the heading.

```js
import Typography from "carbon-react/lib/components/typography";
import Hr from "carbon-react/lib/components/hr";
```

### Basic Heading

<Canvas of={DeprecationMigrationStories.Heading} />

### Heading with Pills

The `Heading` component can also be enhanced with `Pill` components for additional context or categorisation. Use the `Box` component to control layout and alignment of the heading and pills.

```js
import Box from "carbon-react/lib/components/box";
import Pill from "carbon-react/lib/components/pill";
```

<Canvas of={DeprecationMigrationStories.HeadingWithPills} />

## Number

The `Number` component can be replaced with the `Textbox` component.

It is **strongly recommended** to avoid restricting user input to only numeric values during typing, as this can lead to poor user experience and accessibility issues. 
Instead, validate the input on submission or blur events whilst providing clear error messages.

```js
import Textbox from "carbon-react/lib/components/textbox";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
```

<Canvas of={DeprecationMigrationStories.Number} />

## Settings Row

The `SettingsRow` component can be replaced with a combination of `Box`, `Hr`, and `Typography` components. Specific style properties applied to the `Box` component achieve a similar layout structure. 
The layout uses a two-column approach with the title and description in the first column and the settings content in the second column.

```js
import Box from "carbon-react/lib/components/box";
import Hr from "carbon-react/lib/components/hr";
import Typography from "carbon-react/lib/components/typography";
```

### Basic Settings Row

<Canvas of={DeprecationMigrationStories.SettingsRow} />

### Settings Row with Multiple Heading Levels

The `variant` prop on the `Typography` component can be used to render heading levels from `"h1"` - `"h5"`, this allows for a consistent visual hierarchy whilst maintaining semantic structure.

<Canvas of={DeprecationMigrationStories.SettingsRowHeadingLevels} />

## Hr

The `Hr` component can be replaced by a `Divider` with type `horizontal`. The `Divider` component will provide consistent styling while maintaining the same functionality.

<Canvas of={DeprecationMigrationStories.Hr} />

## Vertical Divider

The `VerticalDivider` component can be replaced by a `Divider`. The `Divider` component will provide consistent styling while maintaining the same functionality.

<Canvas of={DeprecationMigrationStories.VerticalDivider} />