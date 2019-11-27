# Getting Started

## Project Setup

### Using Carbon Factory

The quickest way to get started with Carbon is to use [create-carbon-app](https://github.com/sage/create-carbon-app), this enables you to setup a new project quickly.

Behind the scenes this uses [Carbon Factory](https://github.com/sage/carbon-factory), which provides pre-configured Webpack config and Jest config to get going with a new application in minutes.

## Application Setup

Install Carbon into your project: `npm install carbon-react`.

Carbon also has a number of peer dependencies, such as React and React DOM. After installing Carbon you should be able to see warnings for any peer dependencies you need to install. Alternatively see the [package.json](https://github.com/Sage/carbon/blob/master/package.json) for the latest required peer dependencies.

You should now be able to import and use any of the React components available in Carbon in your project, for example:

```js
import React from 'react';
import Button from 'carbon-react/lib/components/button';

const MyComponent = () => (
  <Button>Click Me!</Button>
);

export default MyComponent;
```

### Base CSS

Carbon provides some baseline CSS which is applied to `body` and other elements. It is recommended you import this at the root of your project:

```
import 'carbon-react/lib/utils/css';
```

### Brand new components

We have added few brand new components such as `Card`, `Select` and `Tile`.

### Experimental components

Some components in Carbon v9 currently sit in folder `src/__experimental__/`. These components are no longer wrapped by the InputDecorator. They will be moved into the core `src/components/` directory in a future release.

### Deprecated components

in Carbon v9 the following components have been deprecated and can now be found in `src/__deprecated__/components/`.
* Checkbox
* DateInput
* DateRange
* Decimal
* Dropdown
* DropdownFilter
* DropdownFilterAjax
* Fieldset
* Form
* GroupedCharacter
* Number
* RadioButton
* SimpleColorPicker
* Spinner
* Switch
* Textarea
* Textbox