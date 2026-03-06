---
name: carbon-component-heading
description: Carbon Heading component props and usage examples.
---

# Heading

## Import
`import Heading from "carbon-react/lib/components/heading";`

## Source
- Export: `./components/heading`
- Props interface: `HeadingProps`
- Deprecated: Yes
- Deprecation reason: `Heading` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| backLink | string \| ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLAnchorElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  | Defines the a href for the back link. |  |
| children | React.ReactNode | No |  | Child elements |  |
| divider | boolean \| undefined | No |  | Adds a divider below the heading and the content. | true |
| headingType | HeadingType \| undefined | No |  | Defines the HTML heading element of the title. | "h1" |
| help | string \| undefined | No |  | Defines the help text for the heading. |  |
| helpAriaLabel | string \| undefined | No |  | Aria label for rendered help component |  |
| helpLink | string \| undefined | No |  | Defines the help link for the heading. |  |
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
| pills | React.ReactNode | No |  | Pills that will be added after the title. |  |
| separator | boolean \| undefined | No |  | Adds a separator between the title and the subheader. | false |
| subheader | React.ReactNode | No |  | Defines the subheader for the heading. |  |
| subtitleId | string \| undefined | No |  | Defines the subtitle id for the heading. |  |
| title | React.ReactNode | No |  | Defines the title for the heading. |  |
| titleId | string \| undefined | No |  | Defines the title id for the heading. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <Heading title="This is a Title" />;
}
```


### With Heading Type

**Render**

```tsx
() => {
  return (
    <>
      <Heading headingType="h1" title="This is a h1 Title" />
      <Heading headingType="h2" title="This is a h2 Title" />
      <Heading headingType="h3" title="This is a h3 Title" />
      <Heading headingType="h4" title="This is a h4 Title" />
      <Heading headingType="h5" title="This is a h5 Title" />
    </>
  );
}
```


### Without Divider

**Render**

```tsx
() => {
  return <Heading title="This is a Title" divider={false} />;
}
```


### With Subheader

**Render**

```tsx
() => {
  return <Heading title="This is a Title" subheader="This is a subheader" />;
}
```


### With Pill

**Render**

```tsx
() => {
  return <Heading title="This is a Title" pills={<Pill>Pill</Pill>} />;
}
```


### With Multiple Pills

**Render**

```tsx
() => {
  return (
    <Heading
      title="This is a Title"
      pills={[
        <Pill mr={2} key="1">
          Pill 1
        </Pill>,
        <Pill mr={2} key="2" size="L">
          Pill 2
        </Pill>,
        <Pill mr={2} key="3" size="XL">
          Pill 3
        </Pill>,
      ]}
    />
  );
}
```


### With Pill and Subheader

**Render**

```tsx
() => {
  return (
    <Heading
      title="This is a Title"
      pills={<Pill>Pill</Pill>}
      subheader="This is a subheader"
    />
  );
}
```


### With Subheader Seperator

**Render**

```tsx
() => {
  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      separator
    />
  );
}
```


### With Pill, Subheader and Seperator

**Render**

```tsx
() => {
  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      pills={<Pill>Pill</Pill>}
      separator
    />
  );
}
```


### With Subheader Children

**Render**

```tsx
() => {
  return (
    <Heading title="This is a Title" subheader="This is a subheader">
      This is content beneath a heading
    </Heading>
  );
}
```


### With Children Component

**Render**

```tsx
() => {
  return (
    <Heading title="This is a Title" subheader="This is a subheader">
      <Tile width="95%">
        <Dl>
          <Dt>Drink</Dt>
          <Dd>Coffee</Dd>
          <Dt>Brew Method</Dt>
          <Dd>Stove Top Moka Pot</Dd>
          <Dt>Brand of Coffee</Dt>
          <Dd>Magic Coffee Beans</Dd>
          <Dt mb={0}>Main and Registered Address</Dt>
          <Dd mb="4px">Magic Coffee Beans,</Dd>
          <Dd mb="4px">In The Middle of Our Street,</Dd>
          <Dd mb="4px">Madness,</Dd>
          <Dd mb="4px">CO4 3VE</Dd>
          <Dd>
            <Button
              buttonType="tertiary"
              iconType="link"
              iconPosition="after"
              href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
            >
              View in Google Maps
            </Button>
          </Dd>
        </Dl>
      </Tile>
    </Heading>
  );
}
```


### With Help

**Render**

```tsx
() => {
  return (
    <Box m={16}>
      <Heading
        title="This is a Title"
        subheader="This is a subheader"
        help="This should be helpful"
      />
    </Box>
  );
}
```


### With Help Pill

**Render**

```tsx
() => {
  return (
    <Box m={16}>
      <Heading
        title="This is a Title"
        subheader="This is a subheader"
        help="This should be helpful"
        pills={<Pill>Pill</Pill>}
      />
    </Box>
  );
}
```


### With Help Link

**Render**

```tsx
() => {
  return (
    <Box m={16}>
      <Heading
        title="This is a Title"
        subheader="This is a subheader"
        help="This should be helpful"
        helpLink="https://carbon.sage.com"
      />
    </Box>
  );
}
```


### With Back Link

**Render**

```tsx
() => {
  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      backLink="https://carbon.sage.com"
    />
  );
}
```

