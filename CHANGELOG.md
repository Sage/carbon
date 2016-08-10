# 0.21.0

## New Icons

* Print
* Pdf
* Csv
* Message

## Minor Improvements

* Link now accepts tooltip props to apply a tooltip to the link. This can be used with the Action Toolbar to apply tooltips to the icon links.
* Input components now accept an onPaste prop.
* Add character count to textarea
* Form now accepts a `onSubmit` prop which is only called when the form is valid.
* AppWrapper now has a minimum width of 958px.
* SUG-19: Change padding for the MessageComponent when transparent and non dismissable. When transparent is applied the padding reduces to 2px, but if it's dismissable it enlarges to it's original to prevent overlap.
* allows `Link` component to handle `mailto:` as an href prefix, previously the `to:` would have been stripped from the string

# 0.20.0

## Breaking Changes

* The CSS for inputs and icons associated with inputs has changed. If you have overridden this CSS in you code, this may break your input CSS.

## New Components

* Heading - useful for page titles.
* ShowEditPod - Inline editing of fields
* Date Range - Allows start and end date setting with validation for invalid date combinations.

## History and Browser Status

The router's history object is now accessible:

```js
import { history } from 'carbon/lib/utils/router';
```

With the history object you can control the DOM for any UI that uses React Router. For more information see the guides https://github.com/ReactJSTraining/history/tree/master/docs

## Link Prefixes

The `Link` component can now have its `href` or `to` props prefixed to customise the type of link it is (regular or react router).

For example:

```js
<Link href="to:/foobar">My React Router Link</Link>
```

## Router transitions

* The window will automatically scroll to the top when the route is transitioned

## Red and Green Buttons

The `Button` component can now have red and green themes, set using the `as` prop.

## New Icons

* Information
* Sync
* Progress
* Submitted
* Completed

## Minor Changes

* A Sass variable has been introduced to define the path where fonts are located.
* Pod title size has been reduced to more accurately match the demo.
* Secondary Content components font weight has been standardised.
* The `children` prop for the Help component is no longer required.
* Sibling Content components now have a top margin for spacing.
* Button height has been fixed for buttons that behave like links.
* Adds inline help for radio button.
* Fixes inline help for checkboxes.
* Radio Button sprite has been given a fixed size.
* Increase textTag font-spacing from 0.5 to 0.8.
* Button can receive a prop of `to`.
* Fixes fieldset and input margin when rendered on top of one another.
* Fixes position of icon in dropdown button.
* Fixes error icon position for inputs with field help.
* AppWrapper has been increased to 1600px and some padding has been added.
* Form now accepts a prop of `save` which can be used to hide the save button.

# 0.19.0

## Major Changes

!! Babel upgraded to Version 6
* When updating the latest version it is recommend to remove node modules `rm -rf node_modules` and reinstall `npm install`

!! Phantom JS Upgraded to version 2
* This may cause a few tests that were giving false positives to fail

## New Components

* Profile - User to show portrait with name and email.
* AppWrapper - confines your content to the width of your application.
* Menu
* NavigationBar

## Input Label Padding

* All input label padding has been slightly increased.

## Help Updates

* Help component has been updated with a new icon.
* Input Label decorator has been fixed to render the help class for labelHelp.

## Acronymize Function

* We have added an `acronymize` function to the Ether util, which will create an acronym from a given string.

## Dropdown component updates

* All dropdowns now allow keying up and down through the list

## Polling helper

* A polling helper has been added that performs customizable ajax polling.

## New Icons

* Help
* Chevron

# 0.18.1

## Minor Changes

* Portrait extra small size has been changed from `20px` to `25px`.
* Portrait can have a dark background.
* Fixes issue with Portrait size when image would not render.
* Disabled Pill's colours have been updated.
* Individual and Business SVGs have been updated in Icon.

# 0.18.0

## !! BREAKING CHANGE !!

* Renamed Browser `redirectUrl` method to `redirectTo`

## New Components

* Fieldset - stacks inputs rendered as children to the `Fieldset` component.
* Carousel - can be used to display a gallery of slides.

## CSS Module Update

Added margin and padding `0` to the base CSS.

## Uniform Sizing

All components that take a Size Prop have been unified to accept the following

```
extra-small
small
medium-small
medium
medium-large
large
extra-large
```

If you are using the default size of a component there is no change needed except for the `Spinner`

### Component Breakdown

#### Animated Menu Button
  * Added `extra-small`
  * !! CHANGED - `smed to `medium-small`
  * !! CHANGED - `mlarge` to `medium-large`
  * Added `xlarge`

#### Portrait
  * Added `extra-small`
  * !! CHANGED - `smed to `medium-small`
  * Added `medium`
  * !! CHANGED - `mlarge` to `medium-large`
  * Added `xlarge`

#### Spinner
  * !! CHANGED - default is now `medium`

  * Added `extra-small`
  * !! CHANGED - `smed to `medium-small`
  * Added `medium`
  * !! CHANGED - `mlarge` to `medium-large`
  * Added `xlarge`

#### Dialog
  * !! CHANGED - `xsmall` to `extra-small`
  * !! CHANGED - `smed to `medium-small`
  * !! CHANGED - `med` to `medium`
  * !! CHANGED - `mlarge` to `medium-large`
  * Added `xlarge`

## Link (React Router)

Our Link component now supports the React Router. Instead of passing a `href` prop, pass a `to` prop and it will use React Router to navigate.

## Pod Updates

* Pod can now receive a prop of `onEdit` - if this is a String it will use it as a `to` prop on a Link component, if it is a Function it will apply it as an `onClick` handler, if it is an object it will apply it's props to the Link.
* Pod has an additional padding size added of `extra-large`.
* Pod now applies any additional props to it's top most child element.
* We have added a tertiary pod theme.

## Content Updates

Content now has a `secondary` theme which can be applied using the `as` prop.

## Label Updates

* You can supply a `input-width` prop to any input to define its width.

## Modal Updates

### Change in functionality!

Modal

  * Modal no longer closes on background click
  * New prop `disableEscKey` is defaulted to false
  * Changes will also effect Dialog, Sidebar etc...

Dialog

  * New props `showCloseIcon` (defaulted to true) which show and hides the close icon

## Promises

Promises Polyfill. Carbon now contains a ES6 Promises helper which can be imported by

```javascript
  import from 'carbon/lib/utils/promises';
```

## Notifications Updates

Message

  * New props `transparent` (defaulted to false) which if set to true sets the background to transparent

## Decimal

* Decimal can now receive a prop of precision

## Split Button

 * Small CSS change to remove gap in Safari

## Input Validation

* Validation icons now position themselves relative to width of input field when label is inline.

# 0.17.1

## Minor Improvements

* Add paperclip SVG to Icon

# 0.17.0

## New Components

* Multi Step Wizard

## Minor Improvements

* Add edit SVG to Icon
* Supports Ajax call for error validation

# 0.16.1

* Add reload function to browser helper

# 0.16.0

## Minor Improvements

* Adding user class names to tabs.
* Authorize Objects in dialog title

## Browser Helper

Added a redirect action made by the browser. It is now easier to redirect to url

```
import Browser from 'carbon/lib/utils/helpers/browser';

Browser.redirectUrl(url)
```

# 0.15.0

## New Components

* ButtonToggle.

## New Features

* Warnings are now ready to use on form inputs, using the same API as validations you can supply an array as a prop to an input:

```
<Textbox warnings={[ new MyWarning ]} />
```

## Bug Fixes

* CSS fixes to input error icon and error message.
* CSS fixes to input placeholder text for IE11.

# 0.14.4

## Bug Fixes

* Fixes no results row in Table to span all columns.
* Fixes issue in Tabs where initialSelectedTabId was ignored

# 0.14.3

## Bug Fixes

* Fixes a loading row in Table to span all columns.

# 0.14.2

## Minor Changes

* Disable multi select for single row in a table

# 0.14.1

## Minor Changes

* Add ability to set custom labels on Confirm dialog.
* Fixes scrollbar fixed height.
* Fixes word break on tooltips.

# 0.14.0

## !! BREAKING CHANGE !!

* Selectable table rows now emit an object instead of an array, containing more information about the selected rows.

## Minor Changes

* Sidebar now scrolls on overflow
* Adds `$app-light-font-family` Sass variable.
* Adds `$app-medium-font-family` Sass variable.
* Icons - plus, minus, processing. Update contact icons
* Improve tile footer style

# 0.13.0

* A developer can choose for a Table to not automatically render with a `tbody`, allowing them to manually render it `<Table tbody={ false }>`.
* Performance improvements for validation messages.
* Inputs can be rendered with fake inputs, useful for pages with lots of inputs where performance can be an issue.
* Number does not show undefined when value props is not provided and user enter alphabets
* Adds external link icon.
* Adds new colors: `$grey-dark-blue-5`, `$grey-header`.

# 0.12.2

* Stores will now throw an error if an invalid action is dispatched.
* Fixes translation issues with Save and Cancel buttons in Form component.
* Fixes error with refresh method on Table, when Table does not have an ActionToolbar.
* Adds `business` and `individual` icons.

### Modal Updates

* Alert and Confirm have been updated to accept the dialog size prop. Default sizes remain unchanged.

# 0.12.1

* Fixes overflow bug on Table component.
* Fixes colors for recently added icons.

# 0.12.0

## Minor Improvements

* Tabs emits a onTabClick event when on the headers is clicked
* Add phone, email, location and mobile icons
* Table now has a `refresh` method to force retrieve data.

## Bug Fixes

* CSS prevent multi action siblings overlapping
* First columns in tables have additional left padding.
* Page size sets 1 of 1 when there are no records.

# 0.11.0

* Tabs remember the last one they were on when going back in the browser.

## Bug Fixes

* Selectable Tables stopPropagation when selecting checkboxes.

# 0.10.0

* Adds loading and empty data states to Table component.

## Bug Fixes

* CSS fixes to Portrait.
* CSS fixes to Spinner.
* CSS fixes to Pill.

# 0.9.2

* MulitActionButton Classes more specific

# 0.9.1

## Bug Fixes

* Various UI Fixes:
  * MultiActionButton toggle placement.
  * Removed Tab padding.
  * Fixed Button height to 31px.

# 0.9.0

## New Components

* Multi Action Button

## Selectable Table Rows

* Table and TableAjax now have props of `selectable` and `highlightable`, enabling selectable or highlightable rows. Each event also emits events which can be used by developers with props of `onSelect` or `onHighlight`. Developers can also manually control the highlighting or selecting of rows using the same props on TableRow components.
* Selectable rows also enables an action toolbar for the table, for which actions can be defined using the `actions` prop.

## CSS

* Created CSS utility to handle generic CSS.

## Misc

* Inline labels can now be aligned right.
* Added 'small' button option - renders pill-like secondary button.
* Made portrait inline-block to allow label to sit inline.
* Added a 'refresh' svg icon to the icon component.
* Form component can now set custom `saveText` as a prop.
* Pill styling tweaked slightly.
* Made portrait inline-block to allow label to sit inline.
* Updated portrait colour for when no image is loaded.
* Update Radio Button and Checkbox colour when disabled and checked.

## Bug Fixes
* Allow tooltip to decorate class that lacks componentProps method.
* Records value typecast to number for i18n in Pager

# 0.8.1

## Bug Fixes

* Fixed CSS load order issue which caused icons to break their positioning.

# 0.8.0

## Improvements

* Improved store reset. `store.reset()` will now reset the store to its initial data, whether or not history is enabled.
* Inputs can now have field help. Pass `fieldHelp='help message'` to any input.
* Inputs can now have label help. Pass `labelHelp='help message'` to any input.
* Add `thead` prop to `Table` component that allows you to set a row wrapped in a `thead` tag.

## New Components

* Sidebar - with sidebar header
* Portrait
* Content
* Help - An info icon with a tooltip.
* Tooltip

## Layout Updates

* Row margin has been reduced to `15px`.
* Pod component now receives two additional props:

  * `border` - allows developers to disable border.
  * `padding` - allows developers to have control over padding size.

* Message style has changed to follow toast style
* Pill style has changed

## Improved Dialog

* Dialog now takes a prop of `disableBackground` which is true by default.

## Improved Form

* `validate()` can now be called via `this.context.form`

## New Validators

* Inclusion
* Exclusion

## Misc

* Added utility classes for styling text.
* Format i18n error number for numeric validation.
* Allow Tables to shrink in size using the `shrink` prop.
* Link component can now display with an icon.
* Child components of Row can now use a `columnAlign` prop.
* Toast onDismiss is now optional

## New Decorators

* Tooltip Decorator - currently available on Icon and Textbox.

## Bug Fixes

* Fixes alignment issue with SplitButton when using anchors.
* Row component will not break with zero children or children of `null` or `undefined`.

# 0.7.1

## Updates

* Moves the validation logic in Form component to its own method.
* Adds `validateOnMount` prop to Forms.
* Help Components on inputs with labels.

# 0.7.0

## New Components

* Pager
* Filter
* Table Ajax

## Bug Fixes

* TableCell and TableHeader can receive additional props.
* Inputs no longer render a label if the input has no name or label props.

## New functionality

* Table and TableHeader have been updated to allow sorting.
* Tabs - Passing a prop of align='right' will align tab headers to the right

# 0.6.0

## Improve Date widget

Improve the existing Date widget to allow passing in `minDate` and `maxDate`.

## I18nHelper

An I18nHelper has been created to help with formatting decimal numbers.

## Should Component Update Decorator

Supplies base shouldComponentUpdate

## toArray

We have added a helper method to convert strings into arrays, for example:

`"foo[bar][baz]"` into `["foo", "bar", "baz"]`.

## ImmutableHelper parseJSON

The parseJSON method now converts all integers to strings for consistency

## Bug Fixes

* We have inserted an engine dependency for npm version 3. This is to help mitigate any issues of users reporting issues when installing with npm version 2.

## New Components

* Spinner
* RadioButton

# 0.5.3

## Bug Fixes

* Fixed numeral validator so it returns the correct type of validator.

# 0.5.2

## Bug Fixes

* Fixed I18n translation for integer validation.

# 0.5.1

## Bug Fixes

* `autoFocus` no longer automatically opens lists or datepickers on Dropdown and Date components.
* Update validations i18n to use `errors.messages` instead of `validations`
* Bluring of DropdownFilter/DropdownFilterAjax does not throw a js error when no items exist

# 0.5.0

## !BREAKING CHANGE! Validations have been converted into classes

We have converted Validations provided by Carbon into classes. This means that you need to create an instance when you want to use them.

For example, you would need to change:

```js
<Textbox validations={ [PresenceValidator()] } />
```

To this:

```js
<Textbox validations={ [new PresenceValidator()] } />
```

This allows better inspection of the validator, and the ability to modify params on the class.

## Disabled class for inputs

We now add a `common-input--disabled` class to the component when its input is disabled

## Bug Fixes

* Inputs with multiple validations now validate correctly.
* DropdownFilter now parses its filter before creating a Regular Expression.
* Split Button has been given a fixed height to resolve UI issues.
* Dropdown up and down arrows now work with options that use strings for IDs.
* We now use the `$grey-dark-blue-40` color for placeholders in inputs

# 0.4.0

## New Components

* SplitButton.

## New Validations

### Numeral Validation

Checks numeral type (Integer of Decimal)
Checks if value is equal, greater than, less than

```javascript
// Integer with a min value of 8
<Number validations={ [NumeralValidator({ integer: true, min: 8 })] }/>

// Decimal with a between 8 and 20
<Number validations={ [NumeralValidator({ integer: true, min: 8, max: 20 })] }/>

// Decimal exactly 3.142
<Number validations={ [NumeralValidator({ is: 3.142 })] }/>
```

### Length Validation

Checks the length of a number of a string

```javascript
// length is greater than or equal to 8:
<Textbox validations={ [ LengthValidator({ min: 8 }) ] });

// length is less than or equal to 8:
<Textbox validations={ [ LengthValidator({ max: 8 }) ] });

// length is between 5 and 10 characters:
<Number validations={ [ LengthValidator({ min: 5, max: 10 }) ] });

// length is 10 characters:
<Number validations={ [ LengthValidator({ is: 10 }) ] });
```

### Regex Validation

Applies a regex validation to the input

```javascript
<Textbox validations={ [RegexValidator({ format: (/[A-Z]{5}/) }) ] }/>
```

### Email Validation

Applies a email validation to the input

```javascript
<Textbox validations={ [ EmailValidator() ] }/>
```

## Prefix for inputs

We have added a new feature for input components which allows developers to output a prefix to the input.

```js
<Textbox prefix="foo" />
```

## Updated visuals for Toast Notifications and Tabs

* Toast notifications have had updated styling applied to them, based on new designs.
* Colour updates to Tabs, to align with design updates
* New colour variables added

## Misc

* Button component will now render a stylised `anchor` instead of a `button` if passed a `href` prop.

## Bug Fixes

* Add i18n to form buttons

# 0.3.3

* Performance updates to inputs. We also now provide a `shouldComponentUpdate` method which can be reused in custom components.
* Inputs that are detached from a form no longer update error count.

# 0.3.2

## Bug Fixes

* Form no longer validates disabled fields on submit.
* Form inputs are tracked by a guid now, rather than input name.
* Autocomplete is disabled for all inputs by default.
* Locks version numbers to try and mitigate incompatabilities with third party modules.

# 0.3.1

## Bug Fixes

* SVG icons inside toast component now re-render properly.

# 0.3.0

## Handler Pattern

Carbon now has a simple handler pattern implementation. For more information, see [the guide](https://github.com/Sage/carbon/blob/master/docs/guides/handlers.md).

## New Components

* Toast
* Message

## Standardised Color/Icon Sets on Components

Several components allow the ability to define a particular `type` or `status`, such as `warning`, `error` or `success`. We have standardised the way this is implemented in components, each of which should use a prop name of `as`.

Similarly, each supported type comes as part of a Sass list variable called `$colorIconSets`. This list can be used in component `scss` files to iterate through the types available and automatically generate the code required for each type. This means each component will automatically update with any new types added to this list.

You can see examples of how this is implemented in the `scss` files for `Pill`, `Flash`, `Banner` or `Toast`.

### Breaking Changes

* Due to the standardisation of using the prop `as`, some components will have breaking changes to accomodate this:
  * Flash
  * Pill
* The `cancelHandler` method on `Dialog` based components has been renamed to `onCancel` to bring in line with the convention we would like to progress with for this kind of action name.
* The `confirmHandler` method on `Confirm` has also been renamed to `onConfirm` to align with the naming convention.

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

# 0.1.8

## Bug Fixes

* Backported dropdown validation fix.

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
