- Start Date: 2019-10-23

# Summary

`onChange` & `onBlur` interface standardisation

# Basic example

```js
const internalChange = e => {
    e.target = {
      ...(name && { name }),
      ...(id && { id }),
      value: [
        {
          displayText: e.target.innerText,
          optionValue: e.target.value
        }
      ]
    };

    onChange(e);
  };
```

# Motivation

Currently the `onChange` and `onBlur` handlers in Carbon use a mix of custom objects `{value: "my-value"}` and React's `SyntheticEvent`.

In the custom objects, `name` or `id` are passed inconsistently.

The purpose of this RFC is to standardise the approach, so users can rely upon the interface between Carbon and their application.

The approach that we choose should be consistent across components so users familiar with the interface of one component can easily use another component.

# Detailed design

Users who implement this should be familiar with React's [SyntheticEvent](https://reactjs.org/docs/events.html).

When writing a Carbon component the user should wrap the user provided `onChange`/`onBlur` callback with code similar to that in
the basic example.

* Components that provide a formatted value **MUST** replace `SyntheticEvent.target`.
* `SyntheticEvent.target` **MUST** be an object with the properties `name`, `id`, `value`.
* `SyntheticEvent.target` **MUST** include the `name` and `id` of the component (if the component has these props).
```jsx
<Select id="country_id" name="country_name">
  <Option value="UK">United Kingdom</Option>
  <Option value="US">United States</Option>
</Select>
```
> In the example above, the `SyntheticEvent.target` **MAY** be the following object: `{"id": "country_id", "name": "country_name", "value": {"optionValue": "UK", "optionText": "United Kingdom"}}`

* `SyntheticEvent.target` **MUST** have a `value` property, which can be any value, **UNLESS** the component supports
multiple select, in which case the property must be an `Array` of values. If the component supports both single select
and multiple select (controlled by a separate prop), the `value` prop **MUST** be an `Array`.
* Components **MUST NOT** iterate over or replace props on the original `SyntheticEvent.target`
* Components **MAY** reference values from the original `SyntheticEvent.target` or use `SyntheticEvent.nativeEvent.target` as they
are synonymous.
* Components **MUST** accept the unformatted or raw value as the `value` prop when being controlled. 

The approach suggested would modify the `SyntheticEvent` object that React's `EventPool` uses for performance optimisation.

When validating this approach it was important to ensure that we didn't adversely affect the `EventPool`.

* `SyntheticEvent` is constructed from a object in the `pool` [SyntheticEvent.js#L94](https://github.com/facebook/react/blob/16.8.6/packages/react-dom/src/events/ChangeEventPlugin.js#L53)
* `SyntheticEvent.target` is a pointer to `SyntheticEvent.nativeEvent.target` [SyntheticEvent.js#L94](
https://github.com/facebook/react/blob/16.8.6/packages/legacy-events/SyntheticEvent.js#L94)

* React "nullifies" the event properties when released back to the pool [EventBatching.js#L34](https://github.com/facebook/react/blob/16.8.6/packages/legacy-events/EventBatching.js#L34) => [SyntheticEvent.js#L179](https://github.com/facebook/react/blob/16.8.6/packages/legacy-events/SyntheticEvent.js#L179)

I could see no references to `.target` in the [legacy-events](https://github.com/facebook/react/search?q=target+path%3Apackages%2Flegacy-events&unscoped_q=target+path%3Apackages%2Flegacy-events) package.

When validating this approach I reviewed the code of another popular component library, MaterialUI. [This is the same
approach that they have adopted](https://github.com/mui-org/material-ui/blob/v4.5.1/packages/material-ui/src/Select/SelectInput.js#L130).

## Other considerations

1. We currently have components that are controlled by a non-input field, for example `Date`. This is where a 3rd party date
picker changes the underlying `value` of the `<input>`. There is an [outstanding bug in React](https://github.com/facebook/react/issues/13424) which means that `onChange` events attached to `<input>` won't trigger when changing the `value` with `setState`.  
For this reason, when programmatically setting `value` the event **MUST** be a plain object and not a `SyntheticEvent`.
It **MUST** follow all the other requirements above.  
For example:

```js
const internalChange = value => {
  const e = {
    target: {
      {
      ...(name && { name }),
      ...(id && { id }),
      value
    };
    }
  }
  onChange(e);
  };
```
2. React have renamed the `SyntheticEvent` package to `legacy-events` and introduced `react-ui` which was renamed to
`react-interaction/events`. There is an [issue](https://github.com/facebook/react/issues/15257) tracking the process of the new event system codenamed React Flare. At this time we don't know of any breaking changes and all proposed
changes are considered for internal (Facebook) use only.

# Drawbacks

- It would be a breaking change and therefore would require a major version bump.
- Current consumers will be used to the object structure in `__deprecated__` and `src/components` despite it being inconsistent.
- Requires review of all input components.

# Alternatives

- Emit a custom Event/Object, this idea was discarded because it violates the [Principle of Least Astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment). Furthermore, it could make Carbon components harder to extend 
thus violating the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle). Generally
speaking, it is preferable to keep Carbon components as close to their native counterparts as possible.

- Use a different prop name such as `onValueChange`, although this is more descriptive, users expect to have one event
listener for `onChange`. Internally we would still have to attach an `onChange` event to the DOM and call both the user
supplied functions `onChange` and `onValueChange`. This would make the Carbon codebase difficult to read without being
familiar with this RFC.

# Adoption strategy

As we're primarily concerned with `__experimental__` components we do not need to write a code mod.
At the time of writing we're preparing the v9 release. When we cut v9 we expect *some* consumers to require the ability
to upgrade piecemeal. For this reason we're going to publish `carbon-react-v8` so users can consume both old/new components.

# How we teach this

This RFC will be committed to the `sage/carbon` repository where people can review our previous design decisions. When we upgrade `StoryBook` to `5.2` and write detailed documentation, the `onChange` interface should be described in a `prop-table`. We should also include an example story which clearly shows how to use each component.

# Unresolved questions

None.
