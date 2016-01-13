## :warning: This is a working document and may not reflect current best practice.
## :warning: Carbon is still in alpha and subject to change.

# Creating an App in Rails

## Introduction

Carbon provides modular, reusable components written with the [React](https://facebook.github.io/react/) JavaScript library. Carbon components are platform agnostic and can be used with any backend - the only requirement is that the data passed in is in JSON format. Carbon also utilizes the [Flux](https://facebook.github.io/flux/docs/overview.html) pattern to organize data flow within the view.

In this guide, we will walk through building a Carbon view within a Rails application.

If you're familiar with ES5 JavaScript, you may find some of our syntax odd. We're not crazy, we're just using [ES6 syntax](https://babeljs.io/docs/learn-es2015/). This is transpiled into ES5 using a Babel transform for use in all browsers before compilation.

## Building a Journals page with Carbon 

### Setup

* Before you begin, ensure you have followed the first time setup guide for [Carbon Factory](https://github.com/Sage/carbon-factory/wiki/First-Time-System-Setup).

### Create a project

To begin, navigate to the directory that will house your project and run:

```
carbon app myproject
```

This creates a directory called *myproject*. In our example, we have called the project `ui`.

**Note:** To update to the latest version of Carbon, run ```npm install``` in your project root directory.

#### Configure and run gulp

As you work, you can set gulp to watch for changes and compile as you go.

Before running gulp, you may want to specify the destination for your compiled JavaScript and CSS files. To do this, edit gulpfile.js in your project root directory:

```javascript
// ./gulpfile.js

var opts = {
  jsDest: './../host_app/app/assets/javascripts', // the destination directory
  cssDest: './../host_app/app/assets/stylesheets',
  fontDest: './host_app/public/assets/fonts'

};

gulp.task('default', BuildTask(opts));

gulp.task('test', SpecTask());

```

To compile your assets and set gulp to watch for changes, run `gulp` in your project root directory.

### Rails layout

To render the Carbon components in your Rails app, you need to create a layout.

* By default, the Carbon prepare task creates `ui.js` and `ui.css` and you need to include these in the layout.
* You need to insert a default hook with `id='app'` - this is where your Carbon view is rendered.
* You should assign data parsed by the Carbon Ruby presenter to the global constant APPDATA.

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

      // We assign data parsed by the Carbon Ruby presenter to the global constant APPDATA.
      window.APPDATA = JSON.parse('<%= @presenter.to_json.html_safe %>');

    </script>
    <%= javascript_include_tag "ui" %>
  </body>
</html>
```

### Rails route

To render the new layout, you need to link it to a Rails controller action.

For this example, you want to render the layout when users call the `reverse` action.

Simply add `layout: 'carbon'` to the call to render:

```ruby
# journals_controller.rb

 def reverse
    journal = load_instance.reversal
    @presenter = create_presenter(journal)
    render :new, layout: 'carbon'
  end
```

### Creating your first view

In React, everything is a component. When we talk about views, we're using an abstraction - we really mean a component built up from several modular components (i.e. widgets). 

To create a view (or any other component), create a class representing that view:

```javascript
// ui/src/views/journals/reverse/index.js

import JournalStore from 'stores/journals';
import React from 'react';
import { connect } from 'carbon/lib/utils/flux';

class JournalsReverse extends React.Component {

  render() {
    return (

    )
  }
};

export default connect(JournalsReverse, JournalStore);
```

We import a view helper as a Flux utility from Carbon and use the connect function to connect the component to the store.

Suppose you want a `Form` containing:

* a `Textbox` 
* a `Date`
* an `InputGrid` (formerly TableFieldsForMany) containing 2 `Textbox` fields

You need to import each component you want to use into your view:

```javascript
// ui/src/views/journals/reverse/index.js

import JournalStore from 'stores/journals';
import React from 'react';
import { connect } from 'carbon/lib/utils/flux';

import Form from 'carbon/lib/components/form';
import Textbox from 'carbon/lib/components/textbox';
import Date from 'carbon/lib/components/date';
import InputGrid from 'carbon/lib/components/input-grid';

class JournalsReverse extends React.Component {

  render() {
    return (
    )
  }
};

export default connect(JournalsReverse, JournalStore);
```

Once you have imported the components into your view, you can add them to the `return` block using [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) syntax as follows:

```javascript
// ui/src/views/journals/reverse/index.js

// ...import statements

class JournalsReverse extends React.Component {

  render() {
    /* Here we're defining what children components InputGrid will 
    render. We can pack these children components into an array. 
    InputGrid is a complex component that renders components 
    passed to it as children. */

    var inputGridFields = [<Textbox />,<Textbox />];

    return (
      <div>
        <Form>
          <Textbox />
          <Date />
          <InputGrid />
        </Form >
      </div>
    )
  }
};

export default connect(JournalsReverse, JournalStore);
```

Notice that we enclose everything in a `<div>` tag. That's because React expects the return block to return a single component. (We don't actually need the `<div>` here since our `<Form>` is a single component but we include the `<div>` as best practice).

### Setting up our Store

A [Store in React](https://facebook.github.io/flux/docs/overview.html#stores) holds all of the information about the current state of our view. At the moment, our view is static and can't be updated. 

For our Rails app, the Store will also hold data fetched from the database, which it will then pass down to the components.

```javascript
// ui/src/stores/journals/index.js

import Store from 'carbon/lib/utils/flux/store';
import Dispatcher from 'dispatcher';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';

class JournalStore extends Store {

  constructor(Dispatcher) {
    super(Dispatcher);

    // this is required for the store to work (it should be a unique name)
    this.name = 'journalStore';

    // here we assign the parsed JSON data from our app
    this.data = ImmutableHelper.parseJSON(APPDATA.journal);
  }
}

export default new JournalStore(Dispatcher);

```

### Updating our View with props

The connected store data is available to our View's `state` object using the unique name defined in the store's contructor. For example:

```js
this.state.journalStore.get('date')
```

Carbon components also use React [`props`](https://facebook.github.io/react/docs/transferring-props.html) allowing you to pass data down to a component. 

Our components have a few required props which we'll add now.

```javascript
// ui/src/views/journals/reverse/index.js

// ...previous import statements
import JournalActions from 'actions/journal';

class JournalsReverse extends React.Component {

  render() {
    var inputGridFields = [<Textbox key='1' name='service' />,
                           <Textbox key='2' name='description' />];

    return (
      <div>
        <Form model='journal' action='/journals' method='post'>
          <Textbox
           name="description"
           value={ this.state.journalStore.get('description') }
           onChange={ JournalActions.journalValueUpdated } />

          <Date
           name='date'
           value={ this.state.journalStore.get('date') }
           onChange={ JournalActions.journalValueUpdated } />

          <InputGrid
           name='journal_lines'
           data={ this.state.journalStore.get('journal_lines') }
           onRowDelete={ JournalActions.deleteJournalLineRow }
           onRowUpdate={ JournalActions.updateJournalLineRow }
           fields={ inputGridFields } />
        </Form>
      </div>
    )
  }
};

export default connect(JournalsReverse, JournalStore);
```

Note that we have imported a new module called `JournalActions`. This defines the actions used by the `InputGrid` component and onChange actions. We haven't created any actions yet, let's do that now.

### Creating Actions for your view

Actions are essentially objects we use to pass data through our view. Read more about them [here](https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html#content).

#### Defining our actions as constants

You should define all of your actions in a constants file.

Having the action names clearly visible in one file gives a good high level view of the available actions making it easier to spot errors or duplication as well as making it more obvious what the application is used for.

For example:

```javascript
// ui/src/constants/journals/index.js

export default {
  JOURNAL_VALUE_UPDATED:   'journalValueUpdated',
  DELETE_JOURNAL_LINE_ROW: 'deleteJournalLineRow',
  UPDATE_JOURNAL_LINE_ROW: 'updateJournalLineRow'
}
```

You can pass any data you want inside an action - the only requirement is to define an actionType which is used to register the action with our Store.

For example:

```javascript
//ui/src/actions/journal/index.js

import Dispatcher from 'dispatcher';
import Constants from 'constants/journals';

var JournalActions = {

  journalValueUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: Constants.JOURNAL_VALUE_UPDATED,
      value: ev.target.value,
      name: props.name
    });
  },

  deleteJournalLineRow: (ev, props) => {
    Dispatcher.dispatch({
      actionType: Constants.DELETE_JOURNAL_LINE_ROW,
      row_id: props.row_id
    });
  },

  updateJournalLineRow: (ev, props) => {
    Dispatcher.dispatch({
      actionType: Constants.UPDATE_JOURNAL_LINE_ROW,
      row_id: props.row_id,
      name: props.name,
      value: ev.target.value
    });
  }
};

export default JournalActions;
```

Now we need to update our Store to listen for these actions:

```javascript
// ui/src/stores/journals/index.js

import Store from 'carbon/lib/utils/flux/store';
import Dispatcher from 'dispatcher';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';
import Constants from 'constants/journals';

class JournalStore extends Store {

  constructor(Dispatcher) {
    super(Dispatcher);

    this.name = 'journalStore';

    this.data = ImmutableHelper.parseJSON(APPDATA.journal);
  }

  [Constants.JOURNAL_VALUE_UPDATED](action) {
    this.data = this.data.set(action.name, action.value);
  }

  [Constants.DELETE_JOURNAL_LINE_ROW](action) {
    this.data = ImmutableHelper.deleteLineItem(
      [this.data, 'journal_lines', action.row_id]
    );
  }

  [Constants.UPDATE_JOURNAL_LINE_ROW](action) {
    this.data = ImmutableHelper.updateLineItem(
      [this.data, 'journal_lines', action.row_id, action.name], action.value
    );
  }
}

export default new JournalStore(Dispatcher);

```

Our Store is now listening for the defined actions - any time they are called in our view, the store will update the view. [Read more here](https://facebook.github.io/flux/docs/overview.html#structure-and-data-flow)

### Setting up React routes

Carbon uses [React Router](https://github.com/rackt/react-router) to bind view components to specific paths. Before we can see anything on our page, we need to specify the route:

```javascript
//ui/src/main.js

import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon/lib/utils/router';

import JournalsReverse from 'views/journals/reverse';

var routes = (
  <Route path="/journals/:id/reverse" component={ JournalsReverse } />
);

startRouter(routes);
```

Note that we've defined the path as the url, and the component to render as our view component.

You can now navigate to your view to see our rendered view.

If you don't see anything, check that gulp is running and that it isn't reporting any syntax errors. If gulp doesn't report any errors, you can check the Console to see if any errors are reported there.
