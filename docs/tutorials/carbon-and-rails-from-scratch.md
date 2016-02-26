## :warning: This is a working document and may not reflect current best practice.
## :warning: Carbon is still in alpha and subject to change.

# Creating an App in Rails

## Introduction

Carbon provides modular, reusable components written with the [React](https://facebook.github.io/react/) JavaScript library. Carbon components are platform agnostic and can be used with any backend - the only requirement is that the data passed in is in JSON format. Carbon also utilizes the [Flux](https://facebook.github.io/flux/docs/overview.html) pattern to organize data flow within the view.

In this guide, we will walk through building a Carbon view within a Rails application.

If you're familiar with ES5 JavaScript, you may find some of our syntax odd. We're not crazy, we're just using [ES6 syntax](https://babeljs.io/docs/learn-es2015/). This is transpiled into ES5 using a Babel transform for use in all browsers before compilation.

### Setup

* Before you begin, ensure you have followed the first time setup guide for [Carbon Factory](https://github.com/Sage/carbon-factory/wiki/First-Time-System-Setup).

### Creating a Rails App

```
rails new carbon-rails-test
```

### Creating a Carbon Directory

Using the carbon-factory command line tools we can generate some boilerplate for our application

```
carbon app mydirectory
```

This creates a directory called `mydirectory`. In our example, we have called the project `ui`.

Directory structure:
```
├── ui/
│   ├── node_modules/ - Installed Dependencies
│   ├── src/
│   │   ├── actions/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── dispatcher
│   │   │   ├── dispatcher.js
│   │   ├── stores/
│   │   ├── views/
│   │   ├── main.js - Entry point for Carbon
│   ├── gulpfile.js - Gulp Task
│   ├── index.html
│   ├── package.json - Dependencies
```

You should now navigate to the `ui` directory and run `npm install` which will install all the dependencies defined in your `package.json`


#### Configure and run gulp

As you work, you can set gulp to watch for changes and compile as you go.

Before running gulp, you may want to specify the destination for your compiled JavaScript and CSS files. To do this, edit gulpfile.js in your projects `ui` directory:

```javascript
// ./gulpfile.js

var opts = {
  jsDest: './../app/assets/javascripts',
  cssDest: './../app/assets/stylesheets',
  fontDest: './../public/assets/fonts'
};

gulp.task('default', BuildTask(opts)); // <-- Pass options here

gulp.task('test', SpecTask());

```

To compile your assets and set gulp to watch for changes, run `gulp` in your `ui` directory.

**Note:** For more `gulpfile` options see the [carbon-factory gulp file](https://github.com/Sage/carbon-factory/blob/master/src/gulp/build.js)

### Rails layout

To render the Carbon components in your Rails app, you need to create a layout.

* By default, the Carbon prepare task creates `ui.js` and `ui.css` and you need to include these in the layout.
* You need to insert a default hook with `id='app'` - this is where your Carbon view is rendered.
* We have also defined a APPDATA object which we will use to get data from our controllers.

For example:

```html
<!--app/views/layouts/carbon.html.erb-->

<!DOCTYPE html>
<html>
  <head>
    <%= stylesheet_link_tag "ui" %>
  </head>
  <body>
    <!--Default hook for our React components-->
    <div id='app'></div>

    <script type="text/javascript">
      window.APPDATA = JSON.parse('<%= @data.to_json.html_safe || [] %>');
    </script>

    <%= javascript_include_tag "ui" %>
  </body>
</html>
```

At the moment our application will throw an error when it trys to include the `ui.js` file

We need to precompile this assets so open up your `config/initializers/assets.rb` and add a precompile line for the js file

```ruby
# config/initializers/assets.rb

Rails.application.config.assets.precompile += %w( ui.js )
```

### Rails Controller and View

Using Rails controller generator lets create a welcome page

```
rails generate controller welcome index
```

Lets make the `welcome#index` our root

```ruby
Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index'
end
```

### Rails route

To render the new layout, you need to link it to a Rails controller action.

For this example, you want to render the layout when users call the `index` action.

Simply add `layout: 'carbon'` to the call to render:

```ruby
class WelcomeController < ApplicationController
  def index
    @data = [1,2,3]
    render :index, layout: 'carbon'
  end
end
```

### Creating your first React view

In React, everything is a component. When we talk about views, we're using an abstraction - we really mean a component built up from several modular components (i.e. widgets).

To create view we need a new directory `ui/src/views/welcome` and two files.
* `ui/src/views/welcome/welcome.js`
* `ui/src/views/welcome/package.json`

Within the `package.json` we need to add a `main` key to correctly compile the file

```json
{
  "main": "./welcome.js"
}
```

To create a view (or any other component), create a class representing that view:

```javascript
// ui/src/views/welcome/welcome.js

import React from 'react';
import { connect } from 'carbon/lib/utils/flux';

class Welcome extends React.Component {
  render() {
    return (
      <div>Hello World!</div>
    )
  }
};

export default Welcome;
```

Within the `return` block we are declaring what looks like HTML div tags but actually we are using [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) syntax.

Lets leave our React Application as it is for now and try get something into our browser. The final thing we need to do is define the routes for our react component.

Open up the `main.js` file and import the `Welcome` component

We can add the component to the default route which matches the root path

```javascript
// ui/src/main.js

import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon/lib/utils/router';
import Welcome from 'views/welcome';

var routes = (
  <Route path="/" component={ Welcome } />
);

startRouter(routes);
```

### Hello World!

In the root of your carbon test app boot up the rails server and navigate to `localhost:3000`

You should see the text `Hello World!` within your browser.
