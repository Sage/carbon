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
- Deprecated: Yes
- Deprecation reason: This version of Portrait has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| alt | string \| undefined | No |  |  |  | The `alt` HTML string. |  |
| className | string \| undefined | No |  |  |  |  |  |
| iconType | IconType \| undefined | No |  |  |  | Icon to be rendered as a fallback. | "individual" |
| initials | string \| undefined | No |  |  |  | The initials to render in the Portrait. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  |  |  |
| onClick | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Prop for `onClick` events. |  |
| shape | PortraitShapes \| undefined | No |  |  |  | The shape of the Portrait. | "circle" |
| size | PortraitSizes \| undefined | No |  |  |  | The size of the Portrait. | "M" |
| src | string \| undefined | No |  |  |  | A custom image URL. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| backgroundColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | The hex code of the background colour |  |
| darkBackground | boolean \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | Use a dark background. | false |
| foregroundColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | The hex code of the foreground colour. This will only take effect if use in conjunction with `backgroundColor` | undefined |
| tooltipBgColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Override background color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipFontColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Override font color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipId | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] The id attribute to use for the tooltip |  |
| tooltipIsVisible | boolean \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Whether to to show the Tooltip |  |
| tooltipMessage | React.ReactNode | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] The message to be displayed within the tooltip |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Sets position of the tooltip |  |
| tooltipSize | "medium" \| "large" \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Defines the size of the tooltip content |  |
| tooltipType | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Defines the message type |  |

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


### With Margin

**Render**

```tsx
() => {
  return (
    <Box display="flex" alignItems="baseline">
      <Portrait m={3} />
      <Portrait m={2} />
      <Portrait shape="circle" m="25px" />
      <Portrait size="L" m="30px" />
    </Box>
  );
}
```


### Variants

**Render**

```tsx
() => {
  const availableVariants: { value: PortraitVariant; label: string }[] = [
    { value: "black", label: "Black (default)" },
    { value: "blue", label: "Blue" },
    { value: "teal", label: "Teal" },
    { value: "green", label: "Green" },
    { value: "lime", label: "Lime" },
    { value: "orange", label: "Orange" },
    { value: "red", label: "Red" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
    { value: "slate", label: "Slate" },
    { value: "grey", label: "Grey" },
  ];
  const [variant, setVariant] = useState<PortraitVariant>(
    availableVariants[0].value,
  );

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mb={1}>
        <Select
          name="foreground-color"
          id="foreground-color"
          label="Foreground Color"
          labelInline
          onChange={(e) => setVariant(e.target.value as PortraitVariant)}
          value={variant}
        >
          {availableVariants.map(({ label, value }) => (
            <Option text={label} value={value} />
          ))}
        </Select>
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait size="XS" variant={variant} />
        <Portrait initials="MK" size="XS" variant={variant} />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait variant={variant} />
        <Portrait initials="MK" variant={variant} />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait size="L" variant={variant} />
        <Portrait initials="MK" size="L" variant={variant} />
      </Box>
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

