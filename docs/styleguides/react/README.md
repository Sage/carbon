# Carbon React and JSX Style Guide

## Contents

* [Basics](#basics)
* [Imports](#imports)
* [Exports](#exports)
* [Classes](#exports)
* [Naming](#naming)
* [Order](#order)
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

