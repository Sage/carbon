---
name: carbon-component-skeleton
description: Carbon Skeleton component props and usage examples.
---

# Skeleton

## Import
`import Skeleton from "carbon-react/lib/components/skeleton";`

## Source
- Export: `./components/skeleton`
- Props interface: `SkeletonProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| disableAnimation | boolean \| undefined | No |  | Disables animation. Animation is also disabled when the user prefers reduced motion. |  |
| lines | SkeletonRow[] \| undefined | No |  | Describes the skeleton as rows. Each top-level object renders one line; use a nested array to render multiple lines side by side in the same row. Defaults to one full-width paragraph-height line. | DEFAULT_LINES |
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
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Accessible name used to communicate the loading state. |  |

## Examples
### Playground

**Args**

```tsx
{
    lines: [
      [
        { height: "48px", shape: "circle" },
        {
          height: "24px",
          width: "40%",
          shape: "rectangle-curved",
        },
      ],
      { preset: "paragraph", width: "100%" },
      { preset: "paragraph", width: "85%" },
      { preset: "paragraph", width: "65%" },
    ],
    disableAnimation: false,
  }
```

**Render**

```tsx
(args) => <Skeleton {...args} />
```


### Disable Animation

**Args**

```tsx
{
    disableAnimation: true,
    lines: [
      {
        height: "80px",
        width: "min(600px, 100%)",
        shape: "rectangle-curved",
      },
    ],
  }
```


### Composed Layout

**Render**

```tsx
() => {
  const line = (width: string) => ({
    height: "16px",
    width,
    shape: "rectangle-curved" as const,
  });

  return (
    <div
      style={{
        backgroundColor: "var(--container-standard-bg-alt)",
        boxSizing: "border-box",
        maxWidth: "462px",
        padding: "12px",
        width: "100%",
      }}
    >
      <Tile hasOutline p={3} roundness="curved">
        <Box width="100%">
          <Skeleton
            lines={[
              {
                height: "32px",
                width: "200px",
                shape: "rectangle-curved",
              },
            ]}
          />

          <Divider aria-hidden type="horizontal" mb="0px" mt={4} />

          <Box
            display="grid"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            pb={5}
            pt={2}
          >
            <Skeleton lines={[line("100px"), line("70px")]} />
            <Skeleton
              lines={[
                line("120px"),
                line("120px"),
                line("70px"),
                line("70px"),
                line("120px"),
              ]}
            />
          </Box>

          <Divider aria-hidden type="horizontal" my="0px" />

          <Box
            display="grid"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            pb="36px"
            pt={2}
          >
            <Skeleton lines={[line("70px"), line("100px"), line("70px")]} />
            <Skeleton lines={[line("150px"), line("150px"), line("150px")]} />
          </Box>

          <Divider aria-hidden type="horizontal" my="0px" />

          <Box pt={2}>
            <Skeleton lines={[line("150px")]} />
          </Box>
        </Box>
      </Tile>
    </div>
  );
}
```


### MDX Example 1

**Args**

```tsx
import Skeleton from "carbon-react/lib/components/skeleton";
```


### MDX Example 2

**Args**

```tsx
<Skeleton
  lines={[
    [
      { height: "48px", shape: "circle" },
      {
        height: "24px",
        width: "40%",
        shape: "rectangle-curved",
      },
    ],
    { preset: "paragraph", width: "100%" },
    { preset: "paragraph", width: "85%" },
    { preset: "paragraph", width: "65%" },
  ]}
/>
```

