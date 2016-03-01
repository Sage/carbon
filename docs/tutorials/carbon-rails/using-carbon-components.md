## :warning: This is a working document and may not reflect current best practice.
## :warning: Carbon is still in alpha and subject to change.

# Using Carbon Components

## Where we left off

In our previous Hello World Tutorial we had created a simple view
that displayed `Hello World!` within a div component.

```javascript
// ui/src/views/welcome/welcome.js

import React from 'react';

class Welcome extends React.Component {
  render() {
    return (
      <div>Hello World!</div>
    )
  }
};

export default Welcome;
```

## Importing a Component

Let try importing some textboxes into our component. At the top of the view add the following line

```
import Textbox from 'carbon/components/textbox';
```

Then within our Render function we want to return the Textbox

```javascript
render() {
  return (
    <Textbox />
  )
}
```

If you have gulp running while editing your react code it should be watching for any file changes and re-run the gulp
command for you. Open up your browser and refresh the page. You should see a Textbox running across the page.

Lets add some small customisation to our Textbox. The Carbon Textbox component allows for a number of `props` to be passed to it including `label` and `labelInline`.

```javascript
render() {
  return (
    <Textbox
      name='firstname'
      label='First Name'
      labelInline={ true }
    />
  )
}
```

Refresh your browser page and the Textbox should have a 'First Name' label inline with the Textbox.


