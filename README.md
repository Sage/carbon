# Carbon

[ ![Codeship Status for Sage/carbon](https://codeship.com/projects/dd2c7bd0-6c4e-0133-1f77-72bb5571e5ad/status?branch=master)](https://codeship.com/projects/115478)

Carbon is a library of reusable [React](https://facebook.github.io/react/) components and an interface for easily building user interfaces based on [Flux](https://facebook.github.io/flux/).

[Carbon Factory](https://github.com/sage/carbon-factory) is supplementary to Carbon; providing tools to easily get your environment and project up and running to start building with React. As well as providing a command line interface to build projects, it manages tasks for compiling your assets and running test suites.

## Getting Started

If you're new to React and/or Node, make sure to see the [Carbon wiki](https://github.com/Sage/carbon/wiki) for learning material.

### Installation

There are instructions on setting up your environment on the [Carbon Factory repository](https://github.com/Sage/carbon-factory/blob/master/docs/first-time-installation.md). We recommend you run through these before continuing with Carbon.

### Documentation

We have a [basic example](docs/guides/a-basic-example.md) to get started with Carbon.

We also have additional guides and tutorials for further information.

#### Guides

* [A Basic Example](docs/guides/a-basic-example.md)
* [Assets](docs/guides/assets.md)
* [Flux](docs/guides/flux.md)
* [Immutable](docs/guides/immutable.md)
* [Validations](docs/guides/validations.md)
* [Decorators](docs/guides/decorators.md)
* [Handlers](docs/guides/handlers.md)

#### Tutorials

* [Creating an App in Rails](docs/tutorials/creating-an-app-in-rails.md)
* [Creating a Component](docs/tutorials/creating-a-component.md)

### Running the Example

Carbon has an example page, which demonstrates most of the components with a Flux implementation. This can be used to quickly see a demonstration of the components and/or as an area to test while developing with the components. To run the example, simply run `gulp` from the root directory of the Carbon repository and navigate to [http://localhost:8080/](http://localhost:8080/).

## Technologies

The following is a list of technologies Carbon utilises:

* [React](http://facebook.github.io/react/) ([JSX](https://facebook.github.io/jsx/)) - Components are written using React, as well as the useful JSX syntax.
* [Flux](https://facebook.github.io/flux/) - If your application requires a heavy use of data and interaction, Carbon provides utilities for easily integrating Flux based data stores.
* [Immutable.js](https://facebook.github.io/immutable-js/) - For better performance and data handling, the components rely on using immutable data.
* [Node](https://nodejs.org/) ([CommonJS](https://nodejs.org/docs/latest/api/modules.html)) - The components (or modules) are written using the CommonJS pattern. This allows for modularity and creating isolated/independent components.
* [Browserify](http://browserify.org/) - In order to consume the modular components in the browser, the code is compiled through Browserify. This also allows managing other dependencies such as stylesheets and images.
* [Gulp](http://gulpjs.com/) - To easily run tasks in development, the Gulp task runner is recommended.
* [Babel](https://babeljs.io/) ([ES6](https://github.com/lukehoban/es6features)) - To benefit from ES6 (and ES7) features, the code is compiled through Babel (this also compiles the JSX).
