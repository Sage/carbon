- Start Date: (fill me in with today's date, 2021-06-14)


- [Summary](#summary)
- [Basic example](#basic-example)
- [Motivation](#motivation)
- [Detailed design](#detailed-design)
- [Drawbacks](#drawbacks)
- [Alternatives](#alternatives)
    - [Design tokens via styled-components and CSS variables](#design-tokens-via-styled-components-and-css-variables)
    - [Tag function for generating token](#tag-function-for-generating-token)
- [Adoption strategy](#adoption-strategy)
- [How we teach this](#how-we-teach-this)

# Summary

Implementation of the design tokens with theme support and backwards compatibility.

# Basic example

Design tokens will be kept in `@sage/design-tokens` library. It will be updated every time tokens will change. They will
be imported from this library and used as the object.

```js
const Container = styled.div`
  background: ${props.theme.sagedsColorsBase400};
  color: ${props.theme.sagedsColorsTextWhite};
`;
```

Then, themes would be handled by ThemeProvider.

Themes would be created from existing ones by extending and renaming them, so that current *mint* would be named *sbiz*
.

```js
import designTokens from "@sage/design-tokens/js/sbiz/es6-obj";
import { mergeWithBase } from "../base";
import configureTheme from "./mint-theme.config";

export default {
  ...mergeWithBase(configureTheme), // for backwards compability. Eventually should be removed.
  ...designTokens,
  name: "sbiz",
};
```

# Motivation

Design tokens are basic atomic part of design system. Its purpose is to improve handover process between designers and
developers. This will result in more consistent ui and will help using colors more

Design tokens are basically key-value pairs named and organized the same way regardless of the platform. This way,
designers and developers can communicate using key names, and not specific values.

Design tokens can contain values like lengths in different units, colors, font properties, transition definitions and
others.

Naming of the tokens is consistent across all platforms and provides predictable structure.

To put it in simple words: When developer creates design for component, everything what you, as a developer, care about
is which token has been used.

# Detailed design

This approach uses themes feature from `styled-components` since it is already implemented and uses javascript
variables.

At the moment, we have two levels of design tokens:

- **Generic tokens** - kind of palette with all the values and scales.
- **Theme tokens** - tokens for a theme, which contain references to generic tokens.

So themes can be for example: *S Biz*, *M Biz*, *High Contrast*, *Dark Mode* and so on.

Themes can overwrite not only colors, but also sizes. This way it is possible to create size themes, such as *Small*
or *Medium* or *Large*

In the end it all depends on designers, how they will build components in Figma, and which tokens they will use.

# Drawbacks

In case of CSS approach adaptation, there would be two theming systems available for carbon for the time of
implementation.

# Alternatives

## Design tokens via styled-components and CSS variables

Design token library provides also tokens in scss and css variables formats, therefore it is possible to implement
theming using those technologies. Using styled-components in combination with css variables would look like this:

```js
const Container = styled.div`
  background: var(--sageds-colors-base-400);
  color: var(--sageds-colors-text-white);
`;
```

Then, switching themes would be handled by including or excluding given stylesheets.

## Tag function for generating token

Javascript tag function can be created. It could take string describing token, and depending on its implmentation, it
could transform it to the `var(--token)` string, or return value of the token

```js
function token(token) {
  return designTokens[_.camelCase(`sageds.${token[0]}`)];
}
```

OR

```js
function token(token) {
  return `var(--sageds-${token[0].split('.').join('-')})`;
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

Design tokens will be available globally in carbon. This means, that developers will be able to choose design tokens
over current theme variables. However, the main process of design system alignment (which includes design tokens
migration) will be handled by Design System Development Team and this will be the team, that will be most interested in
design tokens.

While aligning component, only design tokens should be used. This implies, that design tokens library should be updated
with the tokens that are needed for aligning given component. If there are any tokens missing, then it needs to be
reported to Design System Team and situation needs to be explained.

Whichever approach (JS or CSS) would be chosen, the adoption will consist in rewriting current styles of components
using newly provided tokens (JS approach), or just entering CSS variables (CSS approach).

In specific, justified cases, developer can use generic tokens. However, generic tokens shouldn't be referenced
directly.

# How we teach this

Design Tokens will have its own documentation, therefore it is not needed to create separate page for design tokens in
Carbon Documentation.

However, documentation should mention the fact of using design tokens and how to use them.

It should also provide the link to the design tokens documentation. 
