- Start Date: 2021-06-14


- [Summary](#summary)
- [Basic example](#basic-example)
- [Motivation](#motivation)
- [Detailed design](#detailed-design)
    - [Generic tokens (considering removal)](#generic-tokens-considering-removal)
    - [Theme tokens](#theme-tokens)
    - [Keeping themes up to date](#keeping-themes-up-to-date)
    - [Releasing new themes](#releasing-new-themes)
    - [Another themes](#another-themes)
    - [Switching themes](#switching-themes)
- [Drawbacks](#drawbacks)
- [Alternatives and coexisting solutions](#alternatives-and-coexisting-solutions)
    - [Design tokens via styled-components and CSS variables](#design-tokens-via-styled-components-and-css-variables)
    - [Tag function for generating token](#tag-function-for-generating-token)
- [Adoption strategy](#adoption-strategy)
- [How we teach this](#how-we-teach-this)

# Summary
Design System is a complete and well documented set of design standards, decisions and specifications along with the toolkit (ui patterns, code snippets, component libraries, all for various platforms) that allows for achieving those standards. Following those rules helps to create consistent visual experience for the final users.

Design System's role is to create unified language for developers and designers. It, helps with communication, reduces spaces for misunderstandings and simplifies things and processes.

To achieve this on the lowest level, Design System introduces Design Tokens, which are system's basic, atomic part.

Basically those are key-value pairs named and organized the same way regardless of the platform (e.g. web, Android, iOS) and other tools (e.g. Figma). They can define various properties, such as colors, paddings, margins, sizes, font sizes, font families, transitions, animations, and others.

Design tokens purpose is to:
- **Release developers from taking design decisions**
  Currently, often while developing a component, developer needs to take decision what tint of what color should he use. This decision should be taken by designer, and not developer.
- **Improve handover process and communication between designers and developers.**
  Both, developers and designers are going to use the same token name for given property (color, background color, border, padding, margin, transition and so on). In the end, developers don't need to know what the final value will be.
- **Narrow value set to only needed values.**
  Design System uses narrow set of values (spacings, colors, typography properties and others). Those are only values that are needed for visual description of the component.
- **Keep visual consistency across all components of the library.**

There are some restrictions from various sides. Some of them are on designers site (processes, design software or plugin's possibilities), and some of them are on developers site (used libraries, frameworks or processes). Therefore, while introducing Design Tokens, few compromises should be made. This requires openness of developers and designers to changes and suggestions to achieve best results. After all, this is a major change.

# Basic example

## Deign Tokens Library
Design Tokens Library will be available in `@sage/design-tokens` npm package.
It is build automatically based on what designers are setting up in Figma Design System libraries.
It will contain variable sheets for different platforms and formats. Among others, it will contain several formats of javascript variables. (object and consts in CommonJS and ES6 formats along with Typescript definitions).

Since carbon is not only one who will be consuming tokens, we decided to publish it in a separate repository and as a separate package. This allows for developers on other platforms to have the same tokens that are available anywhere else.

Design Tokens Library updates should always be backwards compatible, which means that no tokens should be removed or renamed. Updating it in carbon could be automated, but in my opinion, updating Design Tokens package in carbon should be responsibility of Design System Frontend Team. This way, the team can control changes that are upcoming and react to them as needed.

However, the best solution would be to not having to care about Design Tokens Library updates inside Carbon. That would be possible by using CSS approach and providing variables from external stylesheet.

## Applying tokens

There are at least two approaches on applying Design Tokens on components in Carbon:
- via js variables and `styled-components` which is explained below,
- via css variables which are explained in [Alternatives and coexisting solutions](#alternatives-and-coexisting-solutions) section.

### Creating theme

After installing Design Tokens package js variables should be used to extend an existing theme with a properties that are following Design Tokens naming convention. Therefore, Design Tokens will be provided in `styled-components` themes. Those themes then would be applied to components via `ThemeProvider`.

```js
import designTokens from "@sage/design-tokens/js/sbiz/es6-obj";
import { mergeWithBase } from "../base";
import configureTheme from "./mint-theme.config";

export default {
  ...mergeWithBase(configureTheme), // for backwards compability. Eventually should be removed.
  ...designTokens,
  name: "mint",
};
```

### Using tokens in components

After themes will be created, components should use tokens that are provided by them in the way they would use current properties.

In most basic way skipping alternative and coexisting solutions, it would look like this:

```js
const Container = styled.div`
  background: ${props.theme.sagedsColorsBase400};
  color: ${props.theme.sagedsColorsTextWhite};
`;
```

# Motivation

Design tokens are important part of the Design System. They will be introduced not only in carbon, but also on other platforms. It is important to use the same scales and palettes everywhere.
It is also important to build components the same way as they are built by designers in Figma.

Components across all platforms ideally should be built the same way.They should use the same Design Tokens. It helps to keep all components up to date, by releasing versions of Design Tokens Library

# Detailed design

This approach uses themes feature from `styled-components` since it is already implemented and uses javascript variables.

## Generic tokens (considering removal)

**Important Notes:**
1. Name "generic" is a temporary name, so it can change.
2. Components are going to use narrowed set of tokens, so the Design Tokens Library should contain every single token that is needed to achieve design consistency. Therefore, no other tokens would be needed. That's why we were considering removal of the generic tokens set.
   However, it is not final decision, so if there is strong and well justified need of having such set, then it is possible to keep it.

Generic tokens would contain wider range of predefined colors, and other tokens, for example:

```js
const tokens = {
  colorsSlate50:  "#f2f5f6",
  colorsSlate100: "#e6ebed",
  colorsSlate200: "#ccd6db",
  colorsSlate300: "#b3c2c8",
  colorsSlate500: "#8099a4",
  colorsSlate600: "#668592",
  colorsSlate700: "#4d7080",
  colorsSlate800: "#335c6d",
  colorsSlate900: "#19475b",
  
  // [...]

  spacing100: "2px",
  spacing200: "8px",
  spacing300: "8px",
  spacing400: "16px",
  spacing500: "32px",
  spacing600: "64px",
  spacing700: "72px",
  spacing800: "80px",
  spacing900: "88px",

  fontFamiliesBody: "Lato",
  fontFamiliesTitle: "Roboto"
          
  // [...]
};
```

Those tokens could be referred in other token sets, like **Theme tokens**. For example:

```js
const tokens = {
  colorsBase: '{generic.colors.mint.400}', // This is Style dictionary syntax. Eventyually it will be transformed to final hex or rgba value.
  spacing400: '{generic.spacing.400}',
  fontFamiliesDefault: '{generic.fontFamilies.body}'
}
```

These tokens should not be used directly in components. That's why they won't extend base theme, yet they will be accessible by importing generic variable sheet straight from the Design Tokens Library.

## Theme tokens

There are also theme tokens. Each theme tokens set will extend `baseTheme` under the hood in Design Tokens Library. See example below:

`base` theme from Design Tokens Library:
```js
const theme = {
  colorsBase: '#333',
  colorsText: '#999',
  spacing100: '8px',
  spacing200: '12px',
}
```

`sBiz` theme from Design Tokens Library:
```js
import baseTheme from '../base/baseTheme'

const theme = {
  ...baseTheme,
  colorsBase: '#00815d',
  colorsText: '#ffffff'
}
```

## Themes

### Old themes
Existing `mint` and `aegean` (later referred as *old themes*) should be extended with properties that are matching theme tokens convention naming. They should have the same as values as their existing equivalents. All this is to provide compatibility between old and new themes.
Old themes should be still obligatory themes, until implementation of new themes will be at satisfactory level.

Example of `mint` theme in Carbon in `mint-theme.config.js`:
```js
export default (palette) => {
  return {
    name: "mint",
    
    colorsBase: palette.productGreen, //Added properties for compatibility with new themes
    colorsText: palette.white,

    colors: {
      base: palette.productGreen,
      // [...]
    },
  
    // [...]
  };
};
```

### New themes
At the same time, new themes `sBiz` (small business), `mBiz` (medium business) and `sServ` (shared services) (later referred as *new themes*) should be created. They should be importing existing theme tokens, and should be extended with old themes for preserving backwards compatibility. Values of the 'old properties' should be overwritten with the new token values.
New themes should be marked as `WIP` or `alpha` until they will be at satisfactory level.

`sBiz` theme in Carbon in `sbiz-theme.config.js`:
```js
import sBizThemeTokens from "@sage/design-tokens/js/sbiz/es6-obj";
import { mergeWithBase } from "../base";
import configureTheme from "./mint-theme.config";

export default {
  ...mergeWithBase(configureTheme), // for backwards compability. Eventually should be removed.
  ...sBizThemeTokens,
  name: "sbiz",
};
```


## Keeping themes up to date
Design System Frontend Team will align carbon components using Design Tokens and will take care of themes update and compatibility.

## Releasing new themes
After achieving the point of satisfactory alignment and compatibility level, new themes should be announced as obligatory and new major version of carbon should be released.

## Another themes
Introducing new themes based on Design Tokens will allow us for creating new themes (such as `highContrast`, `darkMode`, `small` and themes for white-labeling) mainly by designers and minimum participation of developer.

Also open source contributors will be able to create their own themes using `baseTheme` as the template since it will contain all possible Design Tokens, and those will be well documented in Design System documentation.

## How themes overwriting would work
So the button will consume them this way:

```js
const Button = styled.button`
  background: ${props.theme.colorsBase};
  color: ${props.theme.colorsText};
  padding: ${props.theme.spacing100} ${props.theme.spacing200};
`;
```

The base theme is:
```js
const theme = {
  colorsBase: '#333',
  colorsText: '#999',
  spacing100: '8px',
  spacing200: '12px',
}
```

Then sBiz theme, would consist of values:
```js
const theme = {
  colorsBase: '#00815d',
  colorsText: '#ffffff'
}
```

Then, another theme, lets say mobile theme for mobile devices would consist of:
```js
const theme = {
  spacing100: '16px',
  spacing200: '20px'
}
```

## Switching themes

Themes then should be applied and switched with `ThemeProvier`.


# Drawbacks

## Multiple theming systems

Using CSS approach would introduce two methods of theming. It would require a solution (for example [tag function](#tag-function-for-generating-token)) for providing token depending on certain conditions:
- On selected theme

  If closest `ThemeProvider` would have `mint` or `aegean` theme selected, then values would be provided as javascript variables. Otherwise, CSS variables would be provided, and specific definitions would be included.
- On selected mode

  Then switch between js and css mode would be provided. Based on that, tag function would provide CSS or JS tokens. CSS mode would be available as an experimental feature. This would require creating compatible style sheets for old themes.

# Alternatives and coexisting solutions
Following solutions can extend the main idea of using js variables.

## Design tokens via styled-components and CSS variables

Design token library provides also tokens in scss and css variables formats, therefore it is possible to implement theming using those technologies. Using styled-components in combination with css variables would look like this:

```js
const Container = styled.div`
  background: var(--sageds-colors-base-400);
  color: var(--sageds-colors-text-white);
`;
```

Then, switching themes would be handled by including or excluding given stylesheets or adding or removing theme classes on parent elements.

Moving theme support to CSS variables would also allow moving themes outside carbon, so it won't be necessary to release a new version of the carbon every time a background color value will change.

## Tag function for generating token

Introducing tag function for providing tokens, would give more flexibility, for example, it would allow setting up preferable theming method to use CSS or JS. It would also allow for keeping more consistent token naming across all platforms

It would be also very helpful if we decide to go with CSS variables since it should help us handle theme changes across different versions of carbon.

Example:
```js
function token(token) {
  const cssThemingMode = getThemingMode();

  if (cssThemingMode){
    return `var(--sageds-${token[0].split('.').join('-')})`;
  }

  return designTokens[_.camelCase(`sageds.${token[0]}`)];
}
```

usage:

```js
const Container = styled.div`
  background: ${token`colors.base.400`};
  color: ${token`colors.text.white`};
`;
```

# Adoption strategy

1. Extend existing themes (as it is presented in [Old themes](#old-themes) section) and consider marking them as deprecated for future use.
2. Create new themes with extended for backwards compatibility (as it is presented in [New themes](#new-themes)).
4. Design System Frontend Team will replace old theme properties with Design Tokens while aligning components with new Design System.
5. Drop active support for old themes after converting most (75-80% ?) of Design System components.

**Important notes**
- While aligning component, only Design Tokens should be used. This implies, that Design Tokens library should be updated with the tokens that are needed for aligning given component. If there are any tokens missing, then it needs to be reported to Design System Team and situation needs to be explained.
- Whichever approach (JS or CSS) would be chosen, the adoption will consist in rewriting current styles of components.

# How we teach this

Design Tokens will have its own documentation, therefore it is not needed to create separate page for Design Tokens in Carbon Documentation.

However, documentation should mention the fact of using Design Tokens and how to use them. It should also provide the link to the Design Tokens documentation.

# Preferred solution

In my opinion, the best way would be to go with CSS variables as the main goal and support it with the tag function.
- CSS variables are light weight, most flexible, and most performant. It gives possibility of excluding themes from carbon and move this concern to Design Tokens library. Also, white-labeling of the products will be much easier, since applying new theme comes to creating new theme in Figma and automatic conversion to the final theme style sheet.
- Tag function gives flexibility when it comes to combining two methods of themes, not only in transition period, but it also allows to use the same notation as developers.
