# Carbon React and JSX Style Guide

## Contents

* [Basics](#basics)
* [Imports](#imports)
* [Exports](#exports)
* [Classes](#exports)
* [Naming](#naming)
* [Order](#order)
* [Functions](#functions)
  * [Binding](#binding)
  * [Private Methods](#private-methods)
* [JSX](#jsx)
  * [Alignment](#alignment)
  * [Spacing](#spacing)
  * [Props](#props)

## Basics

## Imports

## Exports

## Classes

## Naming

## Order

```javascript
class MyReactClass extends React.Component {

  // Static
  static propTypes = {}
  static defaultProps = {}
  
  // Constructor
  constructor(...args) = { super(args) }
  
  // Context
  getChildContext() = {}
  
  // Lifecycle
  componentWillMount() = {}
  componentDidMount() = {}
  componentWillReceiveProps() = {}
  shouldComponentUpdate() = {}
  componentWillUpdate() = {}
  componentDidUpdate() = {}
  componentWillUnmount = {}
  
  // Event Handlers e.g.
  onButtonClick() = {}
  
  // Render
  render() {}
  
  // Extended Renders and Getters e.g.
  renderButtons() {}
  getHeadings() {}
}
```

* Method Prefix Tips:

| Prefix        | Use                                                     | example  |
| ------------- |:--------------------------------------------------------| -----|
| `on`          | Event Handler functions                                 | `onMyEvent` |
| `render`      | Functions that return renderable content e.g. JSX       | `renderButtons` |
| `get`         | Functions that return renderable content e.g. JSX       | `getTableHeader` |
| `has`         | Functions that return a boolean                         | `hasChildren` |
| `is`          | Functions that return a boolean                         | `isValid` |

## Functions

### Binding

* Bind methods within the constructor rather than in the render. A bind call with create a brand new function on every render

```javascript
class MyReactClass extends React.Component {
  constructor(...args) {
    super(args);
    
    this.nameProp = this.nameProp.bind(this);
  }
  
  myFunction() {
    return this.props.name;
  }
}
```

### Private Methods

* Javascript has no understanding of private methods. When working with a React component all methods within a class are Public.
* However you should never call a function from outside of a React Class, React works by composing render methods and therefore the only real public function is the render function.
* If you wish to update a parent/child relation you should use `props` or `state`.

## JSX

### Alignment

```javascript
<Foo>
  <Bar>
</Foo>

<Foo oneProp={ foo } />

<Foo
  oneProp={ foo }
  twoProp={ bar }
  threeProp={ baz }
/>

<Foo
  oneProp={ foo }
  twoProp={ bar }
  threeProp={ baz }
>
  <Child />
</Foo>
```

```
render() {
  return <Foo oneProp={ foo } />
}

render() {
  return (
    <Foo
      oneProp={ foo }
      twoProp={ bar }
      threeProp={ baz }
    />
  );
}
```

### Spacing

### Props

