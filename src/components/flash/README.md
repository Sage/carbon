## A Flash widget.

The flash is rendered in two sections: a ventral message 'flash', and a
dorsal coloured, expanding 'slider'.

### How to use an Flash in a component:

In your file:

```js
  import Flash from 'carbon-react/lib/components/flash';
```

To render a Flash, setup open and cancel handlers in your view to trigger
the message on and off:

```js
 <Flash open={ openStatus } onDismiss={ myOnDismiss } message='Alert!' />
```

By default, the flash renders with a clickable close icon that hooks up with the onDismiss function.
To instead have the flash disappear after a given time period, pass a prop of timeout in milliseconds.

```js
 <Flash open={ openStatus } onDismiss={ myOnDismiss } message='Alert!' timeout={ 2000 }/>
```

The flash message can be formatted in the following ways:

 * A string: `"Alert"`
 * An array: `["Message One", "Message Two"]`
 * An object with description: `{ description: "My description" }`
 * An object of key/value pairs: `{ first_name: "is required", last_name: "is required" }`
 * An object with description with nested key/value pairs:
   `{ description: { first_name: "is required", last_name: "is required" } }`
