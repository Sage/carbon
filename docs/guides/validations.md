# Validations

Form components in Carbon are set up to handle validations.

The Carbon library provides a [selection of validations](https://github.com/Sage/carbon/tree/master/src/utils/validations) for you. The example below shows how you can apply a validation to an input:

```js
import React from 'react';
import Textbox from 'carbon-react/lib/components/textbox';
import Presence from 'carbon-react/lib/utils/validations/presence';

class MyComponent extends React.Component {
  render() {
    return (
      <Textbox name="foo"
        value={ this.state.myStore.get('foo') }
        validations={ [new Presence()] }
      />
    )
  }
}

export default MyComponent;
```

You can apply as many validations to the input as you like by adding more to the array.

## With a Form

Usually, your inputs will sit inside a form component. The Carbon form component uses the validation API to run validation checks when you try and submit the form. It also keeps track of the number of invalid fields to display data to the user in a validation summary.


```js
import React from 'react';
import Form from 'carbon-react/lib/components/form';
import Textbox from 'carbon-react/lib/components/textbox';
import Presence from 'carbon-react/lib/utils/validations/presence';

class MyComponent extends React.Component {
  render() {
    return (
      <Form>
        <Textbox name="foo"
          value={ this.state.myStore.get('foo') }
          validations={ [new Presence()] }
        />
      </Form>
    )
  }
}

export default MyComponent;
```

## Defining New Validations

A validation, such as the presence validation provided by Carbon, is just a class with two functions.

The class should define:

* A `validate` method returns a boolean.
* A `message` method which returns the message to display if the input is invalid.

Below is an example of how to setup a validation:

```js
class MyValidator {
  validate = (value) => {
    if (value === 'foobar') {
      return false;
    } else {
      return true;
    }
  },

  message = () => {
    return "foobar is an invalid value!";
  }
};

export default MyValidator;
```
