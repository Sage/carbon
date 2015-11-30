# Immutable

All of our React components are fed data as JSON objects. The data is stored in our Flux stores, which also take care of transforming the data when an action occurs and refeeding the new data to our React components.

It is important to understand that when the data updates in the store, and the component calls `setState` on itself with the new data, the entire component and its children are re-rendered.

That is an expensive task! However, React is clever enough to calculate the minimum number of DOM manipulations it needs to do on each render using its Virtual DOM. You can read more about performance in your React components [here](https://facebook.github.io/react/docs/advanced-performance.html). So we can use Immutable data to make our components more performant. Immutable data also gives us the benefit of knowing exactly what happens to our data when we modify it and use it in multiple places.

We recommend you get familiar with Immutable.js through their [websites documentation](https://facebook.github.io/immutable-js/).

## Using Immutable.js with Carbon

Some of our components require immutable data to function correctly - so we recommend you use it to store your data.

We have provided an object of helper functions when working with Immutable.js, which take care of some tricky tasks for you. You can import the helper like this:

```js
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';
```

Available functions:

* `parseJSON`
   - When initializing your data, use the `parseJSON` function. This ensures your data object is setup correctly.
* `updateLineItem`
   - As a collection is usually an array of objects, when we want to update a particular object in the array we need to know the index of where it sits. Instead, `updateLineItem` takes the ID of the object, finds it in the array and updates the specified value for you.
* `deleteLineItem`
   - Again, as a collection is usually an array we need to know the objects index. `deleteLineItem` will take the ID of the object and look it up and delete the object for you.
* `getLineItemIndex`
   - This is the function used to find the object in the array with a particular ID.
