## :warning: This is a working document and may not reflect current best practice.
## :warning: Carbon is still in alpha and subject to change.

# Creating a Component

## Introduction

Carbon provides modular, reusable components written with the [React](https://facebook.github.io/react/) JavaScript library. Carbon aims to provide a wide range of useful components but specific requirements may require you to create your own custom components.

In this guide, we will walk through building a simple React Component - A Button.

Before you begin you may want to have a look at some of the components currently available in [Carbon](https://github.com/Sage/carbon/tree/master/src/components).

## Component file structure

A Carbon React component usually contains 4 files in its directory:

* `index.js`      - Main Code
* `__spec__.js`   - Test File
* `package.json`  - [Optional] load dependencies e.g. stylesheets
* `style.scss`    - [Optional] Sassy Stylesheet file for component

## Setup

Navigate to the directory that contains your current project - if you followed the guide to [building a view](01_building_views.md) this will be the ui directory - then run the following command:

```
carbon component button
```

You are prompted to confirm the location and name of the new component. Enter `y` to continue.

## Understanding the boilerplate

The `index.js` file contains a class representing our component which extends from a base React component.

Each component must contain a render method which returns a tree of React components that will be converted into HTML.

```javascript
// src/components/button/index.js
import React from 'react';
import PropTypes from 'prop-types';

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

At the moment our component doesn't do much but render an empty div into the page. Let's change this so that a basic html button is rendered:

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

**Note:** Although the `div` tag isn't necessary in this case, JSX requires it if there is more than element in a `return` function, so it's good practice to include it.

## Add the button to our view

To see if our button is rendering correctly, we'll add it to our view. 

We need to import Button then we'll replace our entire view with just the Button component:

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

If we refresh our app, we should now see a simple button with no text or styling.

## Add text to our button

To set the content of the button you can insert text between the opening and closing tags as 'children'. This text can take the form of a simple string, icons, images or even other React Components. 

We want to add a child element to our button so that it can display text or an icon but we don't want to hard code this in the component. Instead, we want the parent component to be able to pass down the content to the button. 

We can achieve this by using `props`. In the guide to [building a view](01_building_views.md), we saw how to pass props down to a component and how to consume them using `this.props.property`. 

In this case the property is `children`:

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

We can then update our view to pass down the children prop to the Button:

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

Refreshing our app should add the text 'Save' to our button.

## Prop types

When creating React components it's important to define the `propTypes` for that component. This allows other developers to quickly understand what the component needs to function:

```javascript
// src/components/button/index.js
// ... imports

class Button extends React.Component {

  static propTypes = {
    children: PropTypes.string.isRequired
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

The variable declaration states that this component should receive a prop called children and that the type of this prop should be a string. We have also made this prop required. Further information on propTypes is available [here](https://facebook.github.io/react/docs/reusable-components.html).

Component props can also be defaulted to a particular value. To default the prop value we need another variable called `defaultProps`:

```javascript
// src/components/button/index.js
// ... imports

class Button extends React.Component {

  static defaultProps = {
    children: 'Click Me'
  }

  static propTypes = {
    children: PropTypes.string.isRequired
  }

// .. render
// ... export
```

Removing the child element from our view will change the button text to 'Click Me'.

## Adding CSS classes

Our button currently has no custom styling. We want to add a class name to the Button component to add some styling.

Carbon uses the [`Block, Element, Modifier` (BEM)](https://en.bem.info/) pattern to structure the CSS classes:

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

**Note:** We use `let className` instead of `var className`. [`let`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let) was introduced in ES6 and declares a variable limited to the scope of the block or statement it was created in. In comparison, the [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var) creates a variable with a global scope.

### Primary and Secondary

Our Button component has two possible types - Primary and Secondary. These types provide different styling and we want the button to be secondary by default. This requirement means that we need to provide functionality so:

* The button can consume a type prop
* The prop must default to 'secondary'
* The button accepts the CSS corresponding to its type

First of all, let's update our propTypes to add `type` and default this to `secondary`:

```javascript
// src/components/button/index.js
// ... imports

class Button extends React.Component {

  static defaultProps = {
    as:       'secondary',
    children: 'Click Me'
  }

  static propTypes = {
    as:       PropTypes.string,
    children: PropTypes.string.isRequired
  }

// .. render
// ... export
```

**Note:** A component doesn't need to define a propType to be able to use that prop, but it's good practice to define common and expected props. Note also that we could have used `type: 'secondary'` instead of `as`. This is to allow developers to use the native `type` attribute of html buttons.

Now that the propTypes have been set up we can add type to the list of classes being set on the the Button:

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

If you refresh the app now, our Button should now be styled as a 'secondary' button.

Let's add second button to our view, styled as 'primary':

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

There are two further requirements for our Button component:

* We want to be able to add a disabled state via props.
* We want the parent component to be able to pass down custom classes.

First, let's add the new props to `propTypes` and `defaultProps`:

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
    as:        PropTypes.string,
    children:  PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled:  PropTypes.bool.isRequired
  }

// .. render
// ... export
```

Now we can update the view to pass down the relevant props.

So in the render method we can add `disabled={ this.props.disabled }`. We can also change the className logic so that it incorporates the disabled state and the className props.

Notice the continuation of the BEM style for class names. (You'll also notice we're doing something a little odd with `{...props}` - we'll explain that next!)

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

The first line of the render function uses the spread operator to define a className variable. The statement pulls className out of `this.props` and sets it to a local className variable. The rest of `this.props` is assigned to a local `props` variable. More information about the spread operator is available [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

We can now add another button to our view, this time passing a disabled state down to the component:

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

If you refresh the page again, you should now see 3 buttons on the page - one primary (Save), one secondary (Click Me) and one secondary disabled (Click Me).

## Other Props

Currently, our Button component only allows props that have been defined explicitly. We haven't yet thought about binding events such as `onClick`. We may also want to add other props to a `Button` in the future. Rather than having to go back and update the `Button` component to accept every conceivable prop, we use `{...props}`.

Using `{ ...props }`, we can now pass down a change handler, or any other prop we want the component to have:

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

Now that the component has been set up to consume any props that are passed to it, we're free to add other functionality without touching the component.

Let's add a custom `onClick` handler to our view:

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

Now when you click the middle button, you should receive an output in your developer console.

## Final Code

### Journals Reverse view

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

### Button component

```javascript
import React from 'react';

class Button extends React.Component {

  static defaultProps = {
    as:       'secondary',
    children: 'Click Me',
    disabled: false
  }

  static propTypes = {
    as:        PropTypes.string,
    children:  PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled:  PropTypes.bool.isRequired
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
