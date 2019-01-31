# Mount In App

Can be used to integrate React components into pre-existing user interfaces.

## How to use a AppWrapper in a component:

* In your file

```javascript
import MountInApp from 'carbon-react/lib/components/mount-in-app';
```

*  To render a MountInApp:

Imagine that your pre-existing user interface has
a `<div id="put_carbon_component_here" />` inside
which you want to put some Carbon components.

To do that create a new React component that renders:

```javascript

  <MountInApp targetId="put_carbon_component_here">
    // Children
  </MountInApp>
```

That way all `Children` of the `MountInApp` component will be rendered inside
of the `put_carbon_component_here` div.
