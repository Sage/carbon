# Getting Started

## Project Setup

### Using Carbon Factory

The quickest way to get started with Carbon is to use [Carbon Factory](https://github.com/sage/carbon-factory).

Carbon Factory provides pre-configured Webpack config and Jest config to get going with a new application in minutes.

### Without Using Carbon Factory

Carbon can also be used with your own build configurations.

#### Webpack

We recommend you install the [Parcelify Loader](https://www.npmjs.com/package/parcelify-loader). Our components integrate with the loader to easily serve CSS assets for each component you use.

#### Browserify

We recommend you install the [Parcelify plugin](https://www.npmjs.com/package/parcelify). Our components integrate with the loader to easily serve CSS assets for each component you use.

#### Other

Alternatively you can manually import the style assets for each component you use. We are working to improve how this is managed in a future version to make it easier for everyone to get started with Carbon.

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
