# Step Flow

Provide a way to represent an end-to-end journey that a user can complete in one go.

This component has a specific start and end point, as well as showing the current step in the journey.

Use a step flow to help a user complete tasks in a specific order, based on their needs.

## Import

```javascript
import {
  StepFlow,
  StepFlowTitle,
  type StepFlowHandle,
  type Steps
} from "carbon-react/lib/components/step-flow";
```

## Examples

### Default

See: `examples/DefaultStory.md`

### Step Flow Title node

To allow a compositional approach, the `title` prop accepts a node. This can be used to compose custom content to be passed as the title of the `StepFlow` component.
However, it is important to note that it is recommended that the `StepFlowTitle` sub component should be a descendant of the passed node.

See: `examples/TitleNodeStory.md`

### Step Flow Title node with a screen reader only title

The `screenReaderOnlyTitle` prop can be used to pass a custom screen reader only title. This is useful for providing screen reader users with all of the necessary information or context
which may not be available visually.

See: `examples/TitleNodeStoryWithScreenReaderOnlyTitle.md`

### with category

See: `examples/CategoryStory.md`

### with showProgressIndicator

You can set the `showProgressIndicator` prop to `true` to render the progress indicator within the component.

See: `examples/ShowProgressIndicatorStory.md`

### with currentStep

The `currentStep` prop can be used to set the current step, this will update the step label and update the progress indicator. Your
current step can be between `1` and `8`.

See: `examples/CurrentStepStory.md`

### with totalSteps

The `totalSteps` prop can be used to change the amount of steps, this will update the step label and determine the amount of step indicators rendered.
You can have between `1` and `8` total steps.

See: `examples/TotalStepsStory.md`

### with showCloseIcon

You can set the `showCloseIcon` prop to `true` to render a close icon within the component. You can also use the `onDismiss` prop to pass in a function
which is called when a user clicks on the close icon.

See: `examples/ShowCloseIconStory.md`

### Example implementation

Please see below an example implementation of how the component can be used within the `Dialog` component, with the use of `Button`'s to advance through the user
journey. Within the `Dialog` component, the `title` prop accepts a node, so the component can be passed, acting as the `Dialog`'s title. Also `showCloseIcon` can
also be passed to render the close icon, and its `onDismiss` function can be used to close the modal instead of passing `onCancel` to `Dialog`.

Also, the example below fully details the use of a ref to programmatically move focus to a title div which contains all of the necessary information for screen reader users
(`title`, `currentStep`, `totalSteps` and `category` if added), in the form of a properly formatted, visually hidden string.

Please see below an example of what this look like in the DOM.

```jsx
<span data-element="visually-hidden-title-text">
  Add client. Transaction Type. Step 1 of 3.
</span>
```

See: `examples/ExampleImplementation.md`

### Example implementation with title node

See: `examples/ExampleImplementationWithTitleNode.md`

## Props

### Content

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| currentStep | Steps | Yes | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 | The current step of the user journey. If the set `currentStep` is higher than `totalSteps`the value of `currentStep` will be that of `totalSteps` instead. |  |
| title | React.ReactNode | Yes |  | The title of the current step, this can be a string or a valid React node which contains the `<StepFlowTitle />` component as a descendant. |  |
| totalSteps | Steps | Yes | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 | The total steps in the user journey. |  |
| category | string \| undefined | No |  | A category for the user journey. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| onDismiss | ((e: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | function runs when user click dismiss button |  |
| showCloseIcon | boolean \| undefined | No |  | Determines if the close icon button is shown |  |
| showProgressIndicator | boolean \| undefined | No |  | Determines if the progress indicator is shown. |  |
| titleVariant | "h1" \| "h2" \| undefined | No |  | Set the variant of the internal 'Typography' component which contains the title. However, despite the chosen variant the styling will always be overridden. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  | Prop to specify the aria-describedby of the component |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the component |  |
| aria-labelledby | string \| undefined | No |  | Prop to specify the aria-labelledby of the component |  |

## Ref methods

`StepFlow`'s forwarded ref exposes the following imperative methods:

| Method Name | Description                                              |
| ----------- | -------------------------------------------------------- |
| `focus()`   | Programmatically focuses the root container of StepFlow. |
