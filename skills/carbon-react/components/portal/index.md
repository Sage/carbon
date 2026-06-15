# Portal

The Portal component allows you to render children into a different part of the DOM, whilst also allowing the use of styling using the Design System's `design-tokens` package.

**Category:** Modal

## Quick Start

```javascript
import Portal from "carbon-react/lib/components/portal";
```

## Usage

This example demonstrates how to render a Portal with a Box component as a child that uses a design-token for the background color.

```javascript
import Portal from "carbon-react/lib/components/portal";
import Box from "carbon-react/lib/components/box";

/* ... */
<Portal>
  <Box bg="var(--colorsUtilityMajor010)">Portal content</Box>
</Portal>;
```

## Props

### Portal

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | The content of the portal. |  |
| className | string \| undefined | No |  |  |  |
| id | string \| undefined | No |  | Id attribute attached to portal container. |  |
| inertOptOut | boolean \| undefined | No |  | A flag to ensure the portal content will remain interactive with by both mouse users and screenreader users, even if a modal is opened outside of or on top of the portal. To be used with caution. |  |
| onReposition | (() => void) \| undefined | No |  | Callback function triggered when parent element is scrolled or window resized. |  |
