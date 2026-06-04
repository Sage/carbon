# Draggable

Pick, move and replace an order. Draggable is a great component if you need to have interactive components
with possibility to change their order with drag and drop mechanics

## Import

```javascript
import {
  DraggableContainer,
  DraggableItem,
} from "carbon-react/lib/components/draggable";
```

## Testing drag behaviour

### Recommended approach

We recommend testing drag and drop interactions in browser environments using tools like Playwright or Cypress, rather than Node-based environments like JSDOM. Since JSDOM does not render visual content, tests will require extensive mocking to simulate drag and drop behaviour, making them less effective.

### JSDOM tests (if required)

If you need to test within JSDOM, you can test drag and drop behaviour by using a `DragEvent` polyfill and mocking the bounding boxes of any drop targets.

[Pragmatic Drag and Drop](https://atlassian.design/components/pragmatic-drag-and-drop/core-package/testing/about) provides a `DragEvent` polyfill specifically designed for unit tests in JSDOM. To set it up, first install the package:

```bash
npm install --save-dev @atlaskit/pragmatic-drag-and-drop/unit-testing
```

Then, import the polyfill into your test runner's setup file:

```javascript
// jest.config.js
module.exports = {
    setupFiles: ['./tests/setup-drag-events.js'],
};

// tests/setup-drag-events.js
import '@atlaskit/pragmatic-drag-and-drop/unit-testing/drag-event-polyfill';
```

In your tests, mock the bounding boxes of any rendered `DraggableItem` components designated as drop targets. This will ensure all hitbox calculations work correctly:

```tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DraggableContainer, DraggableItem } from "carbon-react/lib/components/draggable";

const mockedDOMRect = ({
  width,
  height,
  x,
  y,
}: {
  width: number;
  height: number;
  x: number;
  y: number;
}): DOMRect => {
  return {
    width,
    height,
    top: y,
    left: x,
    bottom: y + height,
    right: x + width,
    x,
    y,
    toJSON: () => {},
  };
};

test("positions dragged item below target when dropped near its bottom edge", () => {
  render(
    <DraggableContainer data-role="container">
      <DraggableItem id="apple" data-role="apple">
        Apple
      </DraggableItem>
      <DraggableItem id="banana">Banana</DraggableItem>
      <DraggableItem id="cherry" data-role="cherry">
        Cherry
      </DraggableItem>
    </DraggableContainer>,
  );

  const apple = screen.getByTestId("apple");
  const cherry = screen.getByTestId("cherry");

  const CHERRY_RECT = mockedDOMRect({
    x: 0,
    y: 80,
    width: 100,
    height: 40,
  });

  jest.spyOn(cherry, "getBoundingClientRect").mockReturnValue(CHERRY_RECT);

  fireEvent.dragStart(apple);
  fireEvent.dragEnter(cherry);
  fireEvent.dragOver(cherry, {
    clientX: CHERRY_RECT.x,
    clientY: CHERRY_RECT.y + CHERRY_RECT.height,
  });
  fireEvent.drop(cherry);
  fireEvent.dragEnd(apple);

  const container = screen.getByTestId("container");
  expect(container).toHaveTextContent(/BananaCherryApple/);
});
```

## Examples

### Simple text as a content

See: `examples/DefaultStory.md`

### With flex direction

See: `examples/FlexDirectionStory.md`

### Other components as children

See: `examples/ComponentsAsChildrenStory.md`

### With getOrder callback

See: `examples/GetOrderCallbackStory.md`

## Props

### DraggableContainer

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | The content of the component `<DraggableItem />` is required to make `Draggable` works |  |
| flexDirection | "row" \| "row-reverse" \| undefined | No |  | Defines the direction in which the draggable items contents are placed. Can be either "row" or "row-reverse". | "row" |
| getOrder | ((draggableItemIds?: (string \| number \| undefined)[], movedItemId?: string \| number \| undefined) => void) \| undefined | No |  | Callback fired when an item is successfully dropped. |  |
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
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### DraggableItem

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The content of the component. |  |
| id | string \| number | Yes |  | The id of the `DraggableItem`. Use this prop to make `Draggable` work |  |
| flexDirection | "row" \| "row-reverse" \| undefined | No |  |  |  |
| index | number \| undefined | No |  |  |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom | 1 |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
