---
name: carbon-component-settings-row
description: Carbon SettingsRow component props and usage examples.
---

# SettingsRow

## Import
`import SettingsRow from "carbon-sage/lib/components/settings-row";`

## Source
- Export: `./components/settings-row`
- Props interface: `SettingsRowProps`
- Deprecated: Yes
- Deprecation reason: `SettingsRow` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Content to be rendered inside the component. |  |
| className | string \| undefined | No |  |  |  |
| description | React.ReactNode | No |  | A string or JSX object that provides a short description about the group of settings. |  |
| divider | boolean \| undefined | No |  | Shows a divider below the component. | true |
| headingType | HeadingType \| undefined | No |  | Defines the HTML heading element of the `title` within the component. | "h3" |
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
| title | string \| undefined | No |  | A title for this group of settings. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <SettingsRow description="Description" title="Title">
      Content for settings
    </SettingsRow>
  );
}
```


### Heading Type

**Render**

```tsx
() => {
  return (
    <>
      <SettingsRow
        headingType="h1"
        description="Description"
        title="This is a h1 Title"
      >
        Content for settings
      </SettingsRow>
      <SettingsRow
        headingType="h2"
        description="Description"
        title="This is a h2 Title"
      >
        Content for settings
      </SettingsRow>
      <SettingsRow
        headingType="h3"
        description="Description"
        title="This is a h3 Title"
      >
        Content for settings
      </SettingsRow>
      <SettingsRow
        headingType="h4"
        description="Description"
        title="This is a h4 Title"
      >
        Content for settings
      </SettingsRow>
      <SettingsRow
        headingType="h5"
        description="Description"
        title="This is a h5 Title"
      >
        Content for settings
      </SettingsRow>
    </>
  );
}
```

