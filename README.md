# Carbon [![Travis Status](https://travis-ci.org/Sage/carbon.svg?branch=master)](https://travis-ci.org/Sage/carbon) [![npm](https://img.shields.io/npm/v/carbon-react.svg)](https://www.npmjs.com/package/carbon-react)
<img src="https://raw.githubusercontent.com/Sage/carbon/master/logo/carbon-logo.png" width="50">

Carbon is a [React](https://facebook.github.io/react/) component library developed by Sage.

## Examples

See the [storybook](https://carbon.sage.com/) for live examples.

## Browser Support
We support and test the Carbon Library against the latest versions of the following browsers:
* [Chrome](https://www.google.com/chrome/)
* [Firefox](https://www.mozilla.org/firefox/)
* [Safari](https://www.apple.com/safari/)
* [Edge](https://www.microsoft.com/windows/microsoft-edge)

## Fonts
As a consumer you will be required to handle the importing of the `Lato` font. Typically, you can do this by including an import in your main `scss` file to get the font via CDN `@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');`. If using a CDN is an issue, you should include the font locally and cofigure the `@font-face` (see below) in you main `scss` file. It is then possible to use `webpack` and [url-loader](https://webpack.js.org/loaders/url-loader/) to bundle them with your application.

```css
  @font-face {
    font-family: 'Lato';
    src: url('../assets/fonts/Lato-Regular.eot') format('embedded-opentype');
    src: url('../assets/fonts/Lato-Regular.svg') format('svg');
    src: url('../assets/fonts/Lato-Regular.woff') format('woff');
    src: url('../assets/fonts/Lato-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
```

Example of `webpack.config.js`
```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
        }]
      },
      ...
    ]
  }
  ...
};
```
 
## Contributing
Read our [contributing guide](https://github.com/Sage/carbon/blob/master/CONTRIBUTING.md) to learn about our development process, how to suggest bugfixes and raise issues.

## Licence
Carbon is licensed under the [Apache-2.0 licence](https://github.com/Sage/carbon/blob/master/LICENSE).

Copyright (c) 2018 Sage Group Plc. All rights reserved.