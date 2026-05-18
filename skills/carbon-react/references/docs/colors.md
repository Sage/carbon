import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Documentation/Colors" />

# Colors

Some components such as [Typography](../?path=/docs/typography--docs) have a `color`, `bg`/`backgroundColor` and `opacity` props, this functionality is provided by [styled-system/color](https://styled-system.com/api/#color).

You can use a CSS string, the name of a palette colour or design tokens.

## CSS String

```jsx
<Typography color='red'>...</Typography>
<Typography color='#ff0000'>...</Typography>
<Typography color='rgba(100, 0, 0, 1)'>...</Typography>
```

## Palette Colors

Using the name of a palette color ensures if we update the theme your components will also be updated, for this reason we advise not using a CSS string.

| Hex     | Palette Color  | Tint               | Shade               | Opacity      |
| ------- | -------------- | ------------------ | ------------------- | ------------ |
| #00DC00 | brilliantGreen | brilliantGreenTint | brilliantGreenShade | ❌           |
| #E96400 | carrotOrange   | carrotOrangeTint   | carrotOrangeShade   | ❌           |
| #C7384F | errorRed       | errorRedTint       | errorRedShade       | ❌           |
| #009900 | genericGreen   | genericGreenTint   | genericGreenShade   | ❌           |
| #FFB500 | gold           | goldTint           | goldShade           | ❌           |
| #00A376 | productGreen   | productGreenTint   | productShade        | ❌           |
| #0077C8 | productBlue    | productBlueTint    | productBlueShade    | ❌           |
| #004B87 | navyBlue       | navyBlueTint       | navyBlueShade       | ❌           |
| #582C83 | amethyst       | amethystTint       | amethystShade       | ❌           |
| #8246AF | plum           | plumTint           | plumShade           | ❌           |
| #003349 | slate          | slateTint          | slateShade          | ❌           |
| #000000 | ❌             | ❌                 | ❌                  | blackOpacity |
| #ffffff | ❌             | ❌                 | ❌                  | whiteOpacity |

Tint, Shade and Opacity properties must be followed by a number.

Where there is a collision between CSS strings and the palette color (e.g. gold) the palette color takes presedence.

```jsx
<Typography color='brilliantGreen'>...</Typography>
<Typography color='brilliantGreenTint20'>...</Typography>
<Typography color='brilliantGreenShade30'>...</Typography>
<Typography color='blackOpacity55'>...</Typography>
<Typography color='whiteOpacity22'>...</Typography>
```

## Design tokens

Using design tokens ensures visual consistency across the application and means that we will always have up-to-date values, if the colors are updated by designers using design tools.

The name of the chosen design token must be always preceded by `--`, for example, if we want to use `colorsYang100` token in our code, we have to pass `--colorsYang100` as a prop. See the [Design Tokens](https://zeroheight.com/2ccf2b601/p/217e24-design-tokens/b/46fb17) documentation for details.

```jsx
<Typography color='--colorsUtilityYang100'>...</Typography>
<Typography color='--colorsReadOnly600'>...</Typography>
<Typography color='--colorsUtilityYin090'>...</Typography>
```
