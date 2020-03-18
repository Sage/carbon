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
As a consumer you will be required to handle the importing of the `Lato` font. Typically, you can do this by including an `@import` in your main `css` file to get the font via a CDN (`@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');`). If using a CDN is an issue, you should include the font locally and cofigure the `@font-face` (see below) in your main `css` file. It is then possible to use `webpack` and either [file-loader](https://webpack.js.org/loaders/file-loader/) or [url-loader](https://webpack.js.org/loaders/url-loader/) to bundle them with your application. `url-loader` will allow any assets under a given limit to be embedded as a dataURL in `base64` and reduce requests; a fallback loader is used for any asset over the limit, `file-loader` is used if none is provided.

```css
  @font-face {
    font-family: 'Lato';
    src: url('./fonts/Lato-Regular.eot') format('embedded-opentype');
    src: url('./fonts/Lato-Regular.svg') format('svg');
    src: url('./fonts/Lato-Regular.woff') format('woff');
    src: url('./fonts/Lato-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
```
You may also have to include the `CarbonIcons` font (see below) in order for the full range of `Icon`s on offer to be displayed in your project, this can be done in the same way as the `Lato` font.

```css
  @font-face {
    font-family: 'CarbonIcons';
    src: url('carbon-react/lib/style/fonts/carbon-icons-webfont.woff') format("woff");
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
      ...
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
              limit: 8192,
            }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '/[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
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
