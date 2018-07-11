# Assets

In addition to the JavaScript, you may need to include other assets with your modules such as stylesheets, images or fonts. These additional assets can be referenced in your JavaScript and CSS files by importing/referencing them, they are then consumed by Webpack.

For example if you have a component called textbox located at `./src/components/textbox/index.js`, you could create some additional assets for it using a structure such as:

```
|-- components
    |-- textbox
        |-- __spec__.js
        |-- index.js
        |-- textbox.scss
        |-- fonts
            |-- my-font.ttf
            |-- my-font.woff
            |-- my-font.woff2
        |-- images
            |-- textbox.png
```

Structuring your assets this way means that the component can be entirely self contained.

You could then import the CSS into your `index.js` file:

```js
@import './textbox.scss';
```

In your CSS file you could then reference the fonts and images:

```
@font-face {
  font-family: 'MyFont';
  src: url('fonts/my-font.woff2') format('woff2'),
       url('fonts/my-font.woff') format('woff'),
       url('fonts/my-font.ttf') format('truetype');
}

.textbox {
  background-image: url(images/textbox.png);
}
```

Alternatively you might want to reference your image in the component itself:

```js
import TextboxImage from './images/textbox.png';

export default () => (
  <img src={ TextboxImage } />
);
```

Simply referencing the assets in your code will enable Webpack to handle the rest for you.
