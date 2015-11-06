## :warning: This is a working document and may not reflect current best practice.
## :warning: Carbon is still in alpha and subject to change.

# Building a Basic Component in Carbon

## Introduction

Carbon provides modular, re-useable components written with [React](https://facebook.github.io/react/) Javascript library. Carbon aims to provide a wide range of useful components but specific requirements may require you to create your own custom components.

In this guide, we will walk through building a simple React Component - A Button.

Before you begin you may want to have a look at some of the components currently available in Carbon found [here](https://github.com/Sage/carbon/tree/master/src/components).

## Component File Structure

A Carbon React component will usually contain 4 files within its directory.

* `index.js`      - Main Code
* `__spec__.js`   - Test File
* `package.json`  - [Optional] load dependencies e.g. stylesheets
* `style.scss`    - [Optional] Sassy Stylesheet file for component

## Setup

To begin, navigate to the directory that contains your current project. If you followed the first tutorial this will be the ui directory. Then run the following command:

```
carbon component button
```

This will prompt you to confirm the location and name of the new component. Type `y` and press `enter` to create the component.

You are now able to navigate to the components directory where the `index.js` file and the `__spec__.js` file will exist.

## Understanding the boilerplate

The `index.js` file contains a class representing our component which extends from a base React Component.

Each component must contain a render method which returns a tree of React components that will be converted into HTML.

```javascript
// src/components/button/index.js
import React from 'react';

class Button extends React.Component {

  render() {
    return (
      <div></div>
    );
  }
};

export default Button;
```

## Creating a basic button

At the moment our component doesn't do much but render an empty div into the page. Let's change this so that a basic html button is rendered instead. Add `button` tags inside the rendered `div`. Although the `div` tag isn't necessary in this case, JSX requires it if there is more than element in a `return` function, so it's good practice to include it.

```javascript
// src/components/button/index.js
// ... import and class declaration

  render() {
    return (
      <div>
        <button></button>
      </div>
    );
  }
};

// ... export
```

Let's check to see if the button has rendered correctly. Open up your view that you created in the first guide. Import the button and add it to the render method of the view component. For simplicity I have removed the form and its components from the view.

```javascript
// ui/src/views/journals/reverse/index.js

// ...import statements

import Button from './../../../src/component/button';

class JournalsReverse extends React.Component {

  render() {
    return (
      <div>
        <Button />
      </div>
    )
  }
};

// ... export
```

The code should produce a small button that doesn't contain any text or icons.

To set the content of the button you can insert text between the opening and closing tags as 'children'. The text can take the form of a simple string, icons, images or even other React Components. Take the `Form` component from the previous guide, for example. It takes multiple other react components as its children which are wrapped within the form.

We want to add a child element to the button so that it can display text or an icon but we don't want to hard code this within the component. Instead we want the parent component to be able to pass down the content to the button. We can achieve this by using `props`. In the previous tutorial we saw how to pass props down to a component such as value to a `textbox`. To consume the parsed props we can add `this.props.property`. In this case the property is `children`.


```javascript
// src/components/button/index.js
// ... import and class declaration

  render() {
    return (
      <div>
        <button>                  // Opening Tag
          { this.props.children } // Child
        </button>                 // Closing Tag
      </div>
    );
  }
};

// ... export
```
We can then change the JournalsReverse view to pass down the children prop to the button.

```javascript
// ui/src/views/journals/reverse/index.js

// ...import statements

class JournalsReverse extends React.Component {

  render() {
    return (
      <div>
        <Button>  // Opening Tag
          Save    // Child
        </Button> // Closing Tag
      </div>
    )
  }
};
```

Refreshing the page should show a button containing the word 'Save'.

## Prop Types

When creating react components it is important to define the propTypes for that component. This allows other developers to quickly understand what the component needs to function. To define props types we create a static variable `propTypes`.

```javascript
// src/components/button/index.js
// ... imports

class Button extends React.Component {

  static propTypes = {
    children: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <button>
          { this.props.children }
        </button>
      </div>
    );
  }
};

// ... export
```

The variable declaration states that this component should receive a prop called children and that the type of this prop should be a string. We have also made this prop required. For more information on propTypes click [here](https://facebook.github.io/react/docs/reusable-components.html).

Component Props can also be defaulted to a particular value. To default the prop value we need another variable called defaultProps.

```javascript
// src/components/button/index.js
// ... imports

class Button extends React.Component {

  static defaultProps = {
    children: 'Click Me'
  }

  static propTypes = {
    children: React.PropTypes.string.isRequired
  }

// .. render
// ... export
```

Removing the text from between the opening and closing tags in the Journals View will change the button text to say 'Click Me'.

## Adding CSS Classes

Our button is currently a basic HTML button without any custom styling. We want to add a class name to the button component. Carbon uses the [`Block, Element, Modifier` (BEM)](https://en.bem.info/) pattern to structure the CSS classes.


```javascript
// src/components/button/index.js
// ... class declaration, imports and propTypes

  render() {

    let className = 'ui-button '

    return (
      <div>
        <button className={ className }>
          { this.props.children }
        </button>
      </div>
    );
  }
};

// ... export
```

* Note: We are using `let className` instead of `var className`. The definition of [`let`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let) was introduced in ES6 and declares a variable limited to the scope of the block or statement it was created in. In comparison the [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var) creates a variable with a global scope.

### Primary and Secondary

Throughout our app the button has two possible types. Primary and Secondary. These two types provide different styling and we want the button to be secondary by default. This requirement means that we need to provide functionality so:
* The button can consume a type prop
* The prop must be defaulted to 'secondary'
* The button accepts the CSS corresponding to its type

First lets change the propTypes so that it includes a `type` and that this is defaulted to `secondary`.
* Note: A component doesn't need to define a propType to be able to use that prop. But it is good practice to define common and expected props.

```javascript
// src/components/button/index.js
// ... imports

class Button extends React.Component {

  static defaultProps = {
    as:       'secondary',
    children: 'Click Me'
  }

  static propTypes = {
    as:       React.PropTypes.string,
    children: React.PropTypes.string.isRequired
  }

// .. render
// ... export
```
Now the propTypes have been set up we can add the type to the list of classes being set on the the button.

```javascript
// src/components/button/index.js
// ... class declaration, imports and propTypes

  render() {

    let className = 'ui-button ui-button--' + this.props.as;

    return (
      <div>
        <button className={ className }>
          { this.props.children }
        </button>
      </div>
    );
  }
};

// ... export
```

Reloading the page you will now see that the button has been styled as a 'secondary' button. To create a primary button let's add another button to the JournalReverse view. This time it will pass the 'as' prop down to the component.

```javascript
// ui/src/views/journals/reverse/index.js

// ...import statements

class JournalsReverse extends React.Component {

  render() {
    return (
      <div>
        <Button as={ 'primary' }>Save</Button>
        <Button />
      </div>
    )
  }
};
```

There are two more requirements needed from the button component. First we want to be able to add a disabled state via props. The second is that we want the parent component to be able to pass custom classes to the component.

### Disabled state
As always the first thing to do when adding new props to a component is update the propTypes. So let's add the disabled and className props to the propTypes.

```javascript
// src/components/button/index.js
// ... imports

class Button extends React.Component {

  static defaultProps = {
    as: 'secondary',
    children: 'Click Me',
    disabled: false
  }

  static propTypes = {
    as:        React.PropTypes.string,
    children:  React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    disabled:  React.PropTypes.bool.isRequired
  }

// .. render
// ... export
```

Then in the render method we can add `disabled={ this.props.disabled }`. We can also change the className logic so that it incorporates the disabled state and the className props. Notice the continuation of the BEM style for class names. (You'll notice we're doing something a little odd with `{...props}`, we'll explain that next - trust us.)

```javascript
// src/components/button/index.js
// ... class declaration, imports and propTypes

  render() {
    let {className, ...props} = this.props;

    className = 'ui-button ui-button--' + props.as +
      (props.disabled ? ' ui-button--disabled' : '') + ' ' + className;

    return (
      <div>
        <button
          className={ className }
          disabled={ props.disabled } >

          { props.children }
        </button>
      </div>
    );
  }
};

// ... export
```
##### Spread Operator
The first line of the render function uses the spread operator to define a className variable. The statement pulls className out of this.props and sets it to a local className variable. The rest of `this.props` is assigned to a local `props` variable. For more information on the spread operator click [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

We can now add another button to the Journals Reverse page. This time we want to pass a disabled state down to the component.

```javascript
// ui/src/views/journals/reverse/index.js

// ...import statements

class JournalsReverse extends React.Component {

  render() {
    return (
      <div>
        <Button as={ 'primary' }>Save</Button>
        <Button />
        <Button disabled />
      </div>
    )
  }
};
```

Refreshing the page you should be able to see three buttons on the page. One primary (Save), one secondary (Click Me) and one secondary disabled (Click Me).

## Other Props
Currently our button component only allows props that have been defined explicitly. We have not even thought about binding events such as `onClick`. We may also want to add other props to a `Button` in the future. Rather than having to go back and update the `Button` component to accept every conceivable prop, we use `{...props}`.

Using `{ ...props }`, we can now pass down a change handler, or any other prop we wish the component to have.

```javascript
// src/components/button/index.js
// ... class declaration, imports and propTypes

  render() {
    let {className, ...props} = this.props;

    className = 'ui-button ui-button--' + props.as +
      (props.disabled ? ' ui-button--disabled' : '') + ' ' + className;

    return (
      <button
        className={ className } // we have extracted this from props
        { ...props } >

        { props.children } // Children is a special props case
      </button>
    );
  }
};

// ... export
```

## Handling an `onClick`

Now that the component has been set up to consume any props that are passed to it. We can add other functionality without touching the component. Let's add a custom onClick handler to JournalsReverse.

```javascript
// ui/src/views/journals/reverse/index.js

// ...import statements
class JournalsReverse extends React.Component {

  handleOnClick = () => {
    console.log("Clicked...");
  }

  render() {
    return (
      <div>
        <Button as={ 'primary' }>Save</Button>
        <Button onClick={ this.handleOnClick }/>
        <Button disabled />
      </div>
    )
  }
};
```
As a result, when the middle button is clicked you should receive an output in your developer console.

## Final Code

### Journals Reverse

```javascript
// ui/src/views/journals/reverse/index.js
import React from 'react';
import JournalStore from 'stores/journals';
import View from 'carbon/lib/utils/view';

import Button from './../../../components/button';

class JournalsReverse extends React.Component {

  handleOnClick = () => {
    console.log("Clicked...");
  }

  render() {
    return (
      <div>
        <Button as={ 'primary' }>Save</Button>
        <Button onClick={ this.handleOnClick } />
        <Button disabled />
      </div>
    )
  }
};

export default View(JournalsReverse, { journal_store: JournalStore });
```

### Button Component

```javascript
import React from 'react';

class Button extends React.Component {

  static defaultProps = {
    as:       'secondary',
    children: 'Click Me',
    disabled: false
  }

  static propTypes = {
    as:        React.PropTypes.string,
    children:  React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    disabled:  React.PropTypes.bool.isRequired
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let {className, ...props} = this.props;

    className = 'ui-button ui-button--' + props.as +
      (props.disabled ? ' ui-button--disabled ' : ' ') + className;

    return (
      <div>
        <button
          className={ className }
          { ...props } >

          { props.children }
        </button>
      </div>
    );
  }
};

export default Button;
```
