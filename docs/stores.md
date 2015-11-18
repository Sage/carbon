# Basic Example

Carbon provides utilities to easily setup a Flux based application.

For a basic application, you need:

* A dispatcher.
* An action.
* A store.
* A component.
* A router.

A basic setup may look something like this:

## The Dispatcher

The dispatcher should be a singleton, and will handle dispatching any actions to any stores that are subscribed to it.

```js
// ./src/dispatcher/index.js

import Flux from 'flux';

// initialize the dispatcher (a singleton for your application)
var Dispatcher = new Flux.Dispatcher();

export default Dispatcher;
```

## An Action

The actions should describe an event in the application, they will use the dispatcher to dispatch the event along with any data the store may need to update its data.

```js
// ./src/actions/contact/index.js

import Dispatcher from 'dispatcher';

var ContactActions = {
  contactValueUpdated: (ev, props) => {
    // this should dispatch a completely unique actionType, as well as any data
    // the store should be aware of from the event that occurred (eg the input's value)
    Dispatcher.dispatch({
      actionType: 'contactValueUpdated',
      value: ev.target.value,
      name: props.name
    });
  }
};

export default ContactActions;
```

## The Store

The store handles the data for a particular model, it will define functions which subscribe to events dispatched by the dispatcher.

```js
// ./src/stores/contact/index.js

import Dispatcher from 'dispatcher';
import Store from 'carbon/lib/utils/flux/store';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';

class ContactStore extends Store {
  constructor(Dispatcher) {
    super(Dispatcher);

    // define the namespace for the store - this will be used by the component
    // to access the data in the store
    this.name = 'contactStore';

    // define the store's initial data (this should use Immutable.js)
    this.data = ImmutableHelper.parseJSON({});
  }

  // this function's name matches the action we defined, so will trigger when
  // the action is dispatched
  contactValueUpdated = (action) => {
    // we modify the data and update `this.data` to the new data (remember that
    // we are working with immutable data)
    this.data = this.data.set(action.name, action.value);
  }
}

// initialize the store (another singleton for your application)
export default new ContactStore(Dispatcher);
```

## A Component

The component will connect to a store, setting up listeners for when the stores data changes.

```js
// ./src/views/contact/index.js

import React from 'react';
import { connect } from 'carbon/lib/utils/flux';
import Textbox from 'carbon/lib/components/textbox';
import ContactStore from 'stores/contact';
import ContactActions from 'actions/contact';

class Contact extends React.Component {
  render() {
    // you can access the store's data using the previously defined namespace
    // (remember that this is an immutable data object)
    let name = this.state.contactStore.get('name');

    return (
      <div>
        <span>{ name }</span>
        <Textbox value={ name } onChange={ ContactActions.contactValueUpdated } />
      </div>
    );
  }
}

// connect the component to the store to give it access to the store's data and
// to automatically set up the listeners between them
export default connect(Contact, ContactStore);
```

## The Router

The router defines what component will render for a given route.

```js
// ./src/main.js

import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon/lib/utils/router';
import Contact from 'views/contact';

var routes = (
  <Route path="/contact" component={ Contact } />
);

// start the router with the given routes - it will render the component for
// the matching path on a element with an ID of `app`
startRouter(routes);
```
