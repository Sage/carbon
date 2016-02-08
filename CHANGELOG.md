# 0.3.0

## Breaking Change

* The `cancelHandler` method on `Dialog` based components has been renamed to `onCancel` to bring in line with the convention we would like to progress with for this kind of action name.

## Bug Fixes

* Dialog now centers itself if open on initialize.

# 0.2.0

## New Components

* Table, TableRow, TableCell, TableHeader
* Confirm
* Animated Menu Button
* Notification
* Pill
* Banner
* Flash

## Tables and Grids - Breaking Change

The previous iteration of grid (InputGrid) was too restrictive, not allowing much flexibility and being too rigid in its implementation. We have now refactored grids creating a Table component with full control and flexibility for the developer. The new way of doing grids also means we no longer need to use complicated immutable helpers we had set up for line items as well as injecting row_id into the store.

The following is an example of how to use the Table component:

```js
import React from 'react';
import { Table, TableRow, TableCell, TableHeader } from 'carbon/lib/components/table';
import Textbox from 'carbon/lib/components/textbox';
import Button from 'carbon/lib/components/button';

class MyView extends React.Component {
  render() {
    // We map the data from the store, to define what a row should look like.
    // Using map allows the developer to define any content they want - this could
    // render text, an input, a button or anything else.
    let tableRows = this.props.data.map((row, index) => {
      <TableRow>
        // This cell renders just text for 'description'.
        <TableCell>
          { row.get('description') }
        </TableCell>

        // This cell renders a textbox for 'name'. We also give it an onChange function. It is
        // important to notice that we bind additional values to this function - 'this' and 'index'.
        // This means that when the function is called it will receive the index as an argument.
        // The store then knows which index in the array of data has been modified and needs to update,
        // the mutation would look something like:
        // `this.data = this.data.setIn(['line_items', action.index, action.name], action.value);`.
        <TableCell>
          <Textbox value={ row.get('name') } onChange={ Actions.nameUpdated.bind(this, index) } />
        </TableCell>

        // This cell renders a button component.
        <TableCell>
          <Button>An Action!</Button>
        </TableCell>
      </TableRow>
    });

    // tableRows is now an array mapped from the data we provided. We also need a table header so
    // lets add that as an additional row in the array (unshift prepends to an array):
    tableRows.unshift(
      <TableRow>
        <TableHeader>Description</TableHeader>
        <TableHeader>Name</TableHeader>
        <TableHeader>Actions</TableHeader>
      </TableRow>
    );

    // We can now render the array of rows as a child of Table.
    return (
      <Table>
        { tableRows }
      </Table>
    );
  }
}

export default MyView
```

The example above should highlight the flexibility available with grids. You can mix input with plain text or any other component, all in the same table. Adding a placeholder row is simple as well:

```js
import React from 'react';
import { Table, TableRow, TableCell, TableHeader } from 'carbon/lib/components/table';
import Textbox from 'carbon/lib/components/textbox';

class MyView extends React.Component {
  render() {
    // Define tableRows.
    let tableRows = this.props.data.map((row, index) => {
      <TableRow>
        <TableCell>
          <Textbox name="description" value={ row.get('description') } onChange={ Actions.valueUpdated.bind(this, index) } />
        </TableCell>

        <TableCell>
          <Textbox name="name" value={ row.get('name') } onChange={ Actions.valueUpdated.bind(this, index) } />
        </TableCell>
      </TableRow>
    });

    // Add header.
    tableRows.unshift(
      <TableRow>
        <TableHeader>Description</TableHeader>
        <TableHeader>Name</TableHeader>
      </TableRow>
    );

    // Add placeholder row. The main difference between a regular row is we are not mapping any data to
    // this row (as it has none). Also, instead of an index, we are passing the data count to the bound
    // action. This means on valueUpdated that it will update the value in the array to an index which
    // does not yet exist - effectively creating the new row.
    tableRows.push(
      <TableRow>
        <TableCell>
          <Textbox name="description" onChange={ Actions.valueUpdated.bind(this, this.data.count()) } />
        </TableCell>

        <TableCell>
          <Textbox name="name" onChange={ Actions.valueUpdated.bind(this, this.data.count()) } />
        </TableCell>
      </TableRow>
    );

    // We can now render the array of rows as a child of Table.
    return (
      <Table>
        { tableRows }
      </Table>
    );
  }
}

export default MyView
```

## Minor

* Decrease width of dropdown icon to 20px

# 0.1.7

## Bug Fixes

* [CARBON-102](https://sageone.atlassian.net/browse/CARBON-102) - Fixes bug - 'item is undefined triggered when clicking away from dropdown with option highlighted'.

# 0.1.6

## Bug Fixes

* `startRouter` no longer throws an error if it cannot find an element to render the component to.

# 0.1.5

## Bug Fixes

* Dropdown will always return a string value to any callbacks.

# 0.1.4

## Bug Fixes

* Dropdown components auto select highlighted values on blur.
* Carbon now compiles code to `lib`, allowing developers to no longer require installing babel on their computer.

# 0.1.3

## Bug Fixes

* Fixes validation message width in Firefox.

# 0.1.2

## Bug Fixes

* Tabs can now render a single child

# 0.1.1

* Form submitting state is now controlled by the developer using the `saving` prop.

## Bug Fixes

* Developers can now set the alignment on an input's value using the `align` prop.
* Tab allows null children.

# 0.1.0

## New Components

* Alert
* Link
* Tabs

## Dialog Type Components

  Breaking Change! :warning: Both components now require a `cancelHandler` prop (rather than the `cancelDialogHandler`). :warning:

## Dropdowns

Dropdown components have been refactored. We now have three different kinds:

* Dropdown
* Dropdown Filter
* Dropdown Filter Ajax

## Inputs and Forms No Longer Rely on Name Property

In previous versions of Carbon, all inputs required a `name` property. Some Carbon components would manipulate what this name was, depending on where the input was used.

To keep things simple, and to remove some of the logic behind the scenes, we no longer do any manipulation on input names and the property is no longer a requirement when using a form input.

It is still recommended that you use names on inputs, as they are useful to identify your which input is which. They are also required if you are performing standing HTML form submissions.

## Minor

* Pod has an option to make it collapsible.

## Bug Fixes

* Fixes position and width or validation messages on inputs.
* Fixes re-validating fields when content is pasted into an input.

# 0.0.3

## Bug Fixes

* On successful submit, form components will disable their save buttons to prevent multiple form submissions.

# 0.0.2

## Decimal Component

 An extra validation has been added to decimal to prevent multiple separators from being entered in the input field.

## Dropdown and DropdownSuggest components

Dropdown and dropdown-suggest have been updated. As they share common functionality, dropdown and dropdown-suggest now use a List decorator. This should not affect how you use either component.
* Dropdown now filters results as you type.

## Dialog Cancel button

Dialogs have been updated to pass context to any children components. We have used this to switch the Form Cancel button to use the Dialog's cancel handler when the form is nested in a dialog. This overrides the default history.back method.

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
  ...
}

let data = ImmutableHelper.parseJSON({});

// init the store with a name, some data, and your dispatcher
export default new MyStore('myStore', data, Dispatcher);
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

## New Brand
A new style and colour scheme has been applied to the carbon components library. This change will affect all of the components.

## Validations
Validations have changed to a function so that different parameters can be passed to them.

You can now define Validations on a component using the following syntax:

```javascript
<Textbox validations={ [Validation()] } name='valid' />
```

## Misc

* Ran ESLint task and fixed any errors.
* Form provides a serialization method to parse its inputs into data usable for AJAX.
* Forms no longer needs a model name defined.
* Updated Form Cancel Button to use History object.
* Textarea is no longer draggable. Add a expandable={true} prop to make the area height change to fit content
* Input components can now use custom classes.
* Checkbox label now sits inline, and is reversable.
* Added props on inputs for inline labels.
* Added Rainbow chart component.
* Added Tabs component.
* Added Number component.
* Decimal now allows tabbing in and out of the field.
* Date now closes on tab out.


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
