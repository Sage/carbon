# Carbon Provider

A React context provider that supplies global settings such as theme styling and Carbon feature flags to your components.

**Category:** Other

## Quick Start

You can import the provider and any intended themes like so:

```ts
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import { sageTheme } from "carbon-react/lib/style/themes";
```

then wrap your application code with the provider:

```tsx
<CarbonProvider theme={sageTheme}>
  <MyApp />
</CarbonProvider>
```

## Validation Redesign

Carbon is in the process of implementing a new validation design to our components. To opt into the new validation pattern set the `validationRedeisgnOptIn` flag to true in the CarbonProvider.

For more information check our [Validations](../../references/docs/validations.md) documentation page.

```tsx
<CarbonProvider validationRedesignOptIn>
  <MyApp />
</CarbonProvider>
```

## Examples

### Using latest sage theme

We recommend using the latest `sageTheme` to ensure your app has the most up-to-date styling. This theme uses **design tokens** - CSS properties curated by Sage designers in the `@sage/design-tokens` package, which Carbon uses to set styling rules for your components.

See: `examples/SageTheme.md`

Setting the theme to `sageTheme` in `CarbonProvider` loads the design tokens in the browser, meaning you can also use these tokens yourself where a component prop accepts CSS values, such as the `color` prop with `Typography`:

```tsx
<Typography color="--colorsSemanticNegative500">
  This text is coloured with a design token!
</Typography>
```

For a full list of supported tokens, see the [Sage's Design System documentation on design tokens](https://zeroheight.com/2ccf2b601/p/217e24-design-tokens/b/46fb17) for more details.

## Props

### Carbon Provider

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  |
| theme | Partial<ThemeObject> \| undefined | No |  | Theme which specifies styles to apply to all child components. Set to `sageTheme` by default. | sageTheme |
| validationRedesignOptIn | boolean \| undefined | No |  | Feature flag for opting in to the latest validation designs for components that support it. NOTE - Will eventually be set to `true` by default in the future. | false |
