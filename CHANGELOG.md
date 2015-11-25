# 0.0.2.beta

## Store, View and Route Utils

We have standardised the utilities we provide to easily set up Flux based applications. This involved a few breaking changes:

### Store

The base Store class is now available from:

```js
import Store from 'carbon/lib/utils/flux/store';
```

When creating your store, initialize it with your application's dispatcher. You must also define the store's data and unique name within its constructor. The following shows the minimum required to set up a store:

```js
import Store from 'carbon/lib/utils/flux/store';
import Dispatcher from 'dispatcher';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';

class MyStore extends Store {
  constructor(Dispatcher) {
    super(Dispatcher);

    // this is required for the store to work (it should be a unique name)
    this.name = "myStore";

    // this is required for the store to work
    this.data = ImmutableHelper.parseJSON(APPDATA.mydata);
  }

  // Component Actions...
}

export default new MyStore(Dispatcher);
```

### View

The view helper is now available as a flux utility from Carbon. This was done to clarify its intentions. You can import it with:


```js
import { connect } from 'carbon/lib/utils/flux';
```

You can then use the `connect` function to connect a React component to a store:

```js
import React from 'react';
import MyStore from 'stores/my-store';
import { connect } from 'carbon/lib/utils/flux';

class MyComponent extends React.Component {
  render() {
    // the connected store data is available on the state as the store's unique name defined in its constructor
    let val = this.state.myStore.get('myValue');

    return (
      <div>My Component.</div>
    );
  }
}

export default connect(MyComponent, MyStore);
```

This sets up the listeners and data synchronising between the component and the store.

The connect function can connect multiple stores to the component - simply provide them as an array:

```js
connect(MyComponent, [MyStore, MyOtherStore]);
```

### Route

The route helper now returns a specific function:

```js
import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon/lib/utils/router';

let routes = (
  <Route />
);

startRouter(routes);
```

The `startRouter` function initializes the React router with the given routes. It can also take a second parameter for the HTML target in which to render the React components (by default this uses `document.getElementById('app')`).

## Higher Order Components and Decorators

We now use decorators instead of Higher Order Components in our component library as they are easier to test and result in a tidier and more logical codebase.

Decorators can be found in the `/utils/decorators` directory. So far we have decorators for:

* Input
* Input Icon
* Input Label
* Input Validation

Note: although there is an ES7 Babel transform for decorators, we have opted not to use it for now due to the way in which it compiles and produces missing coverage reports.

## TableFieldsForMany renamed

`TableFieldsForMany` is now called `InputGrid`.

We have renamed this because its original name was based on a Rails convention and was fairly obscure and confusing.

## Misc

* Ran ESLint task and fixed any errors.
* Updated Form Cancel Button to use History object.
* Added Rainbow chart component.

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
