# LinkPreview

## Import

```javascript
import LinkPreview from "carbon-react/lib/components/link-preview";
```

## Examples

### Default

By default the component will render an anchor element if it is not in a loading state. This means the whole component can
be focused via tabbing and pressing enter or clicking will open the target in a new tab. The component surfaces a range of
props which can be seen in the table below. If no `image` props are passed a placeholder will be used.

See: `examples/DefaultStory.md`

### With loading state

If no `url` is passed or the `isLoading` prop is true the component will display in a loading state. When in this state, it
renders as a `div` element: it cannot be focused via tabbing and clicking will not trigger anything.

See: `examples/LinkPreviewLoadingState.md`

### With close icon

If the component is rendered in edit mode as a `div` element, it is possible to pass an `onClose` callback which will render
a close icon and pass the callback to it. The icon can be focused via tabbing and the callback will be triggered via click or
via pressing enter or space when focused.

See: `examples/LinkPreviewCloseIcon.md`

## Props

### LinkPreview

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| as | "a" \| "div" \| undefined | No |  | Used to set the root element to either an anchor link or div container |  |
| description | string \| undefined | No |  | The description to be displayed |  |
| image | ImageShape \| undefined | No |  | The config for the image to be displayed |  |
| isLoading | boolean \| undefined | No |  | Flag to trigger the loading animation |  |
| onClose | ((url?: string) => void) \| undefined | No |  | The callback to handle the deleting of a Preview, to hide the close button do not set this prop |  |
| title | string \| undefined | No |  | The title to be displayed |  |
| url | string \| undefined | No |  | The url string to be displayed and to serve as the link's src |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
