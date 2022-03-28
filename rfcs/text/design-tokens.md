- Start Date: 2021-06-14

- [Summary](#summary)
- [Basic example](#basic-example)
  - [Design Tokens Library](#design-tokens-library)
  - [Updating Design Tokens Library](#updating-design-tokens-library)
  - [Using proper design tokens](#using-proper-design-tokens)
- [Motivation](#motivation)
- [Detailed design](#detailed-design)
  - [Global Styles](#global-styles)
  - [Scoped Styles](#scoped-styles)
  - [Compatibility](#compatibility)
  - [`color`, `bg` and other styled-system props](#color-bg-and-other-styled-system-props)
    - [Providing new properties in old themes](#providing-new-properties-in-old-themes)
    - [Providing old properties to new themes](#providing-old-properties-to-new-themes)
    - [Generating css variable definitions from theme definitions](#generating-css-variable-definitions-from-theme-definitions)
  - [Theme tokens](#theme-tokens)
    - [Old themes](#old-themes)
    - [New themes](#new-themes)
    - [Another themes](#another-themes)
  - [How themes overwriting would work](#how-themes-overwriting-would-work)
- [Drawbacks](#drawbacks)
- [Adoption strategy](#adoption-strategy)
- [How we teach this](#how-we-teach-this)

---

**_NOTE:_** Token and function names used in this document are not the final ones, so they may vary in actual implementation.

---

---

**_NOTE:_** Implementing Design Tokens on Carbon will be breaking change.

---

# Summary

Design System is a complete and well documented set of design standards, decisions and specifications along with the toolkit (ui patterns, code snippets, component libraries, all for various platforms) that allows for achieving those standards. Following those rules helps to create consistent visual experience for the final users.

Design System's role is to create unified language for developers and designers. It, helps with communication, reduces spaces for misunderstandings and simplifies things and processes.

To achieve this on the lowest level, Design System introduces Design Tokens, which are system's basic, atomic part.

Basically those are key-value pairs named and organized the same way regardless of the platform (e.g. web, Android, iOS) and other tools (e.g. Figma). They can define various properties, such as colors, paddings, margins, sizes, font sizes, font families, transitions, animations, and others.

Design tokens purpose is to:

- **Release developers from taking design decisions**

  Currently, often while developing a component, developer needs to take decision what tint of what color should they use. This decision should be taken by designer, and not developer.

- **Improve handover process and communication between designers and developers.**

  Both, developers and designers are going to use the same token name for given property (color, background color, border, padding, margin, transition and so on). In the end, developers don't need to know what the final value will be.

- **Narrow value set to only needed values.**

  Design System uses narrow set of values (spacings, colors, typography properties and others). Those are only values that are needed for visual description of the component.

- **Keep visual consistency across all components of all component libraries.**

There are some restrictions from various sides. Some of them are on designers site (processes, design software or plugin's possibilities), and some of them are on developers site (used libraries, frameworks or processes). Therefore, while introducing Design Tokens, few compromises should be made. This requires openness of developers and designers to changes and suggestions to achieve best results. After all, this is a major change.

# Basic example

To put it in the simplest words: in practice, the introduction of design tokens in Carbon comes down to withdrawal of using `styled-components`'s `props.theme` object in favour of using css variables

```js
const OldButton = styled.button`
  font-size: 14px;
  padding: ${(props) => props.theme.space[1]}px ${(props) =>
      props.theme.space[2]}px;
  border: none;
  cursor: pointer;

  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
`;
```

Design tokens are going to be applied with css variables, like this:

```js
const NewButton = styled.button`
  font-size: 14px;
  padding: var(--sizing100) var(--sizing200);
  border: none;
  cursor: pointer;

  color: var(--colorsActionMajorYang100);
  background-color: var(--colorsActionMajor500);
`;
```

Such approach will require additional compatibility solutions. You can read more of that in [Detailed design](#detailed-design) section.

## Design Tokens Library

Design Tokens Library will be available in `@sage/design-tokens` NPM package.
It is built automatically based on what designers will decide in their Figma Design System Libraries.
NPM package will contain variable sheets for different platforms and formats. Among others, it will contain several formats of javascript variables (object and consts in CommonJS and ES6 formats along with Typescript definitions).

Since carbon is not the only consumer of the tokens, we decided to publish it in a separate repository and as a separate package. This allows for developers on other platforms to have the same tokens that are available anywhere else.

Design Tokens Library updates shall always be backwards compatible, which means that no tokens should be removed or renamed.

## Updating Design Tokens Library

At the first stage, during the time of migration, updating Design Tokens Library in Carbon should be responsibility of Design System Frontend Team. This way, the team can control changes that are upcoming and react to them as needed.

## Using proper design tokens

All tokens, required for given component will be listed and pointed out in upcoming Design System documentation.

# Motivation

Design tokens are important part of the Design System. They will be introduced not only in carbon, but also on other platforms. It is important to use the same scales and palettes everywhere.
It is also important to build components the same way as they are built by designers in Figma. Design Tokens will allow to achieve this as much as possible.

Components across all platforms ideally should be built the same way. They should use the same Design Tokens. It helps to keep user experience consistent across all platforms.

# Detailed design

Design Tokens Library supports tree shaking. It's dist folder size is about 600KB, but Carbon will consume only its ~20KB part.

## Global Styles

Migrating Carbon to Design Tokens implies migrating from `styled-components`'s `ThemeProvider` to css variables. They are considered more flexible, and performant way of applying tokens.
Such approach will require using `styled-component`'s [createGlobalStyle](https://styled-components.com/docs/api#createglobalstyle).
Later on, after migration will be completed, Carbon consumers will have possibility to choose between GlobalStyle, or plain CSS variable sheets.

## Scoped Styles

For places, where css variables needs to be scoped to certain version (as for example in MFE), wrapper will be introduced. It will set up css variable values for all children inside wrapper.

## Compatibility

Using two different theming systems will require some compatibility solutions.

1. Old themes will need to be extended with new properties.
2. New themes will need to be extended with old properties.

To achieve this, utility functions will be provided.

New properties will follow design tokens naming convention.

## `color`, `bg` and other styled-system props

For some components, there is still need of setting some of their inner colors with props. Those can not be deleted. Also, styling those inner elements with css path is not good practice, since HTML markup may change, and definitions may not be up to date.

However, such properties should accept token name in the first place. If token does not exist, then they should work as they do it now with preserved logic.

Eventually all dynamically generated colors, spacings and values defined by tokens should be replaced with tokens.

### Providing new properties in old themes

This util maps old theme properties to new theme properties or assigns hardcoded values if equivalent does not exist in an old theme.

I see no other way than hardcode those keys and assign them values. Hopefully this job will be done only once in the beginning.

### Providing old properties to new themes

This util maps values of the old theme properties to pink/0px/none, depending on the value type. It does this mapping, to make not yet migrated properties more visible.

### Generating css variable definitions from theme definitions

String generated with this util is meant to be used with `createGlobalStyle`.

## Theme tokens

Tokens in Design Tokens Library are organized into sets which can represent themes.
Most important set is the one called **sage**, since this is the base set for all other possible themes.

If there will be need of creating a theme, another set of tokens will be created. It will contain only tokens which values will need to be overwritten. Then such set will be applied on top of base set.

### Old themes

Existing `mint` and `aegean` (later referred as _old themes_) should be extended with properties with names matching design tokens convention. This will be done using [newProperties](#newproperties) utility.

Old themes should be still obligatory themes, until migration will be finished.

Example of `mint` theme in Carbon in `mint-theme.config.js`:

```js
import newProperties from "../utils/new-properties.util";

const mintTheme = {
  name: "mint",
  // [...]
};

export default {
  ...mintTheme,
  ...newProperties(mintTheme), // extend original mint theme with new theme properties.
};
```

### New themes

New theme - `sage` will be created. It should be extended with mapped properties of old theme using [oldProperties util](#oldproperties).
New themes should be marked as experimental until they will be at satisfactory level.

`sage` theme in Carbon in `sage-theme.config.js`:

```js
import sage from "@sage/design-tokens/js/cjs/sage";
import mint from "../themes/mint";
import oldProperties from "../utils/old-properties.util";

export default {
  ...oldProperties(mint),
  ...sage,
  name: "sage",
};
```

### Another themes

Extending Carbon with other themes will be as easy, as creating css variable sheet and overwriting values of specific design tokens. Later on, such theme may be applied globally, or to a specific scope.

Themes should be created by designers with minimal participation of developers. However, if there is a justified need, variable sheets can be also created by developers.

## How themes overwriting would work

So the button will consume them this way:

```js
const Button = styled.button`
  background: var(--colorsBase);
  color: var(--colorsText);
  padding: var(--spacing100) var(--spacing200);
`;
```

The base theme is:

```css
:root {
  --colorsBase: #333;
  --colorsText: #999;
  --spacing100: 8px;
  --spacing200: 12px;
}
```

Then, another theme, lets say mobile theme for mobile devices would consist of:

```css
.small {
  --spacing100: 16px;
  --spacing200: 20px;
}
```

# Drawbacks

Main drawback of proposed idea would be using two totally different systems of theming for some time.

However, it doesn't seem to be a blocker for Carbon developers, since migrating to CSS variables is responsibility of Design System Frontend Team which will be trained how to do it.

# Adoption strategy

Adoption of the idea consists of two stages:

1. Implementing Design Tokens in Carbon. It consists of [extending existing themes](#old-themes) and creating [new theme](#new-themes)).
2. Migration of component's properties to use design tokens.

Implementing Design Tokens support as well as migrating component properties to Design Tokens is a responsibility of Design System Frontend Team.

Main rules for migrating elements:

1. During migration, new `sage` theme shall be marked as an experimental one, since it may contain unwanted changes.
2. Usage of proper tokens should be consulted or approved by Designer.
3. Migration should be done at one component at the time.
4. Migration commits ideally should remain possibly small and should contain only migration work.
5. Pull Request should be created along with the [Contribution rules](https://github.com/Sage/carbon/blob/master/CONTRIBUTING.md).

# How we teach this

Design Tokens as a part of Design System as well as Design Tokens Library will have their own documentation. There is no need to create additional documentation within Carbon, but it is a good idea to provide links to the aforementioned documentation.
