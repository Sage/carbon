---
name: carbon-component-badge
description: Carbon Badge component props and usage examples.
---

# Badge

## Import
`import Badge from "carbon-react/lib/components/badge";`

## Source
- Export: `./components/badge`
- Props interface: `BadgeProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | The badge will be positioned relative to this element |  |
| counter | string \| number \| undefined | No |  |  |  | The number rendered in the badge component | 0 |
| id | string \| undefined | No |  |  |  | Unique identifier for the component. |  |
| inverse | boolean \| undefined | No |  |  |  | Set the style of the Badge to inverse | false |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of the badge | "medium" |
| variant | "subtle" \| "typical" \| undefined | No |  |  |  | Badge variant | "typical" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| color | string \| undefined | No |  | Yes | Prop to specify the color of the component |  |  |
| onClick | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  | Yes | Callback fired when badge is clicked |  |  |
| aria-label | string \| undefined | No |  | Yes | Prop to specify an aria-label for the component |  |  |

## Examples
### Default

**Render**

```tsx
({ ...args }) => {
  return (
    <>
      <Badge id="badge-default-1" counter={9} {...args} />
      <Badge id="badge-default-2" counter={99} {...args} />
      <Badge id="badge-default-3" counter="99+" {...args} />
      <Badge id="badge-default-4" counter="999+" {...args} />
    </>
  );
}
```


### With Children

**Render**

```tsx
({ ...args }) => {
  return (
    <Badge id="badge-button" counter={99} {...args}>
      <Button buttonType="secondary" aria-describedby="badge-button">
        Filter
      </Button>
    </Badge>
  );
}
```


### Sizes

**Render**

```tsx
({ ...args }) => {
  return (
    <>
      <Badge id="badge-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="black" />
      </Badge>
      <Badge id="badge-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-large" counter={99} size="large" {...args} />
    </>
  );
}
```


### Subtle Variant

**Args**

```tsx
{
  variant: "subtle",
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <>
      <Badge id="badge-subtle-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="black" />
      </Badge>
      <Badge id="badge-subtle-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-subtle-large" counter={99} size="large" {...args} />
    </>
  );
}
```


### Inverse

**Args**

```tsx
{
  inverse: true,
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <>
      <Badge id="badge-inverse-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="white" />
      </Badge>
      <Badge id="badge-inverse-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-inverse-large" counter={99} size="large" {...args} />

      <Badge
        id="badge-icon"
        counter={99}
        size="small"
        variant="subtle"
        {...args}
      >
        <Icon type="alert" color="white" />
      </Badge>
      <Badge
        id="badge-subtle-inverse-medium"
        counter={99}
        size="medium"
        variant="subtle"
        {...args}
      />
      <Badge
        id="badge-subtle-inverse-large"
        counter={99}
        size="large"
        variant="subtle"
        {...args}
      />
    </>
  );
}
```


### With OnClick

**Render**

```tsx
({ ...args }) => {
  const counter = 9;
  return (
    <Badge
      id="badge-onclick"
      counter={counter}
      onClick={() => {}}
      aria-label={`Remove ${counter} filters.`}
      {...args}
    >
      <Button aria-describedby="badge-onclick" buttonType="secondary">
        Filter
      </Button>
    </Badge>
  );
}
```


### Custom Color

**Render**

```tsx
({ ...args }) => {
  const counter = 9;
  return (
    <Badge
      id="badge-custom-color"
      counter={counter}
      onClick={() => {}}
      aria-label={`Remove ${counter} filters.`}
      color="--colorsSemanticNegative500"
      {...args}
    >
      <Button
        aria-describedby="badge-custom-color"
        buttonType="secondary"
        destructive
      >
        Filter
      </Button>
    </Badge>
  );
}
```

