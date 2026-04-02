---
name: carbon-component-profile
description: Carbon Profile component props and usage examples.
---

# Profile

## Import
`import Profile from "carbon-react/lib/components/profile";`

## Source
- Export: `./components/profile`
- Props interface: `ProfileProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alt | string \| undefined | No |  | The `alt` HTML string. |  |
| backgroundColor | string \| undefined | No |  | The hex code of the background colour to be passed to the avatar |  |
| className | string \| undefined | No |  |  |  |
| darkBackground | boolean \| undefined | No |  | Use a dark background. |  |
| email | string \| undefined | No |  | Define the email to use. |  |
| foregroundColor | string \| undefined | No |  | The hex code of the foreground colour to be passed to the avatar. Must be used in conjunction with `backgroundColor` |  |
| initials | string \| undefined | No |  | Define initials to display image. |  |
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
| name | string \| undefined | No |  | Define the name to display. |  |
| size | "S" \| "M" \| "L" \| "XL" \| "XS" \| "ML" \| "XXL" \| undefined | No |  | Allow to setup size for the component |  |
| src | string \| undefined | No |  | Custom source URL |  |
| text | string \| undefined | No |  | Define read-only text to display. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Dark Background

**Render**

```tsx
() => {
  return (
    <Box
      p={2}
      backgroundColor="black"
      width="190px"
      height="50px"
      borderRadius="borderRadius200"
    >
      <Profile
        darkBackground
        email="email@email.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
      />
    </Box>
  );
}
```


### Default

**Render**

```tsx
() => {
  return (
    <Profile
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
  );
}
```


### Responsive

**Render**

```tsx
() => {
  const largeScreen = useMediaQuery("(min-width: 1260px)");
  const mediumScreen = useMediaQuery("(min-width: 960px)");
  const smallScreen = useMediaQuery("(max-width: 600px)");
  const setCorrectScreenSize = () => {
    if (largeScreen) {
      return "XL";
    }
    if (mediumScreen) {
      return "ML";
    }
    if (smallScreen) {
      return "S";
    }
    return "M";
  };
  return (
    <Box>
      <Profile
        email="email@email.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
        size={setCorrectScreenSize()}
      />
    </Box>
  );
}
```


### Sizes

**Render**

```tsx
() => {
  return (
    <>
      {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
        <Profile
          email="email@email.com"
          initials="JD"
          name="John Doe"
          text="+33 657 22 34 71"
          size={size}
          key={size}
        />
      ))}
    </>
  );
}
```


### Src

**Render**

```tsx
() => {
  return (
    <Profile
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
      src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
    />
  );
}
```


### With Custom Portrait Background Color

**Render**

```tsx
() => {
  return (
    <Box display="flex" gap={2} flexDirection="column">
      <Profile
        email="john@thefamilydoe.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
        backgroundColor="#FF0000"
      />
      <Profile
        email="jane@thefamilydoe.com"
        initials="JD"
        name="Jane Doe"
        text="+33 657 22 34 72"
        backgroundColor="#0000FF"
      />
    </Box>
  );
}
```


### With Custom Portrait Foreground Color

**Render**

```tsx
() => {
  return (
    <Box display="flex" gap={2} flexDirection="column">
      <Profile
        email="john@thefamilydoe.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
        backgroundColor="#AA00FF"
        foregroundColor="#FFFF99"
      />
      <Profile
        email="jane@thefamilydoe.com"
        initials="JD"
        name="Jane Doe"
        text="+33 657 22 34 72"
        backgroundColor="#0000FF"
        foregroundColor="#FFBB00"
      />
    </Box>
  );
}
```


### With Margin

**Render**

```tsx
() => (
  <Box display="flex" alignItems="baseline">
    <Profile
      m={2}
      size="XS"
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
    <Profile
      m={3}
      size="S"
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
    <Profile
      m="50px"
      size="XL"
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
  </Box>
)
```

