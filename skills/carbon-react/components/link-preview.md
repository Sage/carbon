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
| onClose | ((url?: string) => void) \| undefined | No |  | The callback for the close button. The button is rendered when this is set alongside `as="div"`. |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  | Set the component's size. | "medium" |
| title | string \| undefined | No |  | The title to be displayed |  |
| url | string \| undefined | No |  | The url string to be displayed and to serve as the link's src |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Args**

```tsx
{
    title: "Title",
    url: "https://carbon.sage.com",
    description: "Description",
    image: { url: carbonLogo, alt: "Carbon logo" },
  }
```

**Render**

```tsx
(args) => <LinkPreview {...args} />
```


### LoadingState

**Args**

```tsx
{
    ...Default.args,
    isLoading: true,
  }
```


### WithCloseButton

**Args**

```tsx
{
    ...Default.args,
    as: "div",
  }
```

**Render**

```tsx
(args) => (
    <LinkPreview
      onClose={(url) => action("close button clicked")(url)}
      {...args}
    />
  )
```


### Sizes

**Args**

```tsx
{
    ...Default.args,
  }
```

**Render**

```tsx
(args) => (
    <>
      <LinkPreview size="small" {...args} />
      <LinkPreview size="medium" {...args} />
      <LinkPreview size="large" {...args} />
    </>
  )
```

