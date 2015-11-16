# 0.0.2.beta

## Store, View and Route Utils

We have standardised the utilities we provide to easily setup Flux based applications. This involved a few breaking changes:

### Store

The base store class is now available from:

```js
import Store from 'carbon/lib/utils/flux/store';
```

When creating your store, initialize it with your application's dispatcher. You also need to define the store's data within it's constructor. The following shows the minimum required to setup a store:

```js
import Store from 'carbon/lib/utils/flux/store';
import Dispatcher from 'dispatcher';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';

class MyStore extends Store {
  constructor(Dispatcher) {
    super(Dispatcher);

    // this is required for the store to work
    this.data = ImmutableHelper.parseJSON(APPDATA.mydata);
  }
}

export default new MyStore(Dispatcher);
```

### View

The view helper is now available as a flux utility from Carbon. This was done to clarify it's intentions. You can import it with:


```js
import { connect } from 'carbon/lib/utils/flux';
```

The `connect` function can then be used to connect a React component to a store:

```js
import React from 'react';
import MyStore from 'stores/my-store';
import { connect } from 'carbon/lib/utils/flux';

class MyComponent extends React.Component {
  render() {
    // the connected store data is available on the state as the store's class name
    var val = this.state.MyStore.get('myValue');

    return (
      <div>My Component.</div>
    );
  }
}

export default connect(MyComponent, MyStore);
```

This sets up the listeners and data synchronising between the component and the store. The connect function can connect multiple stores to the component, simply provide them as an array, for example `connect(MyComponent, [MyStore, MyOtherStore]);`.

### Route

The route helper has been modified to return a specific function:

```js
import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon/lib/utils/router';

var routes = (
  <Route />
);

startRouter(routes);
```

The `startRouter` function initializes the react router with the given routes. It can also take a second parameter for the HTML target in which to render the React components (by default this uses `document.getElementById('app')`).

## Higher Order Components and Decorators

We have removed the use of Higher Order Components with our component library. We have instead adopted the use of decorators as they are easier to test and result in a tidier and more logical codebase.

Decorators can now be found in the `/utils/decorators` directory. So far we have decorators for:

* Input
* Input Icon
* Input Label
* Input Validation

## Misc

* Ran ESLint task and fixed any errors.
* Updated Form Cancel Button to use History object

# 0.0.1

Initial prototype release.

Components included:

* Button
* Checkbox
* Date
* Decimal
* Dialog
* Dropdown Suggest
* Dropdown
* Form
* Pod
* Row
* Table Fields for Many
* Table Row
* Textarea
* Textbox

Utils included:

* Events Helper (to help determine keyboard events)
* Immutable Helper (to perform generic tasks with Immutable.js)
* Icons (to include icons from the web font)
* Inputs & Input Validation (generic functionality for inputs)
* Validations (reusable functionality for validations)
* Route Helper (component to provide base route functionality)
* Store Helper (base class for base store functionality)
* View Helper (component to provide base view functionality)
