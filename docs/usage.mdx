import { Meta } from "@storybook/blocks";

<Meta title="Getting Started/Usage" />

# Usage

## Contents

- [Quick start](#quick-start)
- [Importing components](#importing-components)
- [Globals](#globals)
  - [Global styles](#global-styles)
  - [Theming](#theming)
  - [Localisation](#localisation)
  - [Validation](#validation)
  - [PropTypes Support Removed](#proptypes-support-removed)
  
## Quick start

A basic project `index.(jsx|tsx)` file would resemble this example:

```jsx
import React from "react";
import { createRoot } from 'react-dom/client';

import TokensWrapper from "carbon-react/lib/components/tokens-wrapper";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import GlobalStyle from "carbon-react/lib/style/global-style";
import sageTheme from "carbon-react/lib/style/themes/sage";
import Typography from "carbon-react/lib/components/typography";
import "carbon-react/lib/style/fonts.css";

const App = (props) => {
  return (
    <TokensWrapper>
      <CarbonProvider theme={sageTheme}>
        <GlobalStyle />
        <Typography>Hello Carbon</Typography>
      </CarbonProvider>
    </TokensWrapper>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
```

You can also find this in this live sandbox:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/Parsium/carbon-starter)


## Importing components

All components should be imported from their respective component index paths. For example:

```jsx
import { StepFlow, StepFlowTitle, StepFlowHandle, Steps } from "carbon-react/lib/components/step-flow";
import Textbox from "carbon-react/lib/components/textbox";
```
**Important:** Only import components from their index paths as shown above. Any files such as component, context or style files are implementation details and should not be imported directly. 
These files may change or be removed at any time without notice, so importing from them directly could break your application unexpectedly.
Always refer to the documented import paths for each component.

## Globals

### Global styles

We recommend using our global stylesheet, which can be used by including the global `GlobalStyle` component within your app like so:

```ts
import React from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from 'carbon-react/lib/style/global-style';

const root = createRoot(document.getElementById('app')!);
root.render(
  <CarbonProvider>
    <GlobalStyle/>
    ...
  </CarbonProvider>
, ...);
```

### Theming

Carbon supports two theming systems - the latest which uses Design Tokens in form of CSS custom properties maintained by designers, and legacy themes which use old theme properties from the ThemeProvider from the [styled-components library](https://styled-components.com/docs/advanced#theming). Currently both systems are being supported to aid projects using older versions of Carbon with upgrading.

The themes available in Carbon include:

- **sage** - the latest theme which uses Design Tokens in form of CSS custom properties. _Note this theme requires installation of `@sage/design-tokens` library, otherwise styles fallback to the old 'none' theme for compatibility._
- **none** - legacy themes that use old theme properties consumed by [ThemeProvider from the styled-components library](https://styled-components.com/docs/advanced#theming).

To supply the theme styles to your components, you can pass them via the [Carbon Provider](../?path=/docs/carbon-provider--docs).

### Localisation

We also provide a `i18nProvider` global for handling different locales. For more information on how to use this in your app, [see our i18n docs](../?path=/docs/documentation-i18n--docs).

### Validation

Carbon provides built-in validation states for input components. For more information check our [Validations](../?path=/docs/documentation-validations--docs) documentation page.

To opt into the new validation pattern, set the `validationRedesignOptIn` flag to true in the [CarbonProvider](../?path=/docs/carbon-provider--docs).

### PropTypes Support Removed

As of the React 18 upgrade, Carbon components no longer support `prop-types`. This change encourages the use of TypeScript for type safety and better development experience.

#### Migrating to TypeScript

If you're using JavaScript, we strongly recommend migrating your project to TypeScript. It provides robust type checking, improved IDE support, and catches errors at development time rather than runtime.

For migration guidance, see the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html).

#### Type Checking in JavaScript Projects

If you need type checking in a JavaScript project without fully migrating to TypeScript, you can enable the TypeScript compiler's `checkJs` option:

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

This will enable type checking for JavaScript files using JSDoc comments and your project's TypeScript configuration. Note that this provides a lighter-weight alternative to full TypeScript adoption but doesn't offer the same level of type safety.

For more details on the `checkJs` option, see the [TypeScript TSConfig reference](https://www.typescriptlang.org/tsconfig/#checkJs).