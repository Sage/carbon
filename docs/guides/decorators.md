# Decorators

Decorators provide a way of sharing code between classes.

A decorator is a function which receives a class. It extends that class with one that it defines within the function, it then returns the new extended version of that class.

This means we can extend as many decorators as we like - for example, a typical input component may use one or more different decorators:

```js
import React from 'react';
import Input from 'carbon-react/lib/utils/decorators/input';
import InputLabel from 'carbon-react/lib/utils/decorators/input-label';
import InputValidation from 'carbon-react/lib/utils/decorators/input-validation';

const Textbox = Input(InputLabel(InputValidation(
class Textbox extends React.Component {

}
)));

export default Textbox;
```

In the example above we have a React component called `Textbox`. We pass this class through three different decorators which result in a single class extended by all (this is assigned to a `const` called `Textbox`).

The decorators can provide additional functionality and additional HTML, CSS and other assets.

It is recommended that any methods you define in a decorator also call `super`, this means that if the original class defines a method with the same name it won't override it.
