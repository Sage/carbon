# A Basic Example

Carbon provides utilities to easily set up a [Flux](https://facebook.github.io/flux/) based application.

For a basic application, you need:

* A dispatcher
* Constants
* Actions
* Stores
* Components
* A router

The following sections show the basic code required for an application to function.

**Note:** You can use the [Carbon Factory](https://github.com/sage/carbon-factory) task to generate an application (`carbon app appname`) then refer to the following code to get a basic React/Flux application running.

## The dispatcher

The dispatcher should be a singleton and you only need to set it up once. It handles the dispatching of actions to the stores that are subscribed to it.

Carbon supplies a ready setup dispatcher for your application to use, available with:

```js
import { Dispatcher } from 'carbon-react/lib/utils/flux';
```

However, if you want to setup and manage your own dispatcher you can do so - please see the [Facebook Dispatcher documentation](https://facebook.github.io/flux/docs/dispatcher.html).

## Constants

Using constants helps organise your application and mitigates any conflicts. Each constant represents the name of an action and should be entirely unique.

```js
// ./src/constants/contact/index.js

export default {
  CONTACT_FIRST_NAME_UPDATED: 'contactFirstNameUpdated'
}
```

## An action

An action should describe an event in the application. It uses the dispatcher to dispatch the event along with any data the store may need to update its data.

```js
// ./src/actions/contact/index.js

import { Dispatcher } from 'carbon-react/lib/utils/flux';
import ContactConstants from 'constants/contact';

let ContactActions = {
  contactFirstNameUpdated: (ev, props) => {
    // this should dispatch the constant we defined, as well as any data the store
    // should be aware of from the event that occurred (eg the input's value)
    Dispatcher.dispatch({
      actionType: ContactConstants.CONTACT_FIRST_NAME_UPDATED,
      value: ev.target.value
    });
  }
};

export default ContactActions;
```

## The store

The store handles the data for a particular model. It defines functions which subscribe to events dispatched by the dispatcher.

```js
// ./src/stores/contact/index.js

import ContactConstants from 'constants/contact';
import Store from 'carbon-react/lib/utils/flux/store';
import ImmutableHelper from 'carbon-react/lib/utils/helpers/immutable';

// data to init your store with
let data = ImmutableHelper.parseJSON({
  example_property: true
});

class ContactStore extends Store {
  // we create a function that uses the constant we defined, this subscribes
  // the store to the this particular action so it will trigger when the
  // action is dispatched
  [ContactConstants.CONTACT_FIRST_NAME_UPDATED](action) {
    // we modify the data and update `this.data` to the new data (remember that
    // we are working with immutable data)
    this.data = this.data.set('first_name', action.value);
  }
}

// initialize the store (another singleton for your application), you need to
// initialize it with:
//  * the name - this will be used to access the store on the component
//  * the data - this is the stores initial data
export default new ContactStore('contactStore', data);
```

Please note, if you are using a custom dispatcher (not the one supplied by Carbon), you need to tell your stores to use it by passing it as an additional option:

```js
export default new ContactStore('contactStore', data, { dispatcher: CustomDispatcher });
```

## A component

The component connects to a store, setting up listeners for when the store's data changes.

```js
// ./src/views/contact/index.js

import React from 'react';
import { connect } from 'carbon-react/lib/utils/flux';
import Textbox from 'carbon-react/lib/components/textbox';
import ContactStore from 'stores/contact';
import ContactActions from 'actions/contact';

class Contact extends React.Component {
  render() {
    // you can access the store's data using the previously defined namespace
    // (remember that this is an immutable data object)
    let firstName = this.state.contactStore.get('first_name');

    return (
      <div>
        <h1>{ firstName }</h1>
        <Textbox name="first_name" value={ firstName } onChange={ ContactActions.contactFirstNameUpdated } />
      </div>
    );
  }
}

// connect the component to the store to give it access to the store's data and
// to automatically set up the listeners between them
export default connect(Contact, ContactStore);
```

## The router

The router defines which component to render for a given route.

```js
// ./src/main.js

import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon-react/lib/utils/router';
import Contact from 'views/contact';

let routes = (
  <Route path="/contact" component={ Contact } />
);

// start the router with the given routes - it will render the component for
// the matching path on a element with an ID of `app`
startRouter(routes);
```
