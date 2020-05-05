# Getting started with Carbon
## Get up and running with the Carbon library and start developing your application with Carbon integration.

### Contents
[Installation](#installation)

[Peer Dependencies](#peer-dependencies)
* [Fonts](#fonts)
* [React and React DOM](#react-and-react-dom)
* [Base CSS](#base-css)
* [Theming](#theming)
* [AppWrapper](#appwrapper)
* [Quickstart](#quickstart)

### Installation
Carbon is available as an [npm package](https://www.npmjs.com/package/carbon-react), install it into your project with:

```js
npm install carbon-react
```

### Peer Dependencies
You will need to install the following dependencies in your project, these are peer-dependencies of carbon-react and are required.

```sh
npm install react@^16.12.0 react-dom@^16.12.0 i18n-js@^3.0.0 styled-components@^4.4.1
```

#### Fonts
##### CDN
As a consumer you will be required to handle the importing of the `Lato` font. Typically, you can do this by including an `@import` in your main `css` file to get the font via a CDN.
```js
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');
``` 

##### Local
If using a CDN is an issue, you should include the font locally and configure the `@font-face` (see below) in your main `css` file. It is then possible to use `webpack` and either [file-loader](https://webpack.js.org/loaders/file-loader/) or [url-loader](https://webpack.js.org/loaders/url-loader/) to bundle them with your application. `url-loader` will allow any assets under a given limit to be embedded as a dataURL in `base64` and reduce requests; a fallback loader is used for any asset over the limit, `file-loader` is used if none is provided.

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
    src: url('./node_modules/carbon-react/lib/style/fonts/carbon-icons-webfont.woff') format("woff");
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
#### React and React DOM
React and React DOM are imported from the [React library](https://reactjs.org/), which forms the basis for Carbon's components.
```js
import React from 'react';
import ReactDOM from 'react-dom';
```
#### Base CSS
Carbon provides some baseline CSS that is applied to `body` and other elements. You should import this into the root of your project.
```js
import 'carbon-react/lib/utils/css';	
```
#### Theming
Carbon uses the `ThemeProvider` from the [styled-components library](https://styled-components.com/docs/advanced#theming) to supply theme styles to your components. Themes are define within the Carbon library.
```js
import { ThemeProvider } from "styled-components";
import mintTheme from "carbon-react/lib/style/themes/mint";
```

```html
 <ThemeProvider theme={mintTheme}>
  Children
 </ThemeProvider>
```
#### AppWrapper
This component wraps all components within the width constrains of your application.
```html
<AppWrapper>
  Children
</AppWrapper>
```
You should refer to our [Storybook documentation](https://carbon.sage.com/?path=/docs/app-wrapper--default) for details.

#### Quickstart
A basic project `index.js` file would resemble this example. 
```js
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import mintTheme from "carbon-react/lib/style/themes/mint";
import "carbon-react/lib/utils/css";
import AppWrapper from "carbon-react/lib/components/app-wrapper";
import Button from "carbon-react/lib/components/button";

const App = props => {
  return (
    <ThemeProvider theme={mintTheme}>
      <AppWrapper>
        <Button>Hello Carbon</Button>
        <p>
          Please remember to select the appropriate version of Carbon.
        </p>
      </AppWrapper>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
```
This can also be found in our [Codesandbox template](https://codesandbox.io/embed/carbon-quickstart-xi5jc).
