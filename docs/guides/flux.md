# Flux

While React is used for building components and views, [Flux](https://facebook.github.io/flux/) handles controlling, transforming and delivering the data between the components.

It is important to understand that Flux is not a part of React, it is an architecture for how we can handle our data and could work with any number of frameworks. This guide will not go into detail of how Flux works, as there should be plenty of information for that available online. Instead, we will explain the Flux utilities provided with Carbon.

## The Components

Components provided by Carbon are not tied to Flux, they are just regular React components. You can use any state container supported by React, such as Redux.

## The Dispatcher

Although Flux is not a framework, Facebook do provide a dispatcher we can use. Carbon supplies one of these dispatchers already setup and ready to use:

```js
import { Dispatcher } from 'carbon-react/lib/utils/flux';
```

The dispatcher is a singleton, meaning that there is only one instance of it used across an entire application.

## Creating a Store

Carbon provides a base class for creating a store. This should be used to extend your own store in your application:

```js
import Store from 'carbon-react/lib/utils/flux/store';
import ImmutableHelper from 'carbon-react/lib/utils/helpers/immutable';

// define your initial data using immutable.js
let data = ImmutableHelper.parseJSON({});

// your store!
class UserStore extends Store {}

// initialize your store here, so there is only ever one instance of it
export defaults new UserStore('userStore', data);
```

The store should also be a singleton, so you should make sure you initialize it within the same file that you define it.

The store has a few requirements for it to function correctly:

* You should initialize your store with a name, this is the key that will be used to access the store in your React component.
* You should initialize your store with data, this is the initial payload of data that your store will use. This could either be from an AJAX request, from a variable on the DOM or even hardcoded JSON.

### Subscribing to Events

So your store is setup, you now need it to subscribe to events that are published by the application's Dispatcher.

Let's create a quick Flux constant and action that will dispatch an event:

```js
export default {
  USER_VALUE_UPDATED: 'userValueUpdated'
}
```

The constant defines a unique name within your application that will be used to emit a particular event. You can then use the constant in your action to dispatch the event:

```js
import { Dispatcher } from 'carbon-react/lib/utils/flux';
import UserConstants from 'constants/user';

let UserActions = {
  userValueUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: UserConstants.USER_VALUE_UPDATED,
      value: ev.target.value,
      name: props.name
    })
  }
};
```

The action defined expects to receive two arguments: `ev` (the event) and `props`. All inputs in Carbon emit at least these two arguments as part of their `onChange` events.

From `props`, you can get the input name to know which input has changed, so when we dispatch this action we can tell the store the input's name and the input's new value.

So now you can update the store to subscribe to this event by using the same constant:

```js
import Store from 'carbon-react/lib/utils/flux/store';
import ImmutableHelper from 'carbon-react/lib/utils/helpers/immutable';
import UserConstants from 'constants/user';

let data = ImmutableHelper.parseJSON({});

class User extends Store {
  // define a function on the store class using the constant
  [UserConstants.USER_VALUE_UPDATED](action) {
    this.data = this.data.set(action.name, action.value);
  }
}

export defaults new MyStore('userStore', data);
```

Your new function updates the store's data using the input name and value sent by the action.

So you now have an action called `userValueUpdated`, which when called dispatches an event called `USER_VALUE_UPDATED`. The store is subscribed to this event and will update it's data whenever it is dispatched.

### Connecting a React Component to the Flux Store

The store is now updating it's data - but you have no React components connected to the store! Lets set one up:

```js
import React from 'react';
import connect from 'utils/flux/connect';
import Textbox from 'carbon-react/lib/components/textbox';
import UserStore from 'stores/user';
import UserActions from 'actions/user';

const UserView = props => (
  <Textbox
    name="foobar"
    value={ props.foobar }
    onChange={ UserActions.userValueUpdated }
  />
);

// connect the view component to the store
export default connect(UserStore, (userState) => ({
  foobar: userState.get('foobar')
}))(UserView);
```

At the core of it, this is just a React component. The component renders a Carbon Textbox and gives it a name.

However, on the last few lines it calls a connect function (provided by Carbon) to connect the component with the store. This function sets up event listeners for when the store is updated - when it detects a change in the store it will update the component with the new data through props.

Through this connection, you can set the Textbox's value to use the value from the store. You can also set the `onChange` event to trigger the action defined earlier - completing the Flux loop!

## Differences from Flux

Carbon attempts to do as much of the Flux setup for you as possible - however there is not a lot to it. We recommend you familiarise yourself with these two files in Carbon:

* [The `connect` function](https://github.com/Sage/carbon/blob/master/src/utils/flux/flux.js)
* [The base Store class](https://github.com/Sage/carbon/blob/master/src/utils/flux/store/store.js)

This implementation does not stray far from the recommended setup from [Flux examples](https://facebook.github.io/flux/docs/todo-list.html). The only notable difference is how an action is triggered on the store.

Many of the example demonstrate a `switch`/`case` block. With Carbon, we check each registered store to see if there is a corresponding function that matches the dispatched action type. If it finds one, it calls it (see the `dispatcherCallback` function in the [base store class](https://github.com/Sage/carbon/blob/master/src/utils/flux/store/store.js)).
