# Retrieving Data

We recommend retrieving data in your application based on two scenarios:

1. You need the data on page load.
2. You **do not** need the data on page load.

## On Page Load

The easiest way to provide the data from the server on page load is to render it to the page as JSON. This means your stores can read the data straight from the page and are not required to perform additional requests to the server for the data.

Within our Ruby on Rails applications , you can do this by assigning your JSON data to an instance variable labelled `@view_data`. The Rails app will automatically render this object to the browser.

For example, your Rails controller action:

```rb
def index
  @view_data = {
    contact: @contact
  }
end
```

In your JavaScript you can then access it using the globally accessible variable `VIEW_DATA`:

```js
let data = {
  contact: global.VIEW_DATA.contact
};
```

*NOTE:* The Rails applications also provide globally accessible JavaScript variables with useful reusable data for `global.APP_DATA`, `global.USER_DATA` and `global.BUSINESS_DATA`.

If you are using Immutable data this initial data should be wrapped in a parseJSON function:

```js
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';

let data = ImmutableHelper.parseJSON({
  contact: global.VIEW_DATA.contact
});
```

## Not On Page Load

If you do not need the data on page load, then you should retrieve the data via a JSON endpoint. This means we are not wasting server load for data we do not immediately need and only ask the server for the information when we need it.

Once you have your JSON endpoint, in your React component you can tell it to retrieve the data when the component mounts:

```js
componentDidMount() {
  MyActions.getData(); // this action will use AJAX to retrieve your data
}
```

## Mixing Both Methods

For a fully flexible component, that may render on page load in some areas or may render after a user interaction, we could even mix both methods. You only need to update the `componentDidMount` method to perform a check before triggering the AJAX action:

```js
componentDidMount() {
  // only get the data from the server if the data is not rendered to the global namespace
  if (!global.VIEW_DATA.my_data) {
    MyActions.getData();
  }
}
```
