- Start Date: tbc

# Table of contents

- [Summary](#summary)
- [Basic example](#basic-example)
- [Motivation](#motivation)
- [Detailed design](#detailed-design)
- [Drawbacks](#drawbacks)
- [Alternatives](#alternatives)
- [Adoption strategy](#adoption-strategy)
- [How we teach this](#how-we-teach-this)
- [Unresolved questions](#unresolved-questions)

# Summary

Currently Carbon is a JavaScript component library, in which we also provide TypeScript interfaces for our components.

This is a duplication of effort and a large cause of issues raised against the library as the JavaScript/TypeScript prop types are often out of step with one another.

This RFC will detail why and how we should convert Carbon from a JavaScript library, to a TypeScript one.

From here onwards, JavaScript will be refered to as js, and TypeScript as ts.

# Basic example

In the current js implementation of Carbon, a simple component will look like this (using the [`prop-types`](https://www.npmjs.com/package/prop-types) library):

```jsx
// my-component.component.js
const MyComponent = ({ propOne, propTwo, ...rest }) => {
  /* Component logic goes here */

  return <MyStyledComponent>{/* Content */}</MyStyledComponent>;
};

MyComponent.propTypes = {
  propOne: PropTypes.string.isRequired,
  propTwo: PropTypes.boolean,
};

export default MyComponent;
```

In order for a ts project to consume this component we also provide a separate ts interface:

```ts
// my-component.d.ts
export interface MyComponentProps {
  propOne: string;
  propTwo?: boolean;
}

declare function MyComponent(props: MyComponentProps): JSX.Element;

export default MyComponent;
```

Converting the project to ts would result in the same component looking like this, in a single file and the prop types defined in one place:

```tsx
// my-component.component.tsx
type MyComponentProps = {
  propOne: string;
  propTwo?: boolean;
};

const MyComponent: React.FC<MyComponentProps> = ({
  propOne,
  propTwo,
  ...rest
}: MyComponentProps) => {
  /* Component logic goes here */

  return <MyStyledComponent>{/* Content */}</MyStyledComponent>;
};

export default MyComponent;
```

# Motivation

For every single component in Carbon we currently define the prop types in two places, as shown in the basic example section above. Not only does this double (or more than double)
the amount of code required, it makes it very easy for the prop types to get out of step between the js and ts interfaces.

This is a common occurance and a significant amount of the issues raised on the Carbon Github page relate to either the prop types being out of step, or the ts types being incorrect. This is causing very prevantable bugs and unecessary extra maintainence for the Carbon team.

A large amount of the more modern Sage repositories consuming Carbon are ts projects and it would make sense to align the technologies used, and upskill Carbon developers in using ts so they are more versatile in being able to help out with other projects.

The [React documentation](https://reactjs.org/docs/static-type-checking.html) itself recommends using either Flow or TypeScript for larger code bases, which Carbon most definitely is.

# Detailed design

This is the bulk of the RFC. Explain the design in enough detail for somebody
familiar with Carbon to understand, and for somebody familiar with the
implementation to implement. This should get into specifics and corner-cases,
and include examples of how the feature is used. Any new terminology should be
defined here.

# Drawbacks

- It might be a large job to convert the library.
- Training will be needed for Carbon devs
- Lifespan of TypeScript?

# Alternatives

- Keeping Carbon as it is
- Flow?
- There aren't really any other alternatives

# Adoption strategy

- It shouldn't be a breaking change for our consumers, the ts code will be compiled to js so both ts and js libraries can still use it.
- Carbon devs may need some ts training to get up to speed.
- Potential to use a js to ts converter tool to help?

# How we teach this

- Ts and coding style guides.
- Training
- Lots of docs available for ts and React.

# Unresolved questions

- How does styled-components work with ts? Do we have to add prop types to all the props the styled-components use?
