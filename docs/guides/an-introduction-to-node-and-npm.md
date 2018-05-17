# An Introduction to Node and npm

This guide is intended to give a basic overview of Node and npm for any developers unfamiliar with them. For a more in-depth overview we recommend you find out more at the [Node](https://nodejs.org) or [npm](https://docs.npmjs.com/getting-started/what-is-npm) websites.

## What are they?

Node is a JavaScript runtime - it allows you to write simple scripts to complex applications in JavaScript that can run on a server.

npm is a package manager for Node - it allows you to install Node packages from other developers and to eventually publish your own packages.

> For Ruby developers - for familiarity you could compare Node to Ruby and npm to bundler.

## What do we use them for?

For developing with React, it is common practice to structure your components using [CommonJS](https://nodejs.org/docs/latest/api/modules.html) within the Node ecosystem. This means that components are isolated from one another, and we can use npm to manage our dependencies.

To compile the code into something the browser understands we run the code through [Webpack](https://webpack.js.org/).

## How do we use them?

When working with a Node package you should have a `package.json` in the root directory of your package. This declares all required dependencies to run your package (In Ruby, this is similar to a `Gemfile`).

To install all dependencies you should run `npm install` in the root directory of your package. This installs all third party dependencies in the `/node_modules` directory. (In Ruby, this is similar to running `bundle`). Every time you pull down new code you should ensure that all dependencies are installed or you will get errors such as `Error Cannot find module 'foo'` when you try to build your application.

Once a dependency is installed you can use it in a JS file in your application. For example, if you install React with `npm install react` - you can import and use it:

```js
import React from 'react';
// React is now available to use in this file.
```

When compiling your application the process is clever enough to understand when a dependency has already been imported from a different file - meaning that everything is ultimately only ever imported once. However, by having to import dependencies into each file, you ensure that that particular file will work independently. This means Carbon could supply 100 components, but if you only use 2 of them then those components plus their dependencies is all your compiled JS will use.

You can import files or modules either from the dependencies you have installed in `/node_modules` or as relative paths:

```js
// this has imported the react module from node_modules dir:
import React from 'react';
// this has imported the custom component module form the relative path:
import CustomComponent from './../custom-component';
```

You can find and install packages from [https://www.npmjs.com/](https://www.npmjs.com/). Alternatively you can install packages from GitHub if they are set up to do so with the format of `npm install username/repo`. For example Carbon is installable from GitHub with `npm install sage/carbon`. You can also install packages from local directories with a relative path, for example `npm install ./../foobar` - this is useful if you want to clone a package and test some changes you want to make.

Some packages supply an additional command line interface that you can install. To use these you need to install the package globally - for example Gulp is a package you can use in your application, but it also has a CLI you can use. To install the CLI you would run `npm install gulp -g`. Carbon Factory also supplies a CLI you can install with `npm install sage/carbon-factory -g`.
