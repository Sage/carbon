---
name: carbon-component-batch-selection
description: Carbon BatchSelection component props and usage examples.
---

# BatchSelection

## Import
`import BatchSelection from "carbon-sage/lib/components/batch-selection";`

## Source
- Export: `./components/batch-selection`
- Props interface: `BatchSelectionProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Content to be rendered after selected count |  |
| selectedCount | number | Yes |  | Number of selected elements |  |
| colorTheme | "white" \| "dark" \| "light" \| "transparent" \| undefined | No |  | Color of the background, transparent if not defined | "transparent" |
| disabled | boolean \| undefined | No |  | If true disables all user interaction | false |
| hidden | boolean \| undefined | No |  | Hidden if true |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <BatchSelection selectedCount={0}>
      <Button size="small" mx={1} buttonType="secondary">
        Select All 38 items
      </Button>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
}
```


### Dark

**Render**

```tsx
() => {
  return (
    <BatchSelection selectedCount={1} colorTheme="dark">
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
}
```


### Light

**Render**

```tsx
() => {
  return (
    <BatchSelection selectedCount={2} colorTheme="light">
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
}
```


### White

**Render**

```tsx
() => {
  return (
    <BatchSelection selectedCount={3} colorTheme="white">
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
}
```


### Disabled

**Render**

```tsx
() => {
  return (
    <BatchSelection selectedCount={4} disabled>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
      <Button iconType="home" mr="3px">
        Button
      </Button>
      <Link icon="admin">This is a link</Link>
      <Link icon="admin" onClick={() => {}}>
        This is actually a button but looks like a link
      </Link>
    </BatchSelection>
  );
}
```

