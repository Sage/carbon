# Theming

Theming functionality is covered by an additional Storybook addon. Included in `devDependencies` of `package.json`
`"storybook-addon-styled-component-theme": "Sage/storybook-addon-styled-component-theme#storyspecific-themes",`

## Notice
Only supports Storybook 4 and newer

## Setup

### 1. Installation
`yarn add Sage/storybook-addon-styled-component-theme --dev`

### 2. Register
Add to `.storybook/addons.js`:

```js
import 'storybook-addon-styled-component-theme/dist/src/register';
```

### 3. Configure themes
#### a) Configure `themes` in `.storybook/config.js` for all stories:

```js
import {addDecorator} from '@storybook/react';
```

then either import your decorators or define them directly:

```js
import getThemeDecorator from './theme-decorators';
```

lastly, add decorators by calling:

```js
addDecorator(getThemeDecorator());
```

#### b) Configure `.storybook/themes-decorator.js`

```js
import { ThemeProvider } from 'styled-components';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
```

return ThemeProvider with your theme of choice for example:
```js
return (
  <ThemeProvider theme={ themesMap[themeName] }>
    {story()}
  </ThemeProvider>
);
```

#### c) Configure single story

Setup `makeStory` function or equalivant to cover setup of the Storybook story including (name, component, metadata[theme, info, notes, knobs])

```js
import { info, notes } from './documentation';

function makeStory(name, themeSelector) {
  const component = () => {
    const knobs = defaultKnobs();

    return (
      <RadioButtonGroup />
    );
  };

  const metadata = {
    themeSelector,
    info: {
      text: info,
      excludedPropTypes: ['children']
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}
```

```js
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';

storiesOf('Experimental/RadioButton', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
```

### 4. Configure story-specific metadata

The following fields (all optional) can be supplied in a `themeSelector` metadata object for a story:

* **`themes`**  –  An array of themes, overriding the `themes` passed to `addDecorator(withThemesProvider(themes))` (if any).
* **`singleThemeMessage`**  –  A `string`, containing a message to be displayed in the "Themes" Panel when there's only one theme available.
* **`showSingleThemeButton`**  –  A `boolean` (default `true`), specifying whether to display the single theme button when there's only one theme available.

## Reminder
Make sure every theme object has a `name` property.