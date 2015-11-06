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

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div></div>
    );
  }
};

export default Button;
```

## Creating a basic button

At the moment our component doesn't do much but render an empty div into the page. Lets change this so that a basic html button is rendered instead. Change the `div` tags within the return to `button` tags.

```javascript
// src/components/button/index.js
// ... import and class declaration

  render() {
    return (
      <button></button>
    );
  }
};

// ... export
```

Lets check to see if the button has rendered correctly. Open up your view that you created in the first guide. Import the button and add it to the render method of the view component. For simplicity I have removed the form and its components from the view.

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

To set the content of the button you can insert text between the opening and closing tags as 'children'. The text can take the form of a simple string, icons, images or even other React Components. Take the `Form` component from the previous guide. It takes multiple other react components as its children which are wrapped within the form.

We want to add a child element to the button so that it can display text or an icon but we don't want to hard code this within the component. Instead we want the parent component to be able to pass down the content to the button. We can achieve this by using `props`. In the previous tutorial we saw how to pass props down to a component such as value to a `textbox`. To consume the parsed props we can add `this.props.property`. In this case the property is `children`.


```javascript
// src/components/button/index.js
// ... import and class declaration

  render() {
    return (
      <button>                  // Opening Tag
        { this.props.children } // Child
      </button>                 // Closing Tag
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
      <button>
        { this.props.children }
      </button>
    );
  }
};

// ... export
```

The variable declaration states that this component should receive a prop called children and that the type of this prop should be a string. For more information on propTypes click [here](https://facebook.github.io/react/docs/reusable-components.html).

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

Our button is currently a basic HTML button without any custom styling. We want to add a class name to the button component. Carbon uses [`Block, Element, Modifier` (BEM)](https://en.bem.info/) method to structure the CSS classes.


```javascript
// src/components/button/index.js
// ... class declaration, imports and propTypes

  render() {

    let className = 'ui-button '

    return (
      <button className={ className }>
        { this.props.children }
      </button>
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
* The button can change the CSS class depending on this prop

First lets change the propTypes so that it includes a 'type' and that 'type' is defaulted to 'secondary'. In the example we use 'as' instead of type because 'type' is a reserved word.
* Note: A component doesn't need to define a propType to be able to use that prop. But it stated as good practice to define common and expected props.

```javascript
// src/components/button/index.js
// ... imports

class Button extends React.Component {

  static defaultProps = {
    as: 'secondary',
    children: 'Click Me'
  }

  static propTypes = {
    as: React.PropTypes.string,
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
      <button className={ className }>
        { this.props.children }
      </button>
    );
  }
};

// ... export
```

Reloading the page you will now see that the button has been styled as a 'secondary' button. To create a primary button lets add another button to the JournalReverse view. This time it will pass the 'as' prop down to the component.

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
As always the first thing to do when adding new props to a component is update the propTypes. So lets add the disabled and className props to the propTypes.

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
    as: React.PropTypes.string,
    children: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool.isRequired
  }

// .. render
// ... export
```

Then in the render method we can add `disabled={ this.props.disabled }` to the render method. We can also change the className logic so that incorporates the disabled state and the className Props. Notice the continuation of the BEM style for class names.

```javascript
// src/components/button/index.js
// ... class declaration, imports and propTypes

  render() {
    let {className, ...props} = this.props;

    className = 'ui-button ui-button--' + props.as +
      (props.disabled ? ' ui-button--disabled' : '') + ' ' + className;

    return (
      <button
        className={ className }
        disabled={ props.disabled } >

        { props.children }
      </button>
    );
  }
};

// ... export
```
##### Spread Operator
The first line of the render function uses the spread operator to define a className variable. The statement pulls className out of this.props and sets it to a local className variable. The rest of this.props is assigned to a local props variable. For more information on the spread operator click [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

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
Currently our button component only allows props that have been defined explicitly. We have not even thought about custom events such as onClick. Realistically we can't account for every possible prop that the parent component may or may not pass down to our component.

We can use the spread operator to accept any other properties we pass down without knowing beforehand what those props are. Using `{ ...props }`, we can now pass down a change handler, or any other prop we wish the component to have.

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

## Parsing a onClick

Now that the component has been set up to consume any props that are parsed to it. We can add other functionality without touching the component. Say we want a custom onClick handler in the JournalsReverse Page.

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
    as: 'secondary',
    children: 'Click Me',
    disabled: false
  }

  static propTypes = {
    as: React.PropTypes.string,
    children: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool.isRequired
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
      <button
        className={ className }
        { ...props } >

        { props.children }
      </button>
    );
  }
};

export default Button;
```
