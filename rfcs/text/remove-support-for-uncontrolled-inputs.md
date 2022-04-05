- Start Date: 31/03/2022

# Table of contents

- [Summary](#summary)
- [Motivation](#motivation)
- [Basic examples](#basic-examples)
  - [Component Example - Controlled and Uncontrolled](#component-example---controlled-and-uncontrolled)
  - [Component Example - Controlled](#component-example---controlled)
- [Detailed design](#detailed-design)
  - [Components](#components)
- [Unit Testing](#unit-testing)  
- [Drawbacks](#drawbacks)
- [Alternatives](#alternatives)
- [Compatibility](#compatibility) 
- [Adoption strategy](#adoption-strategy)
- [How we teach this](#how-we-teach-this)
- [Documentation](#documentation)
- [Further Considerations](#further-considerations)

# Summary

The purpose of this document is to outline our intention to remove support for using Carbon input components in an uncontrolled manner.

# Motivation

- To reduce the code complexity in our input components. Currently we have to account for an input being either uncontrolled or controlled and therefore have to test both of these use cases. We would be able to remove any code relating to invariant messages regarding switching from controlled to uncontrolled or vice versa too.  
- Uncontrolled behaviour is not the promoted approach to handling inputs in React. React state in their docs that ["In most cases, we recommend using controlled components to implement forms."](https://reactjs.org/docs/uncontrolled-components.html)
- React form libraries, such as Formik, strongly encourage using controlled components. As can be seen in their docs regarding [using handleChange](https://formik.org/docs/api/formik#handlechange-e-reactchangeeventany--void) and [initialValues](https://formik.org/docs/api/formik#initialvalues-values).
- To bring the rest of our components in line with the recently refactored Date component which only supports being controlled.

# Basic Examples

## Component Example - Controlled and Uncontrolled

In the current implementation of supporting controlled and uncontrolled, a component will look like this.

```jsx 
// my-component.component.js
const MyComponent = ({ value, onChange, defaultValue, ...rest }) => {
  /* Component logic goes here */
  const isControlled = useRef(value !== undefined);
  const inputRef = useRef(null);

  const handleOnChange = (event) => {
    if (isControlled.current && onChange) {
      onChange(event);
    }
  };

  const prevControlledRef = useRef();

  useEffect(() => {
    const message =
      "Input elements should not switch from uncontrolled to controlled (or vice versa)."

    invariant(prevControlledRef.current !== isControlled, message);

    prevControlledRef.current = isControlled

  }, [isControlled]);

  return (
    <input
      value={value}
      onChange={handleOnChange}
      defaultValue={defaultValue}
      ref={inputRef}
    />
  );
};

MyComponent.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.function,
  defaultValue: PropTypes.string,
};

export default MyComponent;
```
Here is an example of how a basic component will look in TS with uncontrolled support.

```tsx
// my-component.component.tsx
interface MyComponentProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
};

const MyComponent = ({ value, onChange, defaultValue, ...rest }: MyComponentProps) => {
  const isControlled = useRef(value !== undefined);
  const inputRef = useRef(null);

   const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled && onChange ) {
      onChange(event);
    } 
  };

  useEffect(() => {
    // invariant goes in here.
  }, [];

  /* Component logic goes here */

return (
    <input 
      value={value} 
      onChange={handleOnChange} 
      defaultValue={defaultValue} 
      ref={inputRef}
    />
  )
};

export default MyComponent;
```
## Component Example - Controlled

Here is an example of how a basic component will look in JS without uncontrolled support.

```jsx 
// my-component.component.js
const MyComponent = ({ value, onChange, ...rest }) => {
   const handleOnChange = (event) => {
    if (onChange) {
      onChange(event);
    } 
  };

  /* Component logic goes here */

  return <input value={value} onChange={handleOnChange} />;
};

MyComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.function.isRequired,
};

export default MyComponent;
```
Here is an example of how a basic component will look in TS without uncontrolled support.

```tsx
// my-component.component.tsx
interface MyComponentProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MyComponent = ({ value, onChange, ...rest }: MyComponentProps) => {
   const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    } 
  };

  /* Component logic goes here */

  return <input value={value} onChange={handleOnChange} />;
};

export default MyComponent;
```
# Detailed design

- We will add deprecation warnings to our input components so that our consumers are aware of the pending changes to remove uncontrolled support. This will appear as a console warning if our consumer is using the uncontrolled mode and a warning on our Storybook documentation.

- We will remove uncontrolled behaviour from our input components and associated props. This will be done in one Pull Request with each component having it's own commit message with a `BREAKING CHANGE`. The benefit of this is that we will only release one major version of Carbon. 

## Components

The input components that currently support being uncontrolled are: 
1. Textbox
1. Decimal
1. Number Input
1. Simple Select
1. Filterable Select
1. Multi Select
1. Grouped Character
1. Numeral Date
1. Search
1. Checkbox 
1. RadioButton 
1. Switch 
1. SimpleColorPicker 
1. AdvancedColorPicker 
1. ButtonToggle

## Unit Testing

Currently we have unit tests for both controlled and uncontrolled behaviours. As part of this work we could reduce the amount of code in the spec files quite considerably. If we take `Decimal` as an example of this, `Decimal` currently has 1430 lines of code in the spec file. This could be reduced to down to around 480 lines of code if we were to remove the uncontrolled tests. This would make the tests easier to read and maintain, while also reducing the runtime of the tests.
# Drawbacks

- This work will be a `BREAKING CHANGE`, which we will communicate in the appropriate Carbon channels. Consumers of Carbon will also have the opportunity to comment on this RFC.

- Any consumers of Carbon that currently use uncontrolled components will have to rewrite their form implementations.  

# Alternatives

The alternative is to do nothing: we leave the input components as they are and continue to support both controlled and uncontrolled behaviours. This course of action would mean no impact to our consumers. 

By following this course of action though we would not get any of the benefits detailed above.

# Compatibility 

Compatibility was checked with both `react-hook-form` and `Formik`. `react-hook-form` was more performant and you can see the code used and the results [here](https://github.com/Sage/sbc.research.react-hook-form/blob/master/README.md).

# Adoption strategy

This proposed work will be implemented as a `BREAKING CHANGE`. In terms of how consuming projects will upgrade Carbon, we will need to document the upgrade process and link to it in the release notes. If a project has used an input as uncontrolled, they will need to update their codebase to make this controlled instead. This will involve making sure that the value is stored using React's [useState](https://reactjs.org/docs/hooks-state.html) hook to retain the value and making sure this is managed using an `onChange` function. We may have to provide additional support in this scenario to provide examples of how they can achieve the same functionality using this approach.

We also already provide various codemods in our [Carbon Codemod](https://github.com/Sage/carbon-codemod) repo that could be used by our consumers to assist with the move to a controlled component. Examples of this are:
- A [rename-prop](https://github.com/Sage/carbon-codemod/tree/master/transforms/rename-prop) codemod that consumers could use to change a `defaultValue` value prop to `value`.
- A [add-prop](https://github.com/Sage/carbon-codemod/tree/master/transforms/add-prop) codemod that could be used to add to a `value` prop.
- A [remove-prop](https://github.com/Sage/carbon-codemod/tree/master/transforms/remove-prop) codemod that could be used to remove a `defaultValue` prop.
- A [replace-prop-value](https://github.com/Sage/carbon-codemod/tree/master/transforms/replace-prop-value) codemod that changes the value of a prop.

There is also support for writing controlled components in React's documentation. This can be found [here](https://reactjs.org/docs/forms.html#controlled-components).

# How we teach this

This RFC will be communicated in the Sage `#carbon` and `#carbon-announcement` slack channels, where we will ask our consumers for feedback on the RFC. Beyond that, it will be visible in the release notes when consumers upgrade. This RFC document will reside in the repository for future reference.

We will be able to support consumers of Carbon in the `#carbon` slack channel too. 

# Documentation

As part of this work we will make sure that the documentation reflects what we support. We will update the component description to include that we specifically only support controlled usage of these components. We will also ensure Storybook examples are updated to remove or update any that use uncontrolled components.

# Further Considerations

If/when we introduce a `FileInput` component into Carbon, this will have to be an uncontrolled component. This is because `<input type="file" />` can only be uncontrolled as [the value can only be specified by the user and not be done programmatically](https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag). As file inputs cannot be controlled, the Carbon `FileInput` component would have to be uncontrolled.