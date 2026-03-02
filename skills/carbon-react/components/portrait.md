---
name: carbon-component-portrait
description: Carbon Portrait component props and usage examples.
---

# Portrait

## Import
`import Portrait from "carbon-react/lib/components/portrait";`

## Source
- Export: `./components/portrait`
- Props interface: `PortraitProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alt | string \| undefined | No |  | The `alt` HTML string. |  |
| backgroundColor | string \| undefined | No |  | The hex code of the background colour |  |
| className | string \| undefined | No |  |  |  |
| darkBackground | boolean \| undefined | No |  | Use a dark background. | false |
| foregroundColor | string \| undefined | No |  | The hex code of the foreground colour. This will only take effect if use in conjunction with `backgroundColor` | undefined |
| iconType | IconType \| undefined | No |  | Icon to be rendered as a fallback. | "individual" |
| initials | string \| undefined | No |  | The initials to render in the Portrait. |  |
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
| name | string \| undefined | No |  |  |  |
| onClick | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  | Prop for `onClick` events. |  |
| shape | PortraitShapes \| undefined | No |  | The shape of the Portrait. | "circle" |
| size | PortraitSizes \| undefined | No |  | The size of the Portrait. | "M" |
| src | string \| undefined | No |  | A custom image URL. |  |
| tooltipBgColor | string \| undefined | No |  | [Legacy] Override background color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipFontColor | string \| undefined | No |  | [Legacy] Override font color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipId | string \| undefined | No |  | [Legacy] The id attribute to use for the tooltip |  |
| tooltipIsVisible | boolean \| undefined | No |  | [Legacy] Whether to to show the Tooltip |  |
| tooltipMessage | React.ReactNode | No |  | [Legacy] The message to be displayed within the tooltip |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | [Legacy] Sets position of the tooltip |  |
| tooltipSize | "medium" \| "large" \| undefined | No |  | [Legacy] Defines the size of the tooltip content |  |
| tooltipType | string \| undefined | No |  | [Legacy] Defines the message type |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <Portrait />;
}
```


### Initials

**Render**

```tsx
() => {
  return <Portrait initials="MK" />;
}
```


### Src

**Render**

```tsx
() => {
  return (
    <Portrait src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
  );
}
```


### Icon Type

**Render**

```tsx
() => {
  return <Portrait iconType="image" />;
}
```


### With Tooltip

**Render**

```tsx
() => {
  return (
    <Box margin={8}>
      <Portrait
        tooltipMessage="Rebecca Smith"
        tooltipPosition="bottom"
        tooltipBgColor="rebeccapurple"
        src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
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
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait key={size} size={size} />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait key={size} size={size} initials="MK" />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait
            key={size}
            size={size}
            src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          />
        ))}
      </Box>
    </Box>
  );
}
```


### Shapes

**Render**

```tsx
() => {
  return (
    <>
      {(["circle", "square"] as const).map((shape) => (
        <Portrait key={shape} shape={shape} />
      ))}
    </>
  );
}
```


### Dark Background

**Render**

```tsx
() => {
  return (
    <>
      <Portrait darkBackground />
      <Portrait initials="MK" darkBackground />
    </>
  );
}
```


### With Margin

**Render**

```tsx
() => {
  return (
    <Box display="flex" alignItems="baseline">
      <Portrait m={3} />
      <Portrait darkBackground m={2} />
      <Portrait shape="circle" m="25px" />
      <Portrait size="L" m="30px" />
    </Box>
  );
}
```


### Custom Color

**Render**

```tsx
() => {
  const [colour, setColour] = useState("#000000");
  const [bgColour, setBgColour] = useState("#A3CAF0");

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mb={1}>
        <Select
          name="foreground-color"
          id="foreground-color"
          label="Foreground Color"
          labelInline
          onChange={(e) => setColour(e.target.value)}
          value={colour}
        >
          <Option text="black" value="#000000" />
          <Option text="white" value="#FFFFFF" />
          <Option text="sagegreen" value="#007e45" />
        </Select>
        <Select
          name="background-color"
          id="background-color"
          label="Background Color"
          labelInline
          onChange={(e) => setBgColour(e.target.value)}
          value={bgColour}
        >
          <Option text="paleblue" value="#A3CAF0" />
          <Option text="palepink" value="#FD9BA3" />
          <Option text="palepurple" value="#B4AEEA" />
          <Option text="palegoldenrod" value="#ECE6AF" />
          <Option text="paleorchid" value="#EBAEDE" />
          <Option text="paledesert" value="#EBC7AE" />
          <Option text="paleturquoise" value="#AEECEB" />
          <Option text="palemint" value="#AEECD6" />
          <Option text="black" value="#000000" />
          <Option text="white" value="#FFFFFF" />
          <Option text="darkslategray" value="#2F4F4F" />
          <Option text="dimgray" value="#696969" />
          <Option text="gray" value="#808080" />
          <Option text="darkgray" value="#A9A9A9" />
          <Option text="silver" value="#C0C0C0" />
          <Option text="lightgray" value="#D3D3D3" />
          <Option text="gainsboro" value="#DCDCDC" />
          <Option text="whitesmoke" value="#F5F5F5" />
          <Option text="lightyellow" value="#FFFFE0" />
          <Option text="lemonchiffon" value="#FFFACD" />
          <Option text="lightgoldenrodyellow" value="#FAFAD2" />
          <Option text="moccasin" value="#FFE4B5" />
          <Option text="peachpuff" value="#FFDAB9" />
          <Option text="navajowhite" value="#FFDEAD" />
          <Option text="wheat" value="#F5DEB3" />
          <Option text="cornsilk" value="#FFF8DC" />
          <Option text="ivory" value="#FFFFF0" />
          <Option text="blue" value="#0000FF" />
          <Option text="mediumblue" value="#0000CD" />
          <Option text="darkblue" value="#00008B" />
          <Option text="navy" value="#000080" />
          <Option text="midnightblue" value="#191970" />
          <Option text="royalblue" value="#4169E1" />
          <Option text="steelblue" value="#4682B4" />
          <Option text="cadetblue" value="#5F9EA0" />
          <Option text="cornflowerblue" value="#6495ED" />
          <Option text="lightskyblue" value="#87CEFA" />
          <Option text="skyblue" value="#87CEEB" />
          <Option text="deepskyblue" value="#00BFFF" />
          <Option text="dodgerblue" value="#1E90FF" />
          <Option text="lightblue" value="#ADD8E6" />
          <Option text="lightsteelblue" value="#B0C4DE" />
          <Option text="slateblue" value="#708090" />
          <Option text="slateblue2" value="#6A5ACD" />
          <Option text="mediumslateblue" value="#7B68EE" />
          <Option text="blueviolet" value="#8A2BE2" />
          <Option text="mediumpurple" value="#9370DB" />
        </Select>
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="XS"
        />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="XS"
        />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait backgroundColor={bgColour} foregroundColor={colour} />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
        />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="L"
        />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="L"
        />
      </Box>

      <Typography>
        The following examples demonstrate using the design token approach
      </Typography>
      <Box mt={2} display="flex" flexDirection="row" gap={2}>
        <Portrait
          backgroundColor="var(--colorsSemanticFocus500)"
          foregroundColor="#FFFFFF"
        />
        <Portrait
          backgroundColor="#FFFFFF"
          foregroundColor="var(--colorsSemanticNegative600)"
        />

        <Portrait
          backgroundColor="var(--colorsUtilityYin090)"
          foregroundColor="var(--colorsLogo)"
        />
      </Box>
    </>
  );
}
```

