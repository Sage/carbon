# Creating an App in Rails

## Introduction

Carbon provides modular, reusable components written with the [React](https://facebook.github.io/react/) JavaScript library. Carbon components are platform agnostic and can be used with any backend - the only requirement is that the data passed in is in JSON format. Carbon also utilizes the [Flux](https://facebook.github.io/flux/docs/overview.html) pattern to organize data flow within the view.

In this guide, we will walk through building a Carbon view within a Rails application.

If you're familiar with ES5 JavaScript, you may find some of our syntax odd. We're not crazy, we're just using [ES6 syntax](https://babeljs.io/docs/learn-es2015/). This is transpiled into ES5 using a Babel transform for use in all browsers before compilation.

## Setup

* Before you begin, ensure you have followed the [first time setup guide](/docs/guides/setting-up-your-environment.md).
* If you are new to Node/npm, read our [quick intro](/docs/guides/an-introduction-to-node-and-npm.md).

### Setting up Rails App

```shell
rails new carbon-rails-test
```

### Setting Up Carbon App

Using the carbon-factory command line tools we can generate some boilerplate for our application

Change to the directory containing your Rails app:

```shell
cd carbon-rails-test
```

Run the Carbon command to generate a React/Flux app:

```shell
carbon app ui
```

This creates a directory called `ui`, with everything we need to build a React/Flux application.

The directory structure look like this:

```
├── ui/
│   ├── node_modules/ - Installed Dependencies
│   ├── src/
│   │   ├── actions/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── stores/
│   │   ├── views/
│   │   ├── main.js - Entry point for Carbon
│   ├── gulpfile.js - Gulp Task
│   ├── index.html
│   ├── package.json - Dependencies
```

You should now navigate to the `ui` directory:

```shell
cd ui
```

And install the Node dependencies:

```shell
npm install
```

This will install all the dependencies defined in your `package.json`.

### Configuring Carbon App

As you work, you can set [gulp](http://gulpjs.com/) to watch for changes and compile as you go.

The compilation task can also be configured, for example you may want to specify the destination for your compiled JavaScript, CSS, or any other assets. 

To do this you should now edit `gulpfile.js` in your project's `ui` directory:

```javascript
// ui/gulpfile.js

var gulp = require('gulp');
var BuildTask = require('carbon-factory/lib/gulp/build').default;
var SpecTask = require('carbon-factory/lib/gulp/spec').default;

var opts = {
  jsDest: './../app/assets/javascripts',
  cssDest: './../app/assets/stylesheets',
  fontDest: './../app/assets/fonts/fonts'
};

gulp.task('default', BuildTask(opts)); // <-- Pass options here

gulp.task('test', SpecTask());
```

Our changes above will tell gulp to compile the assets into the Rails `/app/assets` directory, so the asset pipeline can find and serve them to the Rails app.

We should now run gulp to compile the assets and watch for any changes:

```shell
gulp
```

**Note:** For more `gulpfile` options see the [carbon-factory gulp file](https://github.com/Sage/carbon-factory/blob/master/src/gulp/build.js)

### Configuring Rails App

We now need to configure Rails so it knows about the new assets and how to use them.

First of all, let's update the application layout to move the JS asset and add a `div` in which to render the React components:

```html
<!-- app/views/layouts/application.html.erb -->

<!DOCTYPE html>
<html>
<head>
  <title>CarbonRailsTest</title>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
</head>
<body>

<%= yield %>

<!-- add the following div so react knows where to render: -->
<div id='app'></div>

<%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>

</body>
</html>
```

Please note that we have moved JS assets to the bottom of the `body`. This is important for rendering the page successfully.

For some Rails applications, you may want to keep the React assets separate. In this case, ensure you render the additional assets to the layout and add them to the precompilation config option in your app.

### Rails Controller and View

Using Rails controller generator let's create a user page:

```shell
rails generate controller user index
```

Let's make the `user#index` our root:

```ruby
# config/routes.rb

Rails.application.routes.draw do
  get 'user/index'
  root 'user#index'
end
```

As we want React to take care of rendering our UI, we can tell the `index` action to not render anything except the layout:

```ruby
# app/controllers/user_controller.rb

class UserController < ApplicationController
  def index
    render inline: "", layout: "application"
  end
end
```

### Creating Your First React View

In React, everything is a component. When we talk about views, we're using an abstraction - we really mean a component built up from several modular components (i.e. widgets).

To create a view we need a new directory `ui/src/views/user/` and two files.

* `ui/src/views/user/user.js`
* `ui/src/views/user/package.json`

Within the `package.json` we need to add a `main` key to correctly load the file:

```json
// ui/src/views/user/package.json

{
  "main": "./user.js"
}
```

To create a view (or any other component), create a class representing that view:

```javascript
// ui/src/views/user/user.js

import React from 'react';

class User extends React.Component {
  render() {
    return (
      <div>Hello World!</div>
    );
  }
}

export default User;
```

Within the `return` block we are declaring what looks like HTML div tags but actually we are using [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) syntax.

Let's leave our React Application as it is for now and try to get something into our browser. The final thing we need to do is define the routes for our react component.

Open up the `main.js` file and import the `User` component. We can add the component to the default route which matches the root path:

```javascript
// ui/src/main.js

import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon-react/lib/utils/router';

import User from 'views/user';

let routes = (
  <Route path="/" component={ User } />
);

startRouter(routes);
```

### Hello World!

In the root of your Rails app, boot the Rails server:

```shell
bundle exec rails s
```

You should now be able to navigate to [http://localhost:3000/](http://localhost:3000/) in your browser and see the text `Hello World!` rendered by your React component.

### Custom App Styling

At the moment our view spans the entire width of our page. Let's add some css to the app id so that the width is defined and the content is centered.

Within our view's `package.json` file we want to add a stylesheet file that will be included with the User component.

```json
# ui/src/views/user/package.json

{
  "main": "./user.js",
  "style": "./user.scss"
}
```

```scss
// ui/src/views/user/user.scss

#app {
  width: 960px;
  margin: auto;
}
```

## What's Next

If you have not already, this is probably a good time to familiarise yourself with Flux - we have a [basic example](https://github.com/Sage/carbon/blob/master/docs/guides/a-basic-example.md) to demonstrate the fundamentals.

Otherwise, let's continue by introducing data to our Rails/React application using Flux.

[Introducing Data](https://github.com/Sage/carbon/blob/master/docs/tutorials/carbon-rails/introducing-data.md)
