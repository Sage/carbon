# Carbon Provider

A React context provider that supplies global settings such as theme styling and Carbon feature flags to your components.

## Import

```javascript
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import { sageTheme } from "carbon-react/lib/style/themes";
```

## Validation Redesign

Carbon is in the process of implementing a new validation design to our components. To opt into the new validation pattern set the `validationRedeisgnOptIn` flag to true in the CarbonProvider.

For more information check our Validations documentation page.

```tsx
<CarbonProvider validationRedesignOptIn>
  <MyApp />
</CarbonProvider>
```

## Examples

### Using latest sage theme

We recommend using the latest `sageTheme` to ensure your app has the most up-to-date styling. This theme uses **design tokens** - CSS properties curated by Sage designers in the `@sage/design-tokens` package, which Carbon uses to set styling rules for your components.

See: `examples/SageTheme.md`

## Props

### Carbon Provider

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  |
| theme | Partial<ThemeObject> \| undefined | No |  | Theme which specifies styles to apply to all child components. Set to `sageTheme` by default. | sageTheme |
| validationRedesignOptIn | boolean \| undefined | No |  | Feature flag for opting in to the latest validation designs for components that support it. NOTE - Will eventually be set to `true` by default in the future. | false |
