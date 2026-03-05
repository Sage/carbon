---
name: carbon-component-pod
description: Carbon Pod component props and usage examples.
---

# Pod

## Import
`import Pod from "carbon-sage/lib/components/pod";`

## Source
- Export: `./components/pod`
- Props interface: `PodProps`
- Deprecated: Yes
- Deprecation reason: `Pod` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alignTitle | "left" \| "right" \| "center" \| undefined | No |  | Aligns the title to left, right or center |  |
| border | boolean \| undefined | No |  | Enables/disables the border around the pod. |  |
| children | React.ReactNode | No |  | Children elements |  |
| displayEditButtonOnHover | boolean \| undefined | No |  | Determines if the edit button should be hidden until the user hovers over the content |  |
| editContentFullWidth | boolean \| undefined | No |  | Determines if the editable pod content should be full width |  |
| footer | React.ReactNode | No |  | A component to render as a Pod footer |  |
| height | string \| number \| undefined | No |  | Sets Pod height, number is changed to pixels and string is passed as raw css value |  |
| internalEditButton | boolean \| undefined | No |  | Renders edit button inside the pod if it exists. |  |
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
| onDelete | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  | Supplies a delete action to the pod |  |
| onEdit | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  | Supplies an edit action to the pod |  |
| onUndo | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  | Supplies an undo action to the pod in soft delete state. |  |
| size | "small" \| "medium" \| "large" \| "extra-small" \| "extra-large" \| undefined | No |  | Determines the padding around the pod |  |
| softDelete | boolean \| undefined | No |  | Sets soft boolean delete state |  |
| subtitle | React.ReactNode | No |  | Optional subtitle for the pod |  |
| title | React.ReactNode | No |  | Title for the pod |  |
| triggerEditOnContent | boolean \| undefined | No |  | Determines if clicking the pod content calls the onEdit action |  |
| variant | "primary" \| "secondary" \| "tertiary" \| "transparent" \| "tile" \| undefined | No |  | Prop to apply a theme to the Pod |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <Pod title="Title">Content</Pod>;
}
```


### With Title and Subtitle Node

**Render**

```tsx
() => {
  return (
    <Pod
      title={<Typography variant="h1">Title</Typography>}
      subtitle={<Typography variant="h2">Subtitle</Typography>}
    >
      Content
    </Pod>
  );
}
```


### With Custom Height

**Render**

```tsx
() => {
  return (
    <Pod title="Title" subtitle="Subtitle" footer="Footer" height={350}>
      Content
    </Pod>
  );
}
```


### Even Height Multiple Pods

**Render**

```tsx
() => {
  return (
    <GridContainer>
      <GridItem gridColumn="1/5">
        <Pod height="100%">
          <Typography variant="big" mb={2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&lsquo;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMa ker including versions of Lorem Ipsum.
          </Typography>
        </Pod>
      </GridItem>
      <GridItem gridColumn="5/9">
        <Pod height="100%">
          <Typography mb={2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&lsquo;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software lie
            Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Pod>
      </GridItem>
      <GridItem gridColumn="9/13">
        <Pod height="100%">
          <Typography mb={2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&lsquo;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Pod>
      </GridItem>
    </GridContainer>
  );
}
```


### With Subtitle and Footer

**Render**

```tsx
() => {
  return (
    <Pod title="Title" subtitle="Subtitle" footer="Footer">
      Content
    </Pod>
  );
}
```


### Without Border

**Render**

```tsx
() => {
  return (
    <Pod title="Title" subtitle="Subtitle" footer="Footer" border={false}>
      Content
    </Pod>
  );
}
```


### With Edit Button

**Render**

```tsx
() => {
  return (
    <Pod title="Title" subtitle="Subtitle" footer="Footer" onEdit={() => {}}>
      Content
    </Pod>
  );
}
```


### With Delete Button

**Render**

```tsx
() => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      onDelete={() => {}}
      onUndo={() => {}}
    >
      Content
    </Pod>
  );
}
```


### Soft Delete State

**Render**

```tsx
() => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onUndo={() => {}}
      softDelete
    >
      Soft delete state
    </Pod>
  );
}
```


### With Display Edit Button On Hover

**Render**

```tsx
() => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      displayEditButtonOnHover
    >
      Content
    </Pod>
  );
}
```


### With Edit Content Full Width

**Render**

```tsx
() => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      onDelete={() => {}}
      editContentFullWidth
    >
      Content
    </Pod>
  );
}
```


### With Internal Edit Button

**Render**

```tsx
() => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      internalEditButton
      onEdit={() => {}}
      onDelete={() => {}}
    >
      Content
    </Pod>
  );
}
```


### With Different Variants

**Render**

```tsx
() => {
  const variants = [
    "primary",
    "secondary",
    "tertiary",
    "tile",
    "transparent",
  ] as const;

  return (
    <Box>
      {variants.map((variant) => (
        <Pod
          key={variant}
          title="Title"
          subtitle="Subtitle"
          footer="Footer"
          onEdit={() => {}}
          onDelete={() => {}}
          variant={variant}
          mb={3}
        >
          {variant}
        </Pod>
      ))}
    </Box>
  );
}
```


### With Different Sizes

**Render**

```tsx
() => {
  const sizes = [
    "extra-small",
    "small",
    "medium",
    "large",
    "extra-large",
  ] as const;
  return (
    <Box>
      {sizes.map((size) => (
        <Box key={size}>
          <Pod
            title="Title"
            subtitle="with edit and delete buttons"
            footer="Footer"
            onEdit={() => {}}
            onDelete={() => {}}
            size={size}
            mb={3}
          >
            {size}
          </Pod>
          <Pod
            title="Title"
            subtitle="with undo button"
            footer="Footer"
            onUndo={() => {}}
            softDelete
            size={size}
            mb={3}
          >
            {size}
          </Pod>
        </Box>
      ))}
    </Box>
  );
}
```


### With Different Title Alignments

**Render**

```tsx
() => {
  const alignments = ["left", "center", "right"] as const;
  return (
    <Box>
      {alignments.map((alignment) => (
        <Pod
          key={alignment}
          title="Title"
          subtitle="Subtitle"
          footer="Footer"
          onEdit={() => {}}
          alignTitle={alignment}
          mb={3}
        >
          {alignment}
        </Pod>
      ))}
    </Box>
  );
}
```


### Address Example

**Render**

```tsx
() => {
  return (
    <Pod internalEditButton variant="tertiary">
      <Box>
        <Typography variant="h4" fontWeight="500">
          Unit 1
        </Typography>
        <Typography m={0}>South Nelson Industrial Estate</Typography>
        <Typography m={0}>Cramlington</Typography>
        <Typography m={0}>NE23 1WF</Typography>
        <Typography m={0}>United Kingdom</Typography>
      </Box>
      <Button buttonType="tertiary" size="small" mt={1} px={0}>
        Select a different address
      </Button>
      <Box position="absolute" right="8px" top="8px">
        <Button
          buttonType="tertiary"
          size="small"
          iconType="edit"
          iconPosition="after"
        >
          Edit
        </Button>
      </Box>
    </Pod>
  );
}
```

