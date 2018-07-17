# Integrating React with Other UI

As we integrate React components into pre-existing user interfaces, we may need to interact between the two. This guide offers solutions to a few different problems.

## 1) Rendering a React Component Amongst Other UI

You may need to replace, or add, a React component in the middle of pre-existing UI. Let's use an example of a Contact page, and you want to add an address component into the existing form - without fully replacing the form.

First of all, you need to create your `ContactAddress` component:

```js
class ContactAddress extends React.Component {
  render() {
    return null;
  }
}
```

Next you should render this component as part of your applications routes, using React Router:

```js
let routes = (
  <Route path="/contact/:id" component={ ContactAddress } />
);
```

At this point, your empty component should be rendering to the correct page. Next we need to get your component to render to the correct place in the UI.

In your existing UI, add an empty `div` to the target location - and give it a unique ID. For example:

```html
<div id="contact-address"></div>
```

Back to your original component, we can now use the `MountInApp` component to render the address to this location:

```js
class ContactAddress extends React.Component {
  render() {
    return (
      <MountInApp targetId="contact-address">
        <MyAddressComponent />
      </MountInApp>
    );
  }
}
```

You can render any component you want (or multiple components), but it should be rendering within the existing UI.

Once the rest of the page is eventually converted to React components, all you need to do to this component is remove the `MountInApp` component instead only render your `MyAddressComponent` as part of the regular render function.

## 2) Triggering an Action External to React/Flux

Another issue you may have is that you need to trigger or initialise your React component from an action that occurs external to your React/Flux pattern.

The simplest way to do this is to build your React component normally, and to expose the action to the global namespace.

For example, let's say you want a React dialog to open when a user clicks a button from existing UI. You can build your React dialog connected to your Flux store:

```js
class MyDialog extends React.Component {
  render() {
    return <Dialog open={ this.store.get('dialog_open') } />;
  }
}

export default connect(MyDialog, MyStore);
```

This dialog will now open when the store sets the `dialog_open` state to `true`. Let's imagine we have created an action to open the dialog (`MyActions.openDialog`) and have subscribed our store to update when this has been called.

Next we need to expose that action to the global namespace, so any JavaScript can trigger it (we normally add this to `main.js`:

```js
global.Carbon = {
  openMyDialog: MyActions.openDialog
};
```

Now we can go to our existing UI and legacy JS and trigger this action:

```js
Carbon.openMyDialog();
```

As long as the `MyDialog` component is rendered to that page, it should open.

Further to this, you can pass any additional information you need to the React component when you call these actions, including any callbacks you may need for when the React component has finished and it needs to pass information back the legacy JavaScript:

```js
function myCallback() {
  // is called when React is finished and passes data back to the legacy UI
}

Carbon.openMyDialog("foobar", myCallback);
```

If you pass these additional arguments, you just need to store them in your Flux store so you can access them later.
