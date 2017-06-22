# Immutable

All of our React components are fed data as JSON objects. The data is stored in our Flux stores, which also take care of transforming the data when an action occurs and refeeding the new data to our React components.

It is important to understand that when the data updates in the store, and the component calls `setState` on itself with the new data, the entire component and its children are re-rendered.

That is an expensive task! However, React is clever enough to calculate the minimum number of DOM manipulations it needs to do on each render using its Virtual DOM. You can read more about performance in your React components [here](https://facebook.github.io/react/docs/advanced-performance.html). So we can use Immutable data to make our components more performant. Immutable data also gives us the benefit of knowing exactly what happens to our data when we modify it and use it in multiple places.

We recommend you get familiar with Immutable.js through their [websites documentation](https://facebook.github.io/immutable-js/).

## Using Immutable.js with Carbon

Some of our components require immutable data to function correctly - so we recommend you use it to store your data.

We have provided an object of helper functions when working with Immutable.js, which parses your data in a recommended format:

```js
import ImmutableHelper from 'carbon-react/lib/utils/helpers/immutable';
```

Available functions:

* `parseJSON`
   - When initializing your data, use the `parseJSON` function. This ensures your data object is setup correctly.
