---
name: carbon-component-carbon-provider
description: Carbon CarbonProvider component props and usage examples.
---

# CarbonProvider

## Import
`import CarbonProvider from "carbon-react/lib/components/carbon-provider";`

## Source
- Export: `./components/carbon-provider`
- Props interface: `CarbonProviderProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  |
| theme | Partial<ThemeObject> \| undefined | No |  | Theme which specifies styles to apply to all child components. Set to `sageTheme` by default. | sageTheme |
| validationRedesignOptIn | boolean \| undefined | No |  | Feature flag for opting in to the latest validation designs for components that support it. NOTE - Will eventually be set to `true` by default in the future. | false |

## Examples
### MDX Example 1

**Args**

```tsx
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import { sageTheme } from "carbon-react/lib/style/themes";
```


### MDX Example 2

**Args**

```tsx
<CarbonProvider theme={sageTheme}>
  <MyApp />
</CarbonProvider>
```


### MDX Example 3

**Args**

```tsx
<Typography color="--colorsSemanticNegative500">
  This text is coloured with a design token!
</Typography>
```


### MDX Example 4

**Args**

```tsx
<CarbonProvider validationRedesignOptIn>
  <MyApp />
</CarbonProvider>
```


### Using Latest Sage Theme

**Render**

```tsx
() => {
  return (
    <CarbonProvider theme={sageTheme}>
      <Button buttonType="primary">Button</Button>
    </CarbonProvider>
  );
}
```

