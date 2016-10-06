# Best Practices for writing CSS in Carbon and in external components

## Use nested BEM syntax

**good**

```
.block {
  &--modified {
    .block__element {  }
  }
  &__element {
    &--modified {  }
  }
}
```

**pretty good, but not prefered**

```
.block {  }
.block__element {  }
.block--modified {  }
.block__element--modified {  }
.block--modified .block__element {  }
```

## Always use classes for elements

**good**

Classes are used throughout so will not over-ride each other

```
.table {
  &__td {
    // styles are also applied
  }
  &__td--modified {
    // styles
  }
}
```

**bad**

Using nested element (td in this case)

```
.table {
  td {
    // unwanted over-riding happens here - specificity is 0 0 1 1
  }
  &__td--modified {
    // styles are over-ridden, specificity is 0 0 1 0
  }
  &__td--modified.table__td--modified {
    // will over-ride, but styles become more specific and file cluttered
  }
}
```

## In views and other containing components only nest to over-ride things

**good**

Where `carbon-composed-component` could be something in an intermediate library or a more complex component from Carbon itself.

```
.my-view {
  .carbon-common-component {
    // this will be enough in a lot of cases
  }
}

.my-view {
  .carbon-composed-component {
    .carbon-common-component {
      // if the carbon composed component also follows this pattern
    }
  }
}
```

**bad**

```
.my-view {
  .my-subview {
    .carbon-common-component {
      // unnecessary intermediate nesting - it should be possible to target any Carbon class for over-riding with just one level of containing nesting
    }
  }
}
```

This makes SASS objects less verbose and keeps the relationship between block and element more clear.

## Order CSS Properties based on logical groupings rather than alphabetically

Certain sets of properties in css are tightly logically tied and should be grouped together in order to make the css easier to maintain.

The following groups should be kept together in CSS definitions and separated from other groups by a single line:

* **dimensions**: width and height
* **positioning and display**: display, position, top, good, bottom, left, transforms, box-sizing
* **box edge definitions**: border, margin, padding, box shadow, border radius
* **font and text**: font-*, text-* and color
* **background**: opacity, background-image, cursor pointer etc.
* **animations**: transition, keyframe
* **miscellaneous**: a group for anything that doesn't fit the above

Within groups alphabetical ordering is preferred.
