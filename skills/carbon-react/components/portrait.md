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
| tooltipSize | "large" \| "medium" \| undefined | No |  | [Legacy] Defines the size of the tooltip content |  |
| tooltipType | string \| undefined | No |  | [Legacy] Defines the message type |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Custom Color

**Render**

```tsx
() => {
  const fgColors = [
    { value: "#000000", label: "black" },
    { value: "#FFFFFF", label: "white" },
    { value: "#007e45", label: "sagegreen" },
  ];
  const bgColors = [
    { value: "#A3CAF0", label: "paleblue" },
    { value: "#FD9BA3", label: "palepink" },
    { value: "#B4AEEA", label: "palepurple" },
    { value: "#ECE6AF", label: "palegoldenrod" },
    { value: "#EBAEDE", label: "paleorchid" },
    { value: "#EBC7AE", label: "paledesert" },
    { value: "#AEECEB", label: "paleturquoise" },
    { value: "#AEECD6", label: "palemint" },
    { value: "#000000", label: "black" },
    { value: "#FFFFFF", label: "white" },
    { value: "#2F4F4F", label: "darkslategray" },
    { value: "#696969", label: "dimgray" },
    { value: "#808080", label: "gray" },
    { value: "#A9A9A9", label: "darkgray" },
    { value: "#C0C0C0", label: "silver" },
    { value: "#D3D3D3", label: "lightgray" },
    { value: "#DCDCDC", label: "gainsboro" },
    { value: "#F5F5F5", label: "whitesmoke" },
    { value: "#FFFFE0", label: "lightyellow" },
    { value: "#FFFACD", label: "lemonchiffon" },
    { value: "#FAFAD2", label: "lightgoldenrodyellow" },
    { value: "#FFE4B5", label: "moccasin" },
    { value: "#FFDAB9", label: "peachpuff" },
    { value: "#FFDEAD", label: "navajowhite" },
    { value: "#F5DEB3", label: "wheat" },
    { value: "#FFF8DC", label: "cornsilk" },
    { value: "#FFFFF0", label: "ivory" },
    { value: "#0000FF", label: "blue" },
    { value: "#0000CD", label: "mediumblue" },
    { value: "#00008B", label: "darkblue" },
    { value: "#000080", label: "navy" },
    { value: "#191970", label: "midnightblue" },
    { value: "#4169E1", label: "royalblue" },
    { value: "#4682B4", label: "steelblue" },
    { value: "#5F9EA0", label: "cadetblue" },
    { value: "#6495ED", label: "cornflowerblue" },
    { value: "#87CEFA", label: "lightskyblue" },
    { value: "#87CEEB", label: "skyblue" },
    { value: "#00BFFF", label: "deepskyblue" },
    { value: "#1E90FF", label: "dodgerblue" },
    { value: "#ADD8E6", label: "lightblue" },
    { value: "#B0C4DE", label: "lightsteelblue" },
    { value: "#708090", label: "slateblue" },
    { value: "#6A5ACD", label: "slateblue2" },
    { value: "#7B68EE", label: "mediumslateblue" },
    { value: "#8A2BE2", label: "blueviolet" },
    { value: "#9370DB", label: "mediumpurple" },
  ];
  const [colour, setColour] = useState(fgColors[0].value);
  const [bgColour, setBgColour] = useState(bgColors[0].value);
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
          {fgColors.map(({ label, value }) => (
            <Option text={label} value={value} />
          ))}
        </Select>
        <Select
          name="background-color"
          id="background-color"
          label="Background Color"
          labelInline
          onChange={(e) => setBgColour(e.target.value)}
          value={bgColour}
        >
          {bgColors.map(({ label, value }) => (
            <Option text={label} value={value} />
          ))}
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


### Default

**Render**

```tsx
() => {
  return <Portrait />;
}
```


### Icon Type

**Render**

```tsx
() => {
  return <Portrait iconType="image" />;
}
```


### Initials

**Render**

```tsx
() => {
  return <Portrait initials="MK" />;
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


### Src

**Render**

```tsx
() => {
  return (
    <Portrait src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
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

