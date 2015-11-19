# Assets

In addition to the JavaScript, you may need to include other assets with your modules such as stylesheets, images or fonts. You can define these additional dependencies by creating a `package.json` file for your module.

For example, if you have a component called textbox located at `./src/components/textbox/index.js`, you could create a `package.json` for this component:

```json
// ./src/components/textbox/package.json

{
  "style": "style.scss",
  "fonts": [
    "fonts/my-font.eot",
    "fonts/my-font.svg",
    "fonts/my-font.ttf",
    "fonts/my-font.woff"
  ],
  "images": [
    "images/textbox.png"
  ]
}
```

This states that if a developer uses your textbox component, they should also  get the `style.scss` file and the specified font files and images.

Now when using the [gulp build task](https://github.com/Sage/carbon-factory/blob/master/src/gulp/build.js) provided by Carbon Factory, these assets are compiled or copied accordingly.

Creating a `package.json` for the module to define its assets means that the module can be entirely self contained. 

For example, a module or component directory structure may look like this:

```
|-- components
    |-- textbox
        |-- __spec__.js
        |-- index.js
        |-- package.json
        |-- style.scss
        |-- fonts
            |-- my-font.eot
            |-- my-font.svg
            |-- my-font.ttf
            |-- my-font.woff
        |-- images
            |-- textbox.png
```

### More information

If you want more information on how we compile assets, see [Browserify](http://browserify.org/) and [Parcelify](https://github.com/rotundasoftware/parcelify).
