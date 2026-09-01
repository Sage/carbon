---
name: carbon-component-batch-selection
description: Carbon BatchSelection component props and usage examples.
---

# BatchSelection

## Import
`import BatchSelection from "carbon-react/lib/components/batch-selection";`

## Source
- Export: `./components/batch-selection`
- Props interface: `BatchSelectionProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | Content to be rendered after selected count. |  |
| selectedCount | number | Yes |  |  |  | Number of selected items |  |
| onDismiss | (() => void) \| undefined | No |  |  |  | Callback called when the close button is clicked. Renders the close button when provided. |  |
| smallScreen | boolean \| undefined | No |  |  |  | Flag to adjust layout for small screens |  |
| totalItems | number \| undefined | No |  |  |  | Total number of items |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| colorTheme | "white" \| "dark" \| "light" \| "transparent" \| undefined | No |  | Yes | Changing the color theme of this component is no longer supported. |  |  |
| disabled | boolean \| undefined | No |  | Yes | Disabling this component is no longer supported. |  |  |
| hidden | boolean \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. Please use conditional rendering instead. | If true, the component is hidden. |  |

## Examples
### Default

**Args**

```tsx
{
    selectedCount: 1,
    totalItems: 10,
    onDismiss: () => {},
  }
```

**Render**

```tsx
(args) => (
    <BatchSelection {...args}>
      <Button variantType="tertiary">Button 1</Button>
      <Button variantType="tertiary">Button 2</Button>
      <Button variantType="tertiary">Button 3</Button>
    </BatchSelection>
  )
```


### SmallScreen

**Args**

```tsx
{
    smallScreen: true,
    selectedCount: 1,
    totalItems: 10,
    onDismiss: () => {},
  }
```

**Render**

```tsx
(args) => (
    <BatchSelection {...args}>
      <Button variantType="tertiary">Button 1</Button>
      <Button variantType="tertiary">Button 2</Button>
    </BatchSelection>
  )
```


### ExampleImplementation

**Args**

```tsx
{
    selectedCount: 1,
    totalItems: 10,
    onDismiss: () => {},
  }
```

**Render**

```tsx
(args) => {
    const isSmallScreen = useMediaQuery("(max-width: 680px)");
    const isLargeScreen = useMediaQuery("(min-width: 840px)");

    const smallScreenActions = (
      <Button variantType="subtle">
        Actions
        <Icon type="caret_down" />
      </Button>
    );

    const mediumScreenActions = (
      <>
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 1
        </Button>
        <Button variantType="tertiary">
          <Icon type="ellipsis_horizontal" />
          More
        </Button>
      </>
    );

    const largeScreenActions = (
      <>
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 1
        </Button>
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 2
        </Button>
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 3
        </Button>
      </>
    );

    return (
      <BatchSelection smallScreen={isSmallScreen} {...args}>
        <Button variantType="subtle">
          <Icon type="check_none" />
          Select All
        </Button>
        {!isSmallScreen && <Divider p={0} height="40px" />}
        {isSmallScreen && smallScreenActions}
        {isLargeScreen && largeScreenActions}
        {!isSmallScreen && !isLargeScreen && mediumScreenActions}
      </BatchSelection>
    );
  }
```

