# Carbon [![Codeship Status](https://img.shields.io/codeship/dd2c7bd0-6c4e-0133-1f77-72bb5571e5ad/master.svg)](https://app.codeship.com/projects/115478) [![Travis Status](https://travis-ci.org/Sage/carbon.svg?branch=master)](https://travis-ci.org/Sage/carbon) [![npm](https://img.shields.io/npm/v/carbon-react.svg)](https://www.npmjs.com/package/carbon-react)

<img src="https://raw.githubusercontent.com/Sage/carbon/master/logo/carbon-logo.png" width="50">

Carbon is a library of reusable [React](https://facebook.github.io/react/) components.

See the [demo and documentation site](https://carbon.sage.com/) for live examples, or see [create-carbon-app](https://github.com/sage/create-carbon-app) to get started.

## Documentation

### Getting Started

* [Setting up your environment](docs/guides/setting-up-your-environment.md)
* [Getting started](docs/guides/getting-started.md)

### Guides

* [Assets](docs/guides/assets.md)
* [Flux](docs/guides/flux.md) - please note that Carbon does not require Flux and supports any React compatible state container.
* [Immutable](docs/guides/immutable.md)
* [Validations](docs/guides/validations.md)
* [Decorators](docs/guides/decorators.md)
* [Services](docs/guides/services.md)
* [Integrating Carbon with other UI](docs/guides/integrating-with-other-ui.md)
* [Testing changes to Carbon in your project](docs/guides/installing-unreleased-changes.md)
* [Releasing Carbon](docs/guides/releasing.md)

#### Testing

As Carbon is just React components, we support any test suite you prefer to use. However we also provide out-of-the-box test tooling through [Carbon Factory](https://github.com/sage/carbon-factory).

## Running the Demo Site Locally

  1. Clone the carbon repository (`git clone git@github.com:Sage/carbon.git`)
  2. `cd carbon`
  3. `npm install`
  4. `npm start`
  5. Navigate to [http://localhost:8095/](http://localhost:8095/) in your favourite browser
  
> Note: MockAPI for tables and dropdowns is disabled locally as it conflicts with HotReloading. To enable see `src/main.js` file

## Adding Release Notes

* Use [renogen](https://github.com/DDAZZA/renogen), or add a yml file manually to `./changelog/next` e.g. `./changelog/next/my-update.yml`.
* Update or add an appropriate heading in the style shown below for each change:
```
Bug Fixes: "Modal: The Modal is now centered in the browser."
```

## Technologies

The following is a list of technologies Carbon utilises:

* [React](http://facebook.github.io/react/) ([JSX](https://facebook.github.io/jsx/)) - Components are written using React, as well as the useful JSX syntax.
* [Flux](https://facebook.github.io/flux/) - If your application requires a heavy use of data and interaction, Carbon provides utilities for easily integrating Flux based data stores.
* [Immutable.js](https://facebook.github.io/immutable-js/) - For better performance and data handling, the components rely on using immutable data.
* [Node](https://nodejs.org/) ([CommonJS](https://nodejs.org/docs/latest/api/modules.html)) - The components (or modules) are written using the CommonJS pattern. This allows for modularity and creating isolated/independent components.
* [Webpack](https://webpack.js.org/) - In order to consume the modular components in the browser, the code is compiled through Webpack. This also allows managing other dependencies such as stylesheets and images.
* [Babel](https://babeljs.io/) ([ES6](https://github.com/lukehoban/es6features)) - To benefit from ES6 (and ES7) features, the code is compiled through Babel (this also compiles the JSX).

## Licence

Carbon is licensed under the [Apache-2.0 licence](https://github.com/Sage/carbon/blob/master/LICENSE).

Copyright (c) 2018 Sage Group Plc. All rights reserved.
