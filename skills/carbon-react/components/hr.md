---
name: carbon-component-hr
description: Carbon Hr component props and usage examples.
---

# Hr

## Import
`import Hr from "carbon-react/lib/components/hr";`

## Source
- Export: `./components/hr`
- Props interface: `HrProps`
- Deprecated: Yes
- Deprecation reason: `Hr` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| adaptiveMxBreakpoint | number \| undefined | No |  | Breakpoint for adaptive left and right margins (below the breakpoint they go to 0). Enables the adaptive behaviour when set |  |
| height | "small" \| "medium" \| "large" \| undefined | No |  | Set the height of the component. Accepts one of "small", "medium", or "large" | "small" |
| m | SpacingProperty | No |  |  |  |
| margin | SpacingProperty | No |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |
| marginX | SpacingProperty | No |  |  |  |
| marginY | SpacingProperty | No |  |  |  |
| mb | SpacingProperty | No |  |  |  |
| ml | SpacingProperty | No |  |  |  |
| mr | SpacingProperty | No |  |  |  |
| mt | SpacingProperty | No |  |  |  |
| mx | SpacingProperty | No |  |  |  |
| my | SpacingProperty | No |  |  |  |
| type | "typical" \| "inverse" \| undefined | No |  | Set the color variant of the horizontal rule. Use "typical" for standard styling or "inverse" for use in darker backgrounds | "typical" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | "true" \| "false" \| undefined | No |  | Set whether the component should be recognised by assistive technologies |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <Hr />;
}
```


### Different Spacing

**Render**

```tsx
() => {
  return <Hr mt={7} mb={7} />;
}
```


### Different Heights

**Render**

```tsx
() => {
  const heights = ["small", "medium", "large"] as const;
  return (
    <Box>
      {heights.map((height) => (
        <Box key={height} mb={3}>
          <Hr height={height} />
        </Box>
      ))}
    </Box>
  );
}
```


### Inverse Type

**Render**

```tsx
() => {
  const heights = ["small", "medium", "large"] as const;
  return (
    <>
      <Box backgroundColor="var(--colorsActionMajor500)">
        {heights.map((height) => (
          <Box key={height} mb={3}>
            <Hr type="inverse" height={height} />
          </Box>
        ))}
      </Box>
    </>
  );
}
```


### Inside Form

**Render**

```tsx
() => {
  return (
    <Form
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Textbox label="Textbox" value="" onChange={() => {}} />
      <Textbox label="Textbox" value="" onChange={() => {}} />
      <Hr mb={7} mt={7} />
      <Textbox label="Textbox" value="" onChange={() => {}} />
    </Form>
  );
}
```


### Inside Form with Inline Labels

**Render**

```tsx
() => {
  return (
    <Form
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Box width="59%">
        <Textbox
          label="Textbox"
          labelInline
          inputWidth={90}
          value=""
          onChange={() => {}}
        />
        <Textbox
          label="Textbox"
          labelInline
          inputWidth={90}
          value=""
          onChange={() => {}}
        />
        <Box ml="11%" mr="4px">
          <Hr mb={7} mt={7} />
        </Box>
        <Textbox
          label="Textbox"
          labelInline
          inputWidth={90}
          value=""
          onChange={() => {}}
        />
      </Box>
    </Form>
  );
}
```


### Enabling Adaptive Behaviour

**Render**

```tsx
() => {
  return <Hr mb={7} mt={7} ml="10%" mr="40%" adaptiveMxBreakpoint={960} />;
}
```

