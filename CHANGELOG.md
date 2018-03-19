# 3.2.0

## Preview Component

Preview adds a CSS shimer animation as a placeholder if no children are given or the loading prop is true.

### Example Code

With no children:

```
<Preview>
  { null }
</Preview>
```

Using the `loading` prop:

```
<Preview loading>
  { children }
</Preview>
```

## Bug Fixes

* `AnimatedMenuButton`, `Carousel`, `Flash`, `ShowEditPod`, `Table`, and `Toast` all pass the `component='div'` prop to their respective `CSSTransitionGroup` components. This fixes incorrectly nested HTML e.g. `<div>` tags nested within `<span>` tags.

## Demo Site

Tutorials are now numbered correctly in the Carbon Demo sidebar.

# 3.1.2

Fixes auto-deployment of tags using Travis CI.

# 3.1.1

## Improvements

A unique ID has been added to the Portal component entrance and exit nodes. This will help find corresponding nodes in the DOM.

# 3.1.0

## AutoDisabling form

Form autoDisables after submit when the prop `autoDisable` is set to true. The props `afterFormValidation` and `onSubmit` are passed a `enableForm` callback function which can be used to reactivate the form.

### Example Code
  ```
  <Form
    onSubmit={ this.saveContact }
    autoDisable
  >
    {children}
  </Form>
  ```

  ```
  saveContact = (ev, valid, enableForm) => {
    ...
    Actions.submitForm(...);
    enableForm();
  };
  ```

## Improvements

* Input has 2 new props. `onChangeDeferred` allows a deferred callback after an onChange event. `deferTimeout` allows you to customise the default: `750`.
* Form has 1 new prop. `unsavedWarning` allows a confirmation popup to appear when the user attempts to navigate away from a form they have edited but not saved. True by default. Does not trigger on React Router page transitions. Does not consistantly trigger with browser back/forwards actions. To be reviewed when react-router is upgraded to v4 to use Prompts.

## Portals

* Modal components now uses the Portal component
* Input validation tooltips now use the Portal component
* `Toast` component now uses the Portal component
* `Dropdown` component now uses the Portal component

## Bug Fixes

* `mapToProps` takes precedence over props passed to HOC in `connect` function.
* `inputs` border-color change `:hover` is now applied to input rather than input container
* `Store`: sets the `maxListeners` to handle more complex store arrangements

## Changes

* Resolved new ESLint errors from carbon-factory upgrade.

## Demo Site

* Add a `key` to the top-level `MenuListItem` components in the sidebar, which removes the 'Each child in an array or iterator should have a unique "key" prop' warning.

# 3.0.0

## Package Updates

* React has been updated to v16.2.0
* React-DOM has been updated to v16.2.0 for React upgrade
* Enzyme has been updated to v3.3.0 for React upgrade
* Raf has been added at v3.4.0 for React upgrade
* ReactTestRenderer has been updated to v16.2.0 for React upgrade
* React-Highcharts has been updated to v15.0.0 for React upgrade
* React-Transition-Group has been updated to v1.2.1 for React upgrade
* ReactHighlight has been updated to a forked version which works with React v16
* React-Addons-Perf has been removed due to deprecation
* React-Addons-Test-Utils has been removed due to deprecation

## Breaking Changes

### Unstable HandleError

React 15 had limited, undocumented support for error boundaries using `unstable_handleError`. This method has been renamed to `componentDidCatch`.

### Decimal Precision Capped at 20

Previously this would return an error if the given precision was higher than 20 but would not actually enforce the limit. Now, if a value of greater than 20 is set the precision will be set to exactly 20.

### ReactDOM methods

`ReactDOM.render` and `ReactDOM.unstable_renderSubtreeIntoContainer`now return null if called from inside a lifecycle method. To work around this, you can use portals or refs.

### setState

Calling `setState` with null no longer triggers an update. This allows you to decide in an updater function if you want to re-render.

Calling `setState` directly in render always causes an update. This was not previously the case. Regardless, you should not be calling `setState` from render.

`setState` callbacks (second argument) now fire immediately after `componentDidMount` / `componentDidUpdate` instead of after all components have rendered.

### Enzyme

Part of updating react from 15.6.0 to 16.2.0 included also updating enzyme to 3.3.0. https://github.com/airbnb/enzyme/blob/enzyme%403.3.0/docs/guides/migration-from-2-to-3.md

#### Upgrading a project that uses Carbon

##### Installing peer dependencies

If you're upgrading an application that uses Carbon to 3.0.0 you'll need to make sure you have `raf` in your project's dependencies. To add `raf` to your project dependencies run the following command:

```
npm install raf --save-dev
```

You'll also need to add the following line to your jest.conf.json:
```
  "setupFiles": [
    "raf/polyfill"
  ]
```

##### Upgrading Carbon and using the new Carbon dependencies

To Install the latest Carbon:

```
npm install --save carbon-react@3.0.0
```

### React-Addons

React has discontinued support for all react-addons, the latest version of each addon should continue to work (except react-addons-perf).
`React.createClass` is deprecated and `create-react-class` should be used instead
`React.PropTypes` is now available as `prop-types`
`React.DOM` is now available as `react-dom-factories`
`react-addons-test-utils` is now available as `react-dom/test-utils`

### React and React Dom

Both `react` and `react-dom` will need to be updated to version 16.2.0

```
npm install react@^16.2.0 react-dom@^16.2.0 --save
```

### Hydrate Deprecation

Hydrating a server-rendered container now has an explicit API. If you’re reviving server-rendered HTML, use `ReactDOM.hydrate` instead of `ReactDOM.render`. Keep using `ReactDOM.render` if you’re just doing client-side rendering.

## React Portal

We have updated the `Portal` component to use React's own version of portal which is available with React 16, removing the `react-portal` dependency.
`Portal` now has an additional prop `onReposition` which is an optional callback function, called when the window resizes or a parent DOM element is scrolled.

## Bug Fixes

* Checkbox no longer overlays the end of the Help field text when the reverse prop is set to true
* `Date`: Previously this component would not retain an invalid date value, we now keep the value and throw a validation error on the input.
* The DatePicker element will now reposition itself when the DateInput is scrolled.

# 2.6.4

* Upgrade marked package from v0.3.6 to 0.3.9 to address security vulnerabilities

# 2.6.3

## Bug Fixes

* `acronymize`: This helper function provided in `/utils/ether` now checks for invalid strings to mitigate errors.

# 2.6.2

## Bug Fixes

* `Menu`: Fixes cursor type when hovering a top level menu item.

# 2.6.1

## Bug Fixes

* `Portrait`: fixes incorrect text colour in light mode. Also standardises the colours used for the icon and initials.
* `Message`: Fixes the icon positiing in IE11.
* `Toast`: Fixes the icon positiing in IE11.

# 2.6.0

## Package Updates

* Enzyme has been updated to v3.2.0
* Superagent has been updated to v3.8.2 for a security fix
* moment has been updated to v2.20.1 for a security fix

## Improvements

* Carbon now comes with over 100 standard icons to choose from! Check out the Icon component page to view the latest additions like `in_transit` and `credit_card_slash`.
* `Date`'s getter `datePickerProps()` now checks the date value before returning
* `Dialog`'s `centerDialog` and `focusDialog` methods won't attempt to run if the dialog isn't present
* `Form`'s `checkStickyFooter` method won't attempt to run if the form isn't present
* `Table`'s `resizeTable` method won't attempt to run if the table isn't present
* Fixed tests broken by Enzyme major version bump.

## CSS Changes

* `SettingRow` - the left hand segment now has a `max-width` of 300px.

# 2.5.4

* Upgrade marked package from v0.3.6 to 0.3.9 to address security vulnerabilities

# 2.5.3

## Bug Fixes

* Revert the `Profile` component changes: `darkBackground` is false by default, and the name and email render using the inherited `body` text colour.

# 2.5.2

## Bug Fixes

* Adding a transform to an instance of a service class was applying the transform to all other instances. This change ensures the transform is only applied to the specific instance.
* Remove space from clearfix psuedoclasses that was creating a space character that was pushing layouts out of line

# 2.5.1

## Fixes

Resolves missing `assets` file from v2.5.0.

# 2.5.0

## Improvements

* `Portrait` can now render an empty string for the alt attribute.
* Improve the contrast of the text in the `Profile` component, and the `Portrait` component when `darkBackground={ true }`.
* Changed type of prop `tooltipMessage` of `tooltip-decorator` from string to node to allow children.

## Fixes

* Set the `Component.displayName` on all decorators. **NB** You may need to update your snapshots as a result of this to change the component name to something more accurate
* Handles an empty body (such as that with a 204) more robustly ([#1631](https://github.com/Sage/carbon/issues/1631))
* `Rainbow` - fixes a bug in which the component was unresponsive to mouse events.

# 2.4.0

## Improvements

* Added `connect` higher order component as an intermediate step for connecting components to Flux stores through props.

## CSS Changes

* `SettingsRow` Adjusted paddings and margins between sections.
* `Dialog` Ensure the heading used within a dialog has 15px padding instead of 20px.

# 2.3.0

## CSS Changes

* `Menu` has been updated based on slightly new designs. `MenuItem` now supports the `icon` prop.
* `Portrait` size `extra-small` has reduced from `26px` to `25px`.
* `Portrait` size `medium-small` has reduced from `50px` to `40px`.
* `Profile` has increased margin between the image and text.
* `Dialog` bottom padding has increased by 8px.

## Improvements

* `Modal` now has a data-state element that begins as default, set to open once transition to open is complete and is set to closed once the transition to closed is complete.

## New Components

* `ButtonToggleGroup` is a component that allows a group of ButtonToggles to behave as a single form component with label, field help, validation message, warning message, and info message support.

# 2.2.3

* Fix table-ajax to only set data-state to loaded once all of the data has been set. This resolves an issue when automating user scenarios allowing us to reliabliy wait for the loaded state to be set, before moving on.

# 2.2.2

* DropdownFilter now uses a stylized Link component for the Create button.
* DropdownFilter now has `createText` & `createIconType` props for customizable create button text and create button Icons (limited to current Carbon Icon types).

## Fixes

Ensures that `displayName` is set to the original component's name when connecting to a store using Carbon's flux helper. We have noticed Jest snapshot's have started to default to `View` when connected to a store using our flux connector, this change will ensure the display name is maintained.

# 2.2.1

## Fixes

:warning: v2.2.0 updated modal components (eg. `Dialog`) to use ReactPortal. While this doesn't break applications, it was found to break some tests after an application upgraded. We have decided to disable this feature for now, and will re-add it at a later date when either Portals are better supported by our test tooling or when we release a version 3 of Carbon with potential breaking changes.

# 2.2.0

:warning: We recommend you use v2.2.1 instead of this version.

## UX Improvements

The following updates have been made to Carbon components to align with design updates.

* Button - Ensure that the button text is always aligned centrally by default. Resolves an issue where the Button text may wrap where translated text occurs.
* Colors - New Text colors added
* Animated Menu Button - Fixed icon alignment and text weights in
* Flash - Text colors changed to pass accessibility
* Menu - New Drop Shadow
* Multi Action Button - Minor fixes to hover
* Pager - Padding and font size fixes
* Pod - Shadow color update
* Portrait - Border fix
* Settings Row - Separator placement fix
* Split Button - Correct color on hover
* Tabs - Hover color now matches buttons
* Toast - Shadow update

## Improvements

* `ConfigurableItemsPattern`'s prop `itemsData` is no longer required
* We use `core-js` instead of `es6-promise` for Promises as this is more reliable and fixes an issue in IE11. *Check you aren't accidentally relying on `es6-promise`*.

## New Components

* `Portal` is a component that wraps the [react-portal](https://github.com/tajo/react-portal) library.

## Component Enhancements

* `InputLabel` now allows fieldHelp to be a node type.
* `TooltipDecorator` now uses the new `Portal` component for layout. This effects `Help` and `Icon` components.
* `Date` now uses the new `Portal` component to render the DatePicker.
* `Modal` now uses the new `Portal` component.
* `ActionToolbar` can now receive children to add additional actions. The `Table` component has also been given the `actionToolbarChildren` prop to send the same data down.`

## Package Updates

* The `react-addons-perf` package is now included in `devDependencies`.

## Minor Improvements

* Fix typo in FullScreenHeading

## Demo Site

* Upgrades `react-highlight`, which removes the last `createClass` warning from React.

# 2.1.1

* DropdownFilter now uses a stylized Link component for the Create button.
* DropdownFilter now has `createText` & `createIconType` props for customizable create button text and create button Icons (limited to current Carbon Icon types).

# 2.1.0

* DialogFullScreen and Pages now have a max width applied.
* Fixes z-index issue of Dialogs appearing on top of DialogFullScreens.
* Carousel can now have custom transitions using the `transition` prop.

# 2.0.1

## Bug Fixes

* Fixes a compilation error that occurred in 2.0.0, which resulted in a missing `assets.scss` file.
* `Datepicker`: Stops NavBar submitting the form its contained in

# 2.0.0

## Breaking Changes

### Store Disptacher

Store no longer accepts a `Dispatcher` as its third argument. It will automatically use the dispatcher supplied by Carbon. If you want to pass a custom one then you can pass it as a param in the config:

```js
new Store('name', data, { dispatcher: myDispatcher });
```

### Dependency Updates

The following packages are now specified as peer dependencies:

* flux
* react
* react-dom

The following packages have been moved from `devDependencies` to `dependencies`:

* `i18n-js`
* `immutable`
* `highcharts`
* `react-router`
* `react-transition-group`

The following packages have been upgraded:

* flux: now has a peer dependency of at least 3.1.1
* i18n-js: upgraded to rc12 - (scope is now required)
* react-router: ^3.0.0

#### Upgrading a project that uses Carbon

##### Installing peer dependencies

If you're upgrading an application that uses Carbon to v2.0.0 you'll need to make sure you have `flux`, `react`, and `react-dom` in your project's dependencies. To add `flux`, `react`, and `react-dom` to your project dependencies run the following command:

```
npm install flux react react-dom --save
```

##### Upgrading Carbon and using the new Carbon dependencies

Carbon now includes `i18n-js`, `immutable`, `highcharts`, `react-router`, and `react-transition-group` in its dependencies, so you may be able to remove these from your own project's dependencies. To do this:

1. Uninstall and remove `i18n-js`, `immutable`, `highcharts`, `react-router`, and `react-transition-group`
   from your project's dependencies:

```
npm uninstall --save i18n-js immutable react-router react-transition-group
```

2. Install the latest Carbon:

```
npm install --save carbon-react@2.0.0
```

### Removal of Service Deprecation

The `Service` class now accepts an object as its second argument, deprecating the separate `onSuccess` and `onError` arguments.
This allows you to pass in `onSuccess` and `onError` functions in the object, along with `params` if you need query parameters in your requests.

#### Examples

Deprecated invocation:
 - `service.get('1', onSuccessFunc, onErrorFunc)`

New invocation:
 - `service.get('1', { onSuccess: onSuccessFunc, onError: onErrorFunc })`
 - `service.get('1', { onSuccess: onSuccessFunc, onError: onErrorFunc, params: { key1: 'val1', key2: 'val2'} })`

### Removal of Row Deprecation

* `Row`: can no longer render any immediate children. A Column component has been introduced to maintain the column span, offset and align behaviour.

```javascript
// BEFORE
import Row from 'carbon/lib/components/row';

...

<Row columns='10'>
  <div columnSpan='3' columnOffset='2' columnAlign='right'>
    Content 1
  </div>
  <Pod columnSpan='5'>
    Content 1
  </Pod>
</Row>

// AFTER
import { Row, Column } from 'carbon/lib/components/row';

...

<Row columns='10'>
  <Column columnSpan='3' columnOffset='2' columnAlign='right'>
    Content 1
  </Column>
  <Column columnSpan='5'>
    <Pod>
      Content 1
    </Pod>
  </Column>
</Row>
```

## Component Enhancements

* `Browser` has been updated so that `getWindow()` will work when run in a node environment
* `ButtonToggle` now lets you add a `size` and a `grouped` prop.

## Bug Fixes

* Grouped character adds separators to value on first render.

# 1.7.1

## Bug Fixes

* `Datepicker`: Stops NavBar submitting the form its contained in

# 1.7.0

## Component Enhancements

* `Message` - `children` prop is now optional. [#1543](https://github.com/Sage/carbon/issues/1543)
* `Message` - `title` prop type has been changed from string to node. [#1543](https://github.com/Sage/carbon/issues/1543)

# 1.6.1

## Bug Fixes

* `Datepicker`: Stops NavBar submitting the form its contained in

# 1.6.0

## Component Enhancements

* `Table` now lets you add an `aria-describedby` prop.
* `ConfigurableItemRow` is vertically centered correctly.
* `AnimatedMenuButton` uses the native `<button>` instead of a div for the close button.
* `Tabs` now includes aria roles for better screen reader support.
* `Tabs` can now be navigated using left/right arrows for horizontal tabs and up/down arrows for vertical tabs on the keyboard to switch between the tab list.

## Pattern Enhancements

* `ConfigurableItems` has `stickyFormFooter` enabled

## Draggable Ghost Row

The `DraggableContext` component now includes a `CustomDragLayer` to enable a ghost row when dragging.

In order to enable this you need to define the `draggableNode` prop on the `<WithDrag>` component. For example:

```
class DraggableItems extends React.Component {
  render() {
    return (
      <DraggableContext onDrag={ onItemMoved }>
        <ol>
          {
            items.map((item, index) => {
              return (
                <WithDrop key={ index } index={ index }>
                  <DraggableItem />
                </WithDrop>
              );
            });
          }
        </ol>
      </DraggableContext>
    );
  }
}

...

class DraggableItem extends React.Component {
  render() {
    return (
      <li ref={ (node) => { this._listItem = node; } } >
        <WithDrag draggableNode={ () => { return this._listItem; } }>
          <span>{ item.content }</span>
        </WithDrag>
      </li>
    );
  }
}
```

Note that the `draggableNode` is passed as a function because the ref `_listItem` is undefined until the component is mounted.

## Service class accepts query parameters

The `Service` class now accepts an object as it's second argument, deprecating the separate `onSuccess` and `onError` arguments.
This allows you to pass in `onSuccess` and `onError` functions in the object, along with `params` if you need query parameters in your requests.

### Examples

Deprecated invocation:
 - `service.get('1', onSuccessFunc, onErrorFunc)`

New invocation:
 - `service.get('1', { onSuccess: onSuccessFunc, onError: onErrorFunc })`
 - `service.get('1', { onSuccess: onSuccessFunc, onError: onErrorFunc, params: { key1: 'val1', key2: 'val2'} })`

## DatePicker

* The Date Picker library has changed from react-date-picker to react-day-picker as the old library is no longer maintained.
* This will effect the `Date` and `DateRange` components but functionally they have remained the same.

# 1.5.3

## Bug Fixes

* `FormSummary`: negative margin solves problem where FormSummary is effecting its sibling component's position [#1523](https://github.com/Sage/carbon/issues/1523)

# 1.5.2

## Bug Fixes

* Fixes CSS load order issue with `Dialog`, `Form`, and sticky footers.

# 1.5.1

## Bug Fixes

* Update `Service` class to use prototypal inheritance instead of class properties.
* Fixes floating error message caused by https://github.com/Sage/carbon/pull/1452/commits/1f902687c507f7b9cc8fe8cb641c048f8d82b034

# 1.5.0

## Component Improvements

The following components have had styling updates:-

* DatePicker
* ButtonToggle
* Heading / Dialog

## Font Update

The 300 weight (Thin) has been replaced by the 900 weight (Black) in Lato.

# Component Enhancements

* `TableAjax` component now uses the data-state attribute and `aria-busy`.

## npm (for local development of carbon only)

* Carbon now require `npm` version 5 for installing dependencies.
* To upgrade your version of npm, run `npm install npm@latest`.
* Then, before running `npm install` in your project folder, run `npm verify cache` to update your cache.

# 1.4.6

* `ConfigurableItems` pattern now accepts an `onReset` prop to be passed in.

# 1.4.5

* `Validations`: fixes an error from being thrown for non-Textbox validations when situated inside a Modal.

# 1.4.4

* `Date`: Fixes missing background color on validation errors.

# 1.4.3

* `Heading`: Removed default top padding.

# 1.4.2

* `Menu`: removed `alternate` prop, can use `SubMenuBlock` instead which achieves the same thing.

# 1.4.1

* `Dropdown`: validation fail now allows the dropdown arrow to be visible
* `Decimal`: fix an issue where values entered without a leading zero were incorrectly failing numerical validation

# 1.4.0

## Dispatcher

We now provide the Flux Dispatcher as a singleton within the Carbon library.

```
import { Dispatcher } from 'carbon-react/lib/utils/flux';
```

Please note that you should only use one Dispatcher in your application, if you want to start using the one provided in Carbon you need to remove the pre-existing one from your application.

## Logger

Logger can now supply a option of `group` - this will group any logged messages together that share the same group name and that are triggered within 500ms of one another.

## Dependency Update

* React has been upgraded to 15.6.1 - https://facebook.github.io/react/blog/2017/06/13/react-v15.6.0.html

## New Components

* `ConfigurableItems` Drag & Drop and check/uncheck a list of items
* `ConfigurableItemRow` Used with ConfigurableItems to build the list of configurable items

## New Patterns

* `ConfigurableItemsPattern` Combines ConfigurableItems and ConfigurableItemRow components

## Component Enhancements

* `TableAjax` now accepts an `onAjaxError` function as a prop, to handle Ajax requests that return a HTTP error

## Linting Updates

The following have had minor internal changes to satisfy the introduction of stricter linting rules:

### Components

* Dropdown
* FormSummary
* Page
* Pages
* RadioButton
* Tabs

### Helpers

* Store

## Component Improvements

* `Form` now has additional props of `leftAlignedActions` and `rightAlignedActions` which allows developers to add additional nodes in line with the default form actions.
* `Button`: Makes large button text the same as the medium button
* `Button`: Allows secondary text under main text [#1385](https://github.com/Sage/carbon/issues/1385)
* `ButtonToggle`: The buttons can now be toggled using the keyboard
* `Poller` helper has been refactored to no longer use promises
* `Tooltip` now renders an ARIA role of tooltip, and accepts an optional `id` prop

## Minor Improvments

* The `Poller` helper has been refactored to no longer use promises

## Demo Site

* Renamed `definition.js` files to `__definition__.js`.

# 1.3.7

## Bug Fix

* `Decimal`: fix an issue where values entered without a leading zero were incorrectly failing numerical validation

# 1.3.6

## Bug Fix

* `Dialog`: ensures close icon positioning regardless of CSS load order

# 1.3.5-1

## Bug Fixes

* Fixes CSS load order issue with `Dialog`, `Form`, and sticky footers.

# 1.3.5

## Bug Fixes

* Flips errors messages in dialogs if they appear wider than the dialog.
* `ButtonToggle`: The buttons can now be toggled using the keyboard

# 1.3.4

## Bug Fixes

* Resolved bug in IE11 where sticky footer was rendering too large in dialogs.

# 1.3.3

## Bug Fixes

* Added additional guards for browsers that do not support `element.contentDocument`.

# 1.3.2

## Bug Fixes

* Our files are now published in production mode, removing some developer dependencies previously included.

# 1.3.1

## Bug Fixes

* A bug was found in the new Dialog behaviour in Safari 9.x which rendered the sticky footer incorrectly. This solves it rendering incorrectly on page load for Safari 9.x. There remains a wider issue around Safari logged [here](https://github.com/Sage/carbon/issues/1432).

# 1.3.0

## Component Ehancements

* Dialog
  * Screen is no longer scrollable when a dialog is open.
  * Dialog will attach to the bottom of the browser if it gets too tall, and it's content will become scrollable.
  * If a dialog has a form, the form buttons will become sticky to the bottom of the dialog while the dialog is attached to the bottom of the browser (this is only enabled if the prop `stickyFormFooter` is applied to the dialog).
  * Dialog can now use a prop called `height`, allowing developers to specify a set height for the dialog (the dialog will still attach to the bottom of the browser if it is taller than the browser's height).
* Form
  * Now has a prop of `stickyFooter` which when `true` will enable a sticky footer when it is off the screen.
  * Now has a prop of `stickyFooterPadding` which will add additional padding to the form buttons when they are sticky (useful for aligning the form buttons between sticky and non-sticky states).

# 1.2.2

## Bug Fixes

* Selected table rows no longer have highlights applied on hover.
* Revert I18nhelper to use global locale for delimiter and separator

# 1.2.1

## Linting Updates

The following have had minor internal changes to satisfy the introduction of stricter linting rules:

### Components

* DraggableContext
* DraggableTableCell
* TableRow
* WithDrag
* WithDrop

### Helpers

* ItemTarget
* Text

## Bug Fixes
* `Dialog` now has a `autoFocus` boolean property. You can set this to `false` if you don't want the dialog to receive keyboard focus when it opens e.g. if your dialog contains form fields that you want to set the focus on instead.
* `Dialog Full screen`: The `carbon-dialog-full-screen--open` class is now applied to the `html` element instead of the `body`.
* `Input`: the prefix was hidden when an error was present on the input element.

# 1.2.0

## Dependency Upgrade

* Carbon Factory has been upgraded to Version v1.1.7

## Linting Updates

The following have had minor internal changes to satisfy the introduction of stricter linting rules:

### Components

* AppWrapper
* Carousel
* Checkbox
* Column
* Content
* Create
* Date
* DateRange
* Decimal
* Detail
* Dropdown
* DropdownFilter
* DropdownFilterAjax
* Fieldset
* GroupedCharacter
* Heading
* Help
* I18n
* Icon
* Link
* Menu
* MenuItem
* MenuList
* MenuListItem
* MultiStepWizard
* Message
* Modal
* MountInApp
* NavigationBar
* NumberInput
* Pager
* Pill
* Pod
* Portrait
* Profile
* RadioButton
* Rainbow :warning: The ref for the highchart instance is now `_chart`. This will need updating where Rainbow is used.
* Row
* SettingsRow
* ShowEditPod
* Sidebar
* Sidebar Header
* SimpleColorPicker
* Spinner
* SubmenuBlock
* Tabs
* Textarea
* Textbox
* Toast
* Tooltip

#### helpers

* Date
* Devices
* Events
* GUID
* i18n

### utils

The following utils have had minor internal changes to satisfy the introduction of stricter linting rules:

* Browser
* CSS
* Ether
* Flux
* Handlers
* Helpers
* Logger
* Promises
* Router
* Service
* Should Component Update decorator
* Tooltip Decorator
* Validators

## DraggableContext, WithDrag & WithDrop

We now provide a series of components to enable drag and drop functionality. For example:

```
<DraggableContext onDrag={ onItemMoved }>
  <ol>
    {
      items.map((item, index) => {
        return (
          <WithDrop key={ index } index={ index }>
            <li>
              <WithDrag><span>{ item.content }</span></WithDrag>
            </li>
          </WithDrop>
        );
      });
    }
  </ol>
</DraggableContext>
```

The `onDrag` prop can manipulate the order of items as they are dragged. It is a function that receives two arguments: `dragIndex`, which is the original position of the item, and `hoverIndex`, which is the position of the item if dropped.

An example function signature: `onItemMoved = (dragIndex, hoverIndex) => { }`

## Draggable Table Rows

The `TableRow` component now supports drag and drop. To enable it you need to add a `DraggableContext` component, apply an index to each `TableRow`, and define the `onDrag` prop to manipulate the order as it changes:

```
<Table tbody={ false }>
  <DraggableContext onDrag={ onRowMoved }>
    <tbody>
      {
        rows.map((row, index) => {
          return (
            <TableRow key={ index } index={ index }>
              { row.content }
            </TableRow>
          );
        });
      }
    </tbody>
  </DraggableContext>
</Table>
```

## Text Helpers

A new helper object is available in `utils/helpers/text`. Currently it only contains one method `clearSelection`, which clears any selected text on the page.

## Pages and page

Pages and Page are new components to enable paginated content for full screen views.
See an example with a full screen dialog:
```
const headingOne = (
  <Heading title="My First Page" />
);

const headingTwo = (
  <Heading title="My Second Page" />
);

return (
  <DialogFullScreen>
    <Pages slideIndex={ 0 }>
      <Page title={ headingOne }>
        Content for the first page.
      </Page>

      <Page title={ headingTwo }>
        Content for the second page.
      </Page>
    </Pages>
  </DialogFullScreen>
);
```

## Component Improvements

* `Alert` now alerts itself to screen readers.
* `Browser`: add a new method `setInputFocus` to focus on the input field of passed in ref but does not select text
* `Carousel`
  * has a new prop `enableSlideSelector` defaulted to `true`. Setting it to `false` will hide the slide selector.
  * has a new prop `enablePreviousButton` defaulted to `true`. Setting it to `false` will hide the previous button.
  * has a new prop `enableNextButton` defaulted to `true`. Setting it to `false` will hide the next button.
  * has a new prop `slideIndex`. Changing this prop to an index will select the corresponding slide.
  * has a new prop `onSlideChange`, which is an action to be called on slide change. It will receive the slide index and the transition direction as params.
  * animation between slides enhanced.
* `Dialog` is now using the `Heading` component to render its title and subtitle.
* `DialogFullScreen` is now scrollable if the content goes beyond the height of the browser.
* `Form` now has default `SaveButton` and `CancelButton` functional stateless components. The former can be overridden with a new prop of `customSaveButton`.
* `Heading` backLink prop can now be a string or a function.
* `InlineInputs` children are now wrapped by Columns by the component.
* `Menu` has been updated to use a `<nav>` tag as its root element.
* `MenuItem`: focus outline is now fully visible when an item is focused.
* `Pager`: Negative values now set to absolute value, NaN values set to page 1.
* `Table` can now receive an `caption` prop which renders a `<caption>` element as a child of the table element. Note that the caption is hidden by default, but still accessible to screen readers and assistive technologies.
* `Table` has a new prop of onConfigure. Displays a configure icon to the left of the table header that triggers the callback onClick.
* `MultiActionButton`: Secondary button hover style has been updated to not change on hover.
* `TableHeader`: improve accessibility of sortable columns. They can now receive focus via the keyboard, and include `aria-sort` and `aria-label` attributes to indicate they are sortable, the current sort direction, and which direction the column will be sorted when sorting is next activated.
* `InputValidation`: now accepts a `info` prop to display info-styled icon and message attached to an input.

### Table

* `Table` can now receive an `caption` prop which renders a `<caption>` element as a child of the table element. Note that the caption is hidden by default, but still accessible to screen readers and assistive technologies.
* `Table` has a new prop of onConfigure. Displays a configure icon to the left of the table header that triggers the callback onClick.
* `Table` has a new prop of `theme` that allows primary (dark) or secondary (light) styling.

## Bug Fixes

* `DialogFullScreen` now scrolls vertically if it contains content taller than the dialog height.
* `TableHeader`: fix alignment of sort icon in IE11.

## Dependency Switch

* Facebook has deprecated `react-addons-transition-group` and `react-addons-css-transition-group` in favour of `react-transition-group/TransitionGroup` and `react-transition-group/CSSTransitionGroup` so we have switched to use the later.

## Deployment Changes

* You can now pass `--cdn` to the gulp task to bundle assets pointing towards the CDN.

## Other

* Minor changes to guides to reference `carbon-react` in imports.
* `grid` icon added to the `Icon` component.

# 1.1.4

* Update I18nhelper to respect the locale for the delimiter and separator.

# 1.1.3

* Fix bug with Date Range date pickers not closing correctly

# 1.1.2

## Component Enhancements

* `Dropdown` now accepts a new optional function prop `renderItem` which will be called to render each option in the list

# 1.1.1

## Component Enhancements

* `Content`: gets a `data-element` on its body wrapper

# 1.1.0

## Package Updates

* BigNumber has been updated to v4.0.2

## Component Enhancements

* `Dropdown`: Options list is always rendered to the DOM, but is hidden until selected
* `Textarea` now accepts a new prop `warnOverLimit` to display the character count message in red.
* Simplify character count in `Textarea`.

## Bug Fixes

* `Date`: fixed the warning about an uncontrolled input component
* Fix presence validator bug validating value as false if no props sent to validator.

## Linting Updates

The following component have had minor internal changes to satisfy the introduction of stricter linting rules:

* ActionToolbar
* AnimatedMenuButton
* Button
* ButtonToggle
* Confirm
* Dialog
* DialogFullScreen
* Flash
* MultiActionButton
* SplitButton
* Table
* TableAjax
* TableCell
* TableHeader
* TableRow

# 1.0.0

## Package Name Change

* The package name has been updated to `carbon-react`.

## Removed `/lib` directory

* You should now install the package via npm: `npm install carbon-react`.

## :warning: Major Change - React 15 Upgrade

* React has been upgraded to version 15.5.0 - https://github.com/facebook/react/releases

## !! BREAKING CHANGES!! :warning:

* `ActionToolbar`: 'total' field margin and width
* `Banner`: Component has been Deleted in favour of the Message Component
* `ButtonToggle`: `icon` and `iconSize` become `buttonIcon` and `buttonIconSize` to avoid clash with Input decorator
* `Heading`: paddings
* `MenuList`: Main Classes and `className` props have been moved from the `ul` to the top level `div`. To access the `ul` use `carbon-menu-list__list`
* `MultiActionButton`: Additional buttons are spaced differently
* `MultistepWizard`: Step has less padding-left
* `Pod`: Header has less margin-bottom

## Potentially breaking changes

* The following components have been refactored to meet best practice standards and pass linting. If you have overridden any internal methods of these components, you may need to update your code.
  - Action Toolbar
  - Alert
  - Animated Menu Button
  - App-Wrapper
  - Button
  - Content
  - Create
  - Carousel
* `ButtonToggle` no longer inherits from the label decorator as it was providing more functionality than required.
* `Rainbow` has been updated to no longer use the `react-highcharts` component. To use this component you need to ensure to make the `Highcharts` library available to your application globally.
* `ActionToolbar` incorrectly required actions as an `Array` - this has been changed to an `Object` to reflect its actual usage.

## Google Analytics

If you have Google Analytics enabled (`window.ga` is defined), and you are using the router supplied by Carbon, we will track subsequent page views. Please ensure that your Google Analytics tracking code is defined after you load the your application JavaScript.

## Component Enhancements

* `Decimal` now shows propType warning when precision is outside the range 0..20
* `Detail`: font size of footer increased
* `Dialog`: font wieght
* `DropdownFilter`: placeholder text is made more legible by removing italics and making the font color darker
* `DropdownFilterAjax`: `data-state` component tag is added to the `getData` Ajax request to mark the requesting state
* `Fieldset`: icon positioning
* `Heading`: Font size increased and weight
* `Input`: decorator has slight padding change
* `Menu` includes `alternate` prop for marking sub sections of the menu for styling (like tiger stripes for readability on tables, rather than actual submenus
* `MountInApp` now cleans up it's children when the component is unmounted.
* `Pod`: Font size increased
* `ShowEditPod`: z-index on input prefixes
* `TableHeader`: Font weight

## Service Class

Adds a `Service` class to make it easier and more clear to create reusable services to interact with a JSON API. The class supports:

* `GET`, `POST`, `PUT` and `DELETE` requests.
* Automatically configured request Headers (no longer need to set `Content-Type` etc for each request)
* CSRF support.
* Request and Response transforms.
* Global Success and Error actions for triggering automatic actions (such as flash notifications on error).

This should hopefully replace all uses of `Request` or `axios`.

## Helpers

* A new 'insertAt' Ether helper to insert a character in a string at a specified indices

## New components

* Grouped-character component - displays groups with of characters with separator.

## Bug Fixes

* `Alert`: default size has been fixed to `extra-small`.
* `ButtonToggle`: css typo corrected
* `Confirm`: default size has been fixed to `extra-small`.
* `Detail`: Footnote is allowed to expand vertically
* `Heading`: alignment is fixed in IE where `hr` was centring by default
* `Link`: CSS inheritance has been updated to better support buttons.
* `MenuList`: item filter search icon positioning is fixed
* Row clones children when mutating props rather than creating new element to retain refs
* Stop input value being removed from props (fixes Button Toggle issue)

## Deprecations Added

* `Row`: can longer render any immediate children. A Column component has been introduced to maintain the column span, offset and align behaviour.

```javascript
// BEFORE
import Row from 'carbon/lib/components/row';

...

<Row columns='10'>
  <div columnSpan='3' columnOffset='2' columnAlign='right'>
    Content 1
  </div>
  <Pod columnSpan='5'>
    Content 1
  </Pod>
</Row>

// AFTER
import { Row, Column } from 'carbon/lib/components/row';

...

<Row columns='10'>
  <Column columnSpan='3' columnOffset='2' columnAlign='right'>
    Content 1
  </Column>
  <Column columnSpan='5'>
    <Pod>
      Content 1
    </Pod>
  </Column>
</Row>
```

## data-attributes on components

We have added data-attributes to components to better identify them and their parts within the browser. We have added `data-component` tags on the top level of any component, and `data-element` tags to constituent parts. Developers can also add `data-role` tags to components to uniquely identify specific components within their UI.

## Dependency Update

* Carbon Factory has been upgraded to v0.3.6 - https://github.com/Sage/carbon-factory/releases/tag/v0.3.6

### Gulp updates

* Can pass command line arg to pecify port for demo server.
```bash
gulp --port 1234
```

# 0.36.3

## Component Enhancements

* `DialogFullScreen` now accepts a String for title or any other component.

# 0.36.2

* Hide SplitButton additional buttons instead of removing them.

# 0.36.1

* Removed the style node from `package.json` in table-ajax. This file doesn't exist.

# 0.36.0

* Add `additionalRequestParams` prop to `DropdownFilterAjax`

# 0.35.2

* Hide SplitButton additional buttons instead of removing them.

# 0.35.1

* Ensure that node modules can only upgrade patch versions

# 0.35.0

## Bug Fix

* `ShowEditPod`: `beforeFormValidation` and `buttonAlign` props are now passed to the `Form` as they should be

## InlineInputs Component
A simple `InlineInputs` wrapper component which allows multiple input fields to be displayed horizontally
with a label.

```js
<InlineInputs label='Test Label'>
  <Textbox />
  <Textbox />
</InlineInputs>
```

## Component Enhancements

* `Date` now shows error validation when an invalid date is entered.
* `Flash`: Change error icon to match other notifications (now shows error icon when `as` prop is `error`)
* `Form`: adds error and warning icons (and refactors the summary into its own sub-component)
* `Dialog`: Added `subtitle` prop
* `Input` can now receive an `inputHelp` prop which renders a tooltip after the input field.

## New Validations

* DateWithinRangeValidator checks that a date is within specified bounds.
e.g.
```javascript
  new DateWithinRangeValidator({ limit: 30, units: 'days' }
```

# 0.34.5

## Bug Fix

* `Dropdown`: adds a set of ontouch events to the list in order to stop blurring from happening until after the touch event which fixes a bug with the input update on finger tap on touch screens
* `TableHeader`: fix overflow issue so that tooltip / help components aren't cut off.
* `Decimal`: fix issue where `visibleValue` was not updated after a change to `precision`.

# 0.34.4

## Bug fix

* `Pod`: corrects misalignment caused by centering

# 0.34.3

## Component Enhancements

* `DropdownFilter`: Refactored 'freetext' mode to operate on `value` for an option id, or `visibleValue` for a write-in value.
* `PresenceValidator`: Added `props` and `requireAll` arguments to validate any/all of multiple input properties.

# 0.34.2

## Bug fix

* Fixes onBlur prop passed to `Date`, `Decimal`, `Dropdown`, `DropdownFilter`, and `DropdownFilterAjax` components so it is called instead of ignored
* `I18nHelper`: Number abbreviator allows negative numbers

# 0.34.1

## Component Enhancements

* `MenuItem`: Added `onClick` prop.

# 0.34.0

## Component Enhancements

* `DateRange`: Two new props have been added, `startDateProps` and `endDateProps`, to apply props to the child `Date` components.
* `MultiStepWizard` now allows adding callbacks when clicking on Next/Back button and allows adding validation callback before wizard submission when clicking on Submit button.

## DropdownFilter `freetext` mode

Adds a new mode to `DropdownFilter` which prompts the user with suggest-style filtered options, but also allows typed
entries that do not match any options. If the typed string exactly matches the name of an option, that option is
automatically selected on blur, and the `onChange` event target will specify the option id as `value` and name as
`visibleValue`, just as if it had been clicked. If the typed string does not match any options on blur, it remains as
the input value and `onChange` will carry an empty string `value` and the typed string as `visibleValue`.

Usage:

```
<DropdownFilter options={ options } freetext={ true } onChange={ this.onChange } />
```

# 0.33.2

## Bug fix

* `Portrait`: Fixes image stacking.
* Fixes decimal input displaying error with single negative sign `-`.
* Fixes numeral validation exception with single negative sign `-`.
* Currently active inputs no longer re-validate during `componentWillReceiveProps`, ensuring that duplicate re-validation no longer occurs triggering `-1` error counts.

# 0.33.1

## Bug fix

* Fixes alignment issue in inputs caused by the font size of prefixes differing from values.

# 0.33.0

## Helpers

* The I18n helper now uses the current locale for delimiter and separator.

# 0.32.1

## Bug Fixes

* Validation is now correctly reset when a value is changed externally from the input.

# 0.32.0

## New Validators

* IsBlankValidator

## MountInApp Component

Can be used to integrate React components into pre-existing user interfaces.

```
  <MountInApp targetId="put_carbon_component_here">
    // Children
  </MountInApp>
```

The code above will render all `//Children` components inside of the element with ID=`put_carbon_component_here` found on the page.

## SimpleColorPicker Component

A component that displays squares with color samples that you can choose from.

```javascript
  <SimpleColorPicker
    availableColors={ ['transparent', '#ff0102', '#34ff01'] }
    selectedColor="#34ff01"
    name="settings[color_of_something]"
    onChange={ customEventHandler }
  />
```

## Helpers

* A new 'insertAt' Ether helper to insert a character in a string.
*  It inserts a dash by default, or a custom `newChar`

```javascript
  insertAt('123456', 2);
  // => 12-3456
  insertAt('123456789', 3, { newChar:'/' });
  // => 123/456789
```
To repeat the character at the same interval, set `repeat` to `true`

```javascript
  insertAt('123456', 2, { repeat: true });
  // => 12-34-56
  insertAt('123456789', 3, { newChar:'/', repeat: true });
  // => 123/456/789
```

# 0.31.3

* `legacyEditStyles` prop name has changed to `internalEditButton`.

# 0.31.2

## Bug fix

* `Pod`: bug fixed with link and hover event props being mixed up

# 0.31.1

## Bug fix

* `I18nHelper.formatCurrency`: returns integer with option { precision: 0 }.

# 0.31.0

## MultiStepWizard Component

We have updated MultiStepWizard's default buttons as primary.

## Pod Component

Now takes a legacy style flag that switches the styles back

## Component Enhancements

* `Icon`: Three new props have been added:
  * `bgShape`: 'square', 'rounded-rect', or 'circle'.
  * `bgTheme`: 'warning', 'default', 'error', 'info', 'new', 'success', 'help', or 'maintenance'
  * `bgSize`: 'small' (default), 'medium', or 'large' - only modifies overall icon size if `bgShape` or `bgTheme` is passed.

* `Form`: Two new props have been added, `saveButtonProps` and `cancelButtonProps`, to apply props to Form buttons.

## Helper Enhancements

* `Browser`: A new `postToNewWindow` method has been added, for sending POST data to a new browser window/tab.

## CSS Changes

* Added `$beta` orange color variable

# 0.30.0

## SettingsRow Component

We have added a settings row component for settings pages. It employs the current UX standard for the appearance of settings pages. Title, description, and any details (accepts nodes) are formatted into the header, while children are rendered in the input cell. Renders nothing if no children present.

```
<SettingsRow
  className='mysetting-row'
  title='My Setting'
  description='Some descriptive text'
  description={ <span>Detailed description</span> }> }
>
  <Checkbox label='Enable my setting' />
  <div>Some other blurb about the setting</div>
</SettingsRow>
```

## CSS Changes

* Portrait initials are now dark grey on grey

## Component Enhancements

* `Heading`: One new prop has been added, `separator`, to show a 2x50px separator between title and subheader.
* All input components can now render an icon using the prop `icon`.
* `Portrait`: Now displays an icon in place of a blank box when the image has not been set and the initials are an empty string.

# 0.29.3

## Bug Fixes

* single quote(') is valid in email address now.

# 0.29.2

## Bug Fixes

* Readded the `carbon-tabs` class to the Tabs component.
* Clear any selected rows too in refresh()
* SelectedRows should be reset to the same object it is defined with

# 0.29.1

## CSS Update

* The `default` colour set now uses a lighter grey.

# 0.29.0

## !! BREAKING CHANGES!! :warning:

* error icon on `Date` component is now displayed in place of the calendar icon clicker

### Immutable Helper

* ImmutableHelper.parseJSON now converts javascript objects to regular Maps rather than ordered maps.
* If you require ordered maps you will need to explicitly create them rather than use ImmutableHelper.
* `margin-bottom` has been removed from the message component.

## CSS Changes

* `Navigation-Bar`: line-height has been applied to parent content div rather than children.
* Updated base font CSS to better reflect the Lato font.
* Updated Menu Item CSS to better reflect the Lato font.
* Updated input help text color for accessibility standards.
* Animated Menu Button has been updated with latest font changes.
* Links inside of input warnings are now coloured white.

## Bug Fixes

* `Tabs` now correctly tracks warning state of a tab.
* `Tabs` no longer jumps when changing tab.

## Package Upgrades

* Datepicker has been upgraded the latest version.
* Bowser has been upgraded to the latest version.

## Component Enhancements

* `Message`: Two new props have been added, `border` and `roundedCorners`.
* `Dropdown`: One new prop has been added, `cacheVisibleValue`.
* `Tabs` now can take a prop of 'position' which supports floating to the left and being positioned in a vertical stack.

## Helpers

* A new `humanizeFilesize` helper for converting bytes to a human readable representation.
* `roundForAbbreviation` is added to handle the number element of `abbreviateNumber` as well as forcing any abbreviated number to one decimal place
* `abbreviateCurrency` takes unit value

## Minor Improvements

* Cookie functions added to browser helper
* Fixes vertical alignment of minus icon.

# 0.28.3

* `Tabs`: Tab Heading hover, focus and active states corrected

## Components

* `Icon`: removes SVGs to fallback to icon font until new SVGs designed
* `Flash`, `Message` and `Toast`: all use `flex` for positioning

# 0.28.2

* `Pod`: now accepts a `displayEditButtonOnHover` prop which will hide the edit button until the mouse is hovering over it.
* `Pod`: now accepts a `triggerEditOnContent` prop will trigger the `onEdit` function when clicking the content.
* `Pod`: the colours of an editable pod have been updated to be more consistent.

# 0.28.1

## Bug Fixes

* Fixes reference to utils from the link component.

# 0.28.0

## :warning: Breaking Changes - Visual Styles

Visual improvements to the design of components, which may impact the colors and font styles used.

* Lato font added
* Colors updated
* Table row active and hover styles
* Font sizes for text

## :warning: Breaking Change - Button colors

* Button color is now determined by a `theme` prop.
* If you are using a red or green button, you must pass props of `as` and `theme`.
* i.e. for a red button

```js
<Button theme='red'>
  Foo
</Button>
```

* For a green button

```js
<Button theme='green' as='secondary'>
  Foo
</Button>
```


## I18n Component

We have added a component to handle I18n translations. The component also supports markdown, allowing developers to safely add HTML markup to translations such as bold tags or hyperlinks.

```
<I18n scope="my.translation" options={{ myVar: "foobar" }} markdown={ true } />
```

## Helpers

* `abbreviateNumber` function is provided for adding 'k' and 'm' style abbreviations for large numbers

## Component Enhancements

* `Button`: now accepts a size and theme prop to determine size and color respectively.
* `Decimal` now emits value of 0 on blur if cleared.
* `Icon`: new Icons added - Draft, Github, Twitter, Dribble and Remove
* `Link`: tabindex default and switch control via a prop
* `MenuList`: autofocuses on filter when a menu is opened
* `Link`: pressing `enter` triggers any `onClick` event
* `Rainbow`: Added the config prop to to be able to control the way
the chart is displayed.
* `TableAjax` now accepts `pageSize` prop.

## Poller Helper

* Added callback to poller helper which is called when the terminating condition is not met

## CSS Changes

* Input prefix is now positioned correctly when using inline labels

# 0.27.2

* `Decimal` component can validate properly with alternative i18n settings

## New Components

* `MenuList`: handles simple `ul` based menus

# 0.27.1

* Heading component can now configure it's divider on/off using the prop 'divider'.

# 0.27.0

## :warning: Breaking Change - Default colour for Pill component has changed. :warning:

* The default behaviour for the Pill component was to previously set as `info`. This is now set as `default` which is a grey colour.
* Ensure you check for any implementations of the Pill component where the `as` prop is not defined and set this to `as='info'`.

## :warning: Breaking Change - Date Component requires importing of locales

* The Date component now uses Strict mode and a I18n locale for parsing date.
* If you require multiple locales for your Date component you will need to import them from moment js
* Please see the [moment js docs](http://momentjs.com/docs/#/use-it/browserify/) for more information

## :warning: Breaking Change :warning:

* `Rainbow` expects the Highcharts library to be already loaded. If your project does not include Highcharts, you need to import it before Rainbow.
```js
import 'react-highcharts/dist/bundle/highcharts';
```

## New Components

* Subheader component created to be used with the Table and TableAjax components

## Component Enhancements

* `ShowEditPod` now closes and cancels editing on Escape keydown.
* `ShowEditPod` puts focus on pod if mounted in editing state.
* `Sidebar` no longer renders a close icon if there is no `onCancel` prop.
* `Date` field uses I18n for formats and sanitizes inputs for passing
* `Content` component can take props of `bodyFullWidth` to set component width to 100%;
* `Date` field uses I18n for formats and sanitizes inputs for passing
* `Step` wizard sub-component now accepts a prop of `enabled`.
* `Table` components now accept an `onPageSizeChange` callback function as a prop.
* `InputValidation` uses `Form` and `Input` in order to ensure messages stay on screen for a short while unless the user hovers on another field
* `Pod` enter triggers edit function and edit element is keyboard accessible
* `Tabs` enter triggers tab load and navigation tabs are keyboard accessible
* `Tabs` focus state is given the same styles as hover state
* `Pager` component now emits which element has changed.
* `Sidebar` now takes a size prop (e.g. `extra-small`, `small`, ...`extra-large`)

## Dependencies

* Moment JS bumped to version 2.15.1

# 0.26.1

## Component Enhancements

* `Decimal` component can prevent decimal value from exceeding the precision setting

# 0.26.0

## New Components

* `Create` component: supplies a button for creating new artefacts.
* Detail component

## Component Enhancements

* `Content` now has additional display options to customise the alignment, to render inline with it's title and to customise the title's width.
* `Link` component now has a prop of `iconAlign` to align icons to the right of the link's text.
* `Row` component can now be given a size to control the size of the gutter using the prop `gutter` (eg. `extra-small`, `small`, `medium`, `large` or `extra-large`).
* `Row` can enable `columnDivide` to add dividing lines between columns.
* `ShowEditPod` requires a tab press to focus on the first field of the contained form rather than automatically focusing on the first field

## Minor Improvements

* Inputs now reset parent tabs error state when unmounted
* Valid Date entry formats can be overridden via I18n
* add helper to focus on input field
* Table Header - sort column no longer overlaps text when right aligned
* Add a currencyFormatter helper to the i18n helpers
* Editable Pod width can be set to full width by setting the prop `editContentFullWidth` to true.
* Refactor Icon component into separate file SVGs
* Ensure portrait component uses https for gravatar images.

## CSS Changes

* Have increased pill font size and weight
* Carbon Components CSS now imports from relative paths
* removes uneccessary space from clearfix in `Row` component
* Aligned MultiActionButton icon to center
* `Content` components now handles wrapping more robustly with single words longer than the content width wrapping correctly
* `Filter` handles it's child inputs more robustly by over-riding widths and margins when children are displayed inline
* Darken colour of text--secondary
* Fieldset - readonly fields maintain border
* Remove italics from text--inactive
* Have increased pill font size and weight
* Carbon Components CSS now imports from relative paths

## Bug Fixes

* Allow carbon to be incorporated into webpack project
* Removed footer from datepicker. This will be reverted in the React 15 Upgrade
* The CSS for applying clears to Row columns has been fixed.
* Tooltips now close when component receives new props.
* Text Area now scrollable except when expandable.
* Pod lifecycle methods are no longer defined as class properties.
* Input validation decorator was not re-checking validity for warnings
* Table sort arrows now point in the correct direction.
* `Pod` applies props to it's container rather than the first child of that container keeping things consistent
* `Pod` filters out any `title` that is not a string before it is applied as an HTML attribute to the underlying element stopping `Object` being output as a browser generated tooltip

# 0.25.4

## Bug Fixes

* Form now tracks error and warning count on instance as well as in state.

# 0.25.3

# Bug Fixes

* Tabs component - added check to ensure that onTabChange is not called if the selectedTabId prop is changed to the existing state of the tabs component

# 0.25.2

## Bug Fix

* Row now supports immutable children.
* Row columns now clear when there are more columns than the defined number.
* Editable Pod is now aligned properly with title.

# 0.25.1

## Bug Fix

* Additional classes were not being applied to the Pod element, this has now been fixed.
* Added missing icon for "entry".

# 0.25.0

## MAJOR VISUAL/LAYOUT CHANGES:

### Updated Carbon Icons Font

New pixel perfect icon font has been added.

### Added Lato as base text font

Lato has now been added as the base font for applications, there are 4 weights introduced, 300(light), 400(regular), 600(semi-bold) and 700(bold). For performance, 3 of the 4 new weights used the Google Font CDN network and the 4th is added via assets.

### CSS and Structural Changes to Pod

The markup structure for pods has been modified, including some adjustments to Pod padding.

The edit action for a Pod has been modified to sit outside of the Pod.

# 0.24.2

## Bug Fix

* Tabs component - added check to ensure that onTabChange is not called if the selectedTabId prop is changed to the existing state of the tabs component

# 0.24.1

* Improves Flash component timeout behaviour.

# 0.24.0

## Carbon Factory Upgrade v0.1.0
* [Carbon Factory Release Notes](https://github.com/Sage/carbon-factory/releases/tag/v0.1.0)

## Updated Flash component API

As well as just a string, the Flash component will now receive a message value with the following:

 * A string: `"Alert"`
 * An array: `["Message One", "Message Two"]`
 * An object with description: `{ description: "My description" }`
 * An object of key/value pairs: `{ first_name: "is required", last_name: "is required" }`
 * An object with description with nested key/value pairs:
   `{ description: { first_name: "is required", last_name: "is required" } }`

# 0.23.1

## Bug Fix

* Tabs component - added check to ensure that onTabChange is not called if the selectedTabId prop is changed to the existing state of the tabs component

# 0.23.0

## Breaking Change - Additional functionality for initialSelectedTabId prop in Tabs component

* Renamed initialSelectedTabId to selectedTabId and onTabClick to onTabChange in the Tabs component
* If selectedTabId is updated the visible tab will change to the value of selectedTabId, this will call the onTabChange function if set.

## Minor Improvements

* Pod component now accepts a alignTitle prop.
* Checkbox input now has `important` set on position.
* Tooltip Decorator now protects against no target or tooltip rendered in the DOM

# 0.22.1

## Bug Fix

* ShowEditPod shows edit content when controlled externally

# 0.22.0

## Breaking Change - CSS Naming

* We have renamed all of our styles to be prefixed with `carbon-` rather than `ui-`. This is to avoid conflicts with existing open source libraries like jQuery UI.

### Example of the CSS Name Change
```
// Before:
.ui-button-toggle__icon--large

// After:
.carbon-button-toggle__icon--large
```

Please ensure you check your application carefully to update any references to these styles when upgrading.

## Minor Improvements

* Show edit pod can now be controlled via props
* Make heading font styles more flexible, providing `h*`, `.h*` and `@include h*()`
* Allow ShowEditPod to receive `false` in its `onEdit` prop to skip rendering of the default edit icon
* Added a 'Payment' icon and a 'Key' icon.
* ShowEditPod now animates between the two states

# 0.21.2

## Minor Improvements

* Help component now opens links in a new tab.

# 0.21.1

## Minor Improvements

* PresenceValidator now returns false for strings that consist only of spaces

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
* Allows `Link` component to handle `mailto:` as an href prefix, previously the `to:` would have been stripped from the string
* Fix error count, when input gets disabled

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

* Fixes bug - 'item is undefined triggered when clicking away from dropdown with option highlighted'.

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
* Form provides a serialization method to parse its inputs into data usable for Ajax.
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
