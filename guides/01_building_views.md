
# NOTE: This is a working document and may not reflect current best practice. 
Carbon is still in alpha and subject to change. 


# Building a View with Carbon 

## Introduction

Carbon provides modular, re-useable components written with [React](https://facebook.github.io/react/) Javascript library. Carbon components are platform agnostic and can be used with any backend - the only requirement is that data be passed in the JSON format. Carbon also utilizes the [Flux](https://facebook.github.io/flux/docs/overview.html) pattern to organize data flow within the view.

In this guide, we will walk through building a Carbon view within the context of a Rails application. We will indicate Rails/Ruby specific logic using the Rails logo:

If you're familiar with ES5 Javascript, you may find some of our syntax odd. We're not crazy, we're just using [ES6 syntax](https://babeljs.io/docs/learn-es2015/). This is transpiled into ES5 using a Babel transform for use in all browsers before compilation.

## Building a Journals Page with Carbon 

### 1) Setup

* Before you begin, ensure you have followed the first time setup guide for [Carbon-factory](https://github.com/Sage/carbon-factory/wiki/First-Time-System-Setup)

### 2) Creating a project

* To begin, navigate to the directory that will house your project and run:
```
carbon prepare myproject
```
the directory will take the name you provide as *myproject*.

* To install all required dependencies including Carbon, run:
```
npm install
```
You will need to re-run this command every time you wish to update to the latest version of Carbon.

* As you work, you can set gulp to watch for changes and compile as you go.
(Rails) Before running gulp, you may want to specifiy the destination for your compiled js and css files. To do this, you'll need to edit the gulpfile.js in your project root directory. 

See **Futher Configuration** in the [guides](https://github.com/Sage/carbon-factory/blob/master/README.md) for more info. 

For example:

```javascript
// ./gulpfile.js

var opts = {
  jsDest: './../host_app/app/assets/javascripts', // the destination directory
  cssDest: './../host_app/app/assets/stylesheets'
};

gulp.task('default', BuildTask(opts));

gulp.task('test', SpecTask());

```

* To set gulp to watch for changes, run ```gulp``` in your project root directory.

* **Note** It's probably best at this point to add the node_modules directory, as well as the compiled .js and .css files to your *.gitignore* file. 

### 3) (Rails) Layout

* In order to render our Carbon view in our Rails app, we need to create a layout. By default, the carbon prepare task creates *ui.js* and *ui.css*. We include these in our layout below.

```html
<!--app/assets/views/layouts/carbon.html.erb-->

<!DOCTYPE html>
<html>
  <head>
    <%= stylesheet_link_tag "ui" %>
  </head>
  <body>

  <!--Default hook for Carbon views-->
    <div id='app'></div>

    <script type="text/javascript">

      // We assign data parsed by the Carbon Ruby presenter to the global constant APPDATA.
      window.APPDATA = JSON.parse('<%= @presenter.to_json.html_safe %>');

    </script>
    <%= javascript_include_tag "ui" %>
  </body>
</html>
```

### 4) Rails Route

* To render your new layout, you need to link it to a controller action. For our example, we'll render the layout when users call the *reverse* action. Simply add ```layout: 'carbon'``` to the call to render.
```ruby
# journals_controller.rb

 def reverse
    journal = load_instance.reversal
    @presenter = create_presenter(journal)
    render :new, layout: 'carbon'
  end
```

### 5) Creating your first view

* In React, everything is a component. When we talk about views, we're using an abstraction - we really mean a high level component built up from several modular components (i.e. widgets). 
* N.B. It's possible to have multiple views rendered on a single page - for the moment, we'll define the view to be the page.

* To create a view (or any other component), you'll create a class representing that view.
```javascript
// ui/src/views/journals/reverse/index.js

import JournalStore from 'stores/journals';
import React from 'react';
import View from 'carbon/lib/utils/view';

class JournalsReverse extends React.Component {

  render() {
    return (

    )
  }
};

export default View(JournalsReverse, JournalStore);
```
* N.B. If you've worked with React before, you may wonder why we're importing *View* into our view. We use a pattern called [Higher Order Components](https://github.com/Sage/carbon/blob/master/src/utils/view.js) to wrap together our view, our store and any additional functionality we want to provide.

* To build your view, you need to start adding components to the return block. Let's add a:
  *Form* containing a 
    - *Textbox* 
    - *Date*
    - *Table-Fields-For-Many* which contains 
      - 2 *Textbox* fields.

* Each component you wish to use in your view requires import into the view.
```javascript
// ui/src/views/journals/reverse/index.js

import JournalStore from 'stores/journals';
import React from 'react';
import View from 'carbon/lib/utils/view';

import Date from 'carbon/lib/components/date';
import Form from 'carbon/lib/components/form';
import Textbox from 'carbon/lib/components/textbox';
import TTFM from 'carbon/lib/components/table-fields-for-many';

class JournalsReverse extends React.Component {

  render() {
    return (

    )
  }
};

export default View(JournalsReverse, JournalStore);
```

* Carbon uses [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) syntax for building and using components.
Once you have imported the component into your view, you can render it as follows.
```javascript
// ui/src/views/journals/reverse/index.js

// ...import statements

class JournalsReverse extends React.Component {

  render() {
    /* Here we're defining what children components table-fields-for-many will 
    render. We can pack these children components into an array. */

    var tableFields = [<Textbox />,<Textbox />];

    return (
      <div>
        <Form>
          <Textbox />
          <Date />
          /* table-fields-for-many is a complex component that renders components 
          passed to it as children. */
          <TTFM />
        </Form >
      </div>
    )
  }
};

export default View(JournalsReverse, JournalStore);
```

* Carbon components use React *props* which allow you to pass data down to a component. Our components have a few required props which we'll add now.
```javascript
// ui/src/views/journals/reverse/index.js

// ...import statements

class JournalsReverse extends React.Component {

  render() {
    var tableFields = [<Textbox key='1' name='service' />
    ,<Textbox key='2' name='description' />];

    return (
      <div>
        <Form>
          <Textbox
            name="description"
            value={ this.props.data.get('description') }
            onChange={ JournalActions.journalValueUpdated }
          />
          <Date
            name='date'
            value={ this.props.data.get('date') }
            onChange={ JournalActions.journalValueUpdated }
          />
          <TTFM
            name='journal_lines'
            data={ this.props.data.get('journal_lines') }
            deleteRowHandler={ JournalActions.deleteJournalLineRow }
            addRowHandler={ JournalActions.updateJournalLineRow }
            fields={ tableFields }
            />
        </Form>
      </div>
    )
  }
};

export default View(JournalsReverse, JournalStore);
```
* Note that we just imported a new module called JournalActions which contains our Row Handler actions used by the table-fields-for-many component and onChange actions. We haven't created any actions yet, let's do so now.

### 6) Creating Actions for your view

Actions are essentially objects we use to pass data through our view. Read more about them [here](https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html#content)

Let's create the file and the actions we've called so far.

```javascript
//ui/src/actions/journal/index.js

import Dispatcher from 'dispatcher';

var JournalActions = {

  journalValueUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: 'journalValueUpdated',
      value: ev.target.value,
      name: props.name
    });
  },

  deleteJournalLineRow: (ev, props) => {
    Dispatcher.dispatch({
      actionType: 'deleteJournalLineRow',
      row_id: props.row_id
    });
  },

  updateJournalLineRow: (ev, props) => {
    Dispatcher.dispatch({
      actionType: 'updateJournalLineRow',
      row_id: props.row_id,
      name: props.name,
      value: ev.target.value
    });
  }
};

export default JournalActions;
```
* You can pass any data you want inside an action, the only requirement is to define an actionType. This is used to register the action with our Store (which we'll talk about soon).


### 7) Setting up React routes

* Carbon uses [React Router](https://github.com/rackt/react-router) to bind view components to specific paths. Before we can see anything on our page, we need to specify the route.

* Find *main.js* and udpate it to the following.

```javascript
//ui/src/main.js

import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'carbon/lib/utils/route';

import JournalsReverse from 'views/journals/reverse';

var routes = (
  <Route path="/journals/:id/reverse" component={ JournalsReverse } />
);

CarbonRoute(routes);
```
* Note that we've defined the path as the url, and the component to render as our view component

* You should now be able to navigate to your view. If you don't see anything, check that gulp is running and that it isn't reporting any syntax errors.

### 8) Setting up our Store

A [Store in React](https://facebook.github.io/flux/docs/overview.html#stores) holds all the information about the current state of our view. At the moment, our view is static and can't be updated. Even though we have added event handlers to our components, the events(or actions) haven't been registered with Store.

For our Rails app, the Store will also hold data fetched from the database, which it will then pass down to the components.

```javascript
// ui/src/stores/journals/index.js

import CarbonStore from 'carbon/lib/utils/store';
import Dispatcher from 'dispatcher';
import Immutable from 'immutable';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';

var _journal = ImmutableHelper.parseJSON(APPDATA.journal);

class JournalStore extends CarbonStore {

  journalValueUpdated = (action) => {
    this.data = this.data.set(action.name, action.value);
  }

  updateJournalLineRow = (action) => {
    this.data = ImmutableHelper.updateLineItem(
      [this.data, 'journal_lines', action.row_id, action.name], action.value
    );
  }

  deleteJournalLineRow = (action) => {
    this.data = ImmutableHelper.deleteLineItem(
      [this.data, 'journal_lines', action.row_id]
    );
  }
}

export default new JournalStore(Dispatcher, _journal);

```

* Our Store has assigned the parsed JSON data from our database to *_journal* and has registered our three actions. The Store is now listening for those actions- any time they are called in our view, the store will update the view. [Read more here](https://facebook.github.io/flux/docs/overview.html#structure-and-data-flow)

