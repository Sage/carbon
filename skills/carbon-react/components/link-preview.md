---
name: carbon-component-link-preview
description: Carbon LinkPreview component props and usage examples.
---

# LinkPreview

## Import
`import LinkPreview from "carbon-react/lib/components/link-preview";`

## Source
- Export: `./components/link-preview`
- Props interface: `LinkPreviewProps`

## Props
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

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <LinkPreview
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets?"
    />
  );
}
```


### Link Preview Close Icon

**Render**

```tsx
() => {
  return (
    <LinkPreview
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets?"
      as="div"
      onClose={(url) => action("close icon clicked")(url)}
    />
  );
}
```


### Link Preview Loading State

**Render**

```tsx
() => {
  return <LinkPreview isLoading />;
}
```

