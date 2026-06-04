# Toast

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Toast has been deprecated, if this pattern is still needed please see our deprecation migration docs for a recommended alternative.
</DeprecationWarning>

## Import

```javascript
import Toast from "carbon-react/lib/components/toast";
```

## Props

### Toast

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The rendered children of the component. |  |
| align | AlignOptions \| undefined | No |  | Sets the horizontal alignment of the component. |  |
| alignY | AlignYOptions \| undefined | No |  | Sets the vertical alignment of the component |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  | Data tag prop bag for close Button |  |
| disableAutoFocus | boolean \| undefined | No |  | Disables auto focus functionality when the Toast has a close icon |  |
| id | string \| undefined | No |  | Custom id |  |
| maxWidth | string \| undefined | No |  | Maximum toast width |  |
| onDismiss | ((ev?: KeyboardEvent \| React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback for when dismissed. |  |
| open | boolean \| undefined | No |  | Determines if the Toast is open. |  |
| targetPortalId | string \| undefined | No |  | Target Portal ID where the Toast will render |  |
| timeout | string \| number \| undefined | No |  | Time for Toast to remain on screen |  |
| variant | ToastVariants \| undefined | No |  | Sets Toast variant |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
