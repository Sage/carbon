---
name: carbon-component-settings-row
description: Carbon SettingsRow component props and usage examples.
---

# SettingsRow

## Import
`import SettingsRow from "carbon-react/lib/components/settings-row";`

## Source
- Export: `./components/settings-row`
- Props interface: `SettingsRowProps`
- Deprecated: Yes
- Deprecation reason: `SettingsRow` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Content to be rendered inside the component. |  |
| description | React.ReactNode | No |  | A string or JSX object that provides a short description about the group of settings. |  |
| divider | boolean \| undefined | No |  | Shows a divider below the component. | true |
| headingType | HeadingType \| undefined | No |  | Defines the HTML heading element of the `title` within the component. | "h3" |
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

