import { Meta } from "@storybook/blocks";

<Meta title="Documentation/Recommended Practices" />

# Recommended practices

## Contents

- [Avoid CSS Customisation](#avoid-css-customisation)
- [Import Compound Components from the Same Carbon Instance](#import-compound-components-from-the-same-carbon-instance)
- [Be Cautious with Wrapping Components](#be-cautious-with-wrapping-components)

## Avoid CSS Customisation

We strongly discourage customising any Carbon component with custom CSS rules, we cannot guarantee that our components' underlying HTML and CSS will remain unchanged in future releases.

> ✅ **Best practice**: Use the provided props to customise the components.

## Import Compound Components from the Same Carbon Instance

When using Carbon components that follow the Compound Component pattern (for example, `Menu` and `FlatTable`), ensure both the parent and its subcomponents are imported from the same installed copy of Carbon. These components rely on shared context and state to function correctly. If a parent and subcomponents are imported from different copies of Carbon, they may fail to communicate, leading to unexpected behavior.

![The Menu and MenuItem components being incorrectly imported from different copies of Carbon](./context-bound-components-incorrect-usage.svg)

This applies to any Carbon components that form a parent-child relationship, such as `Tabs` and `Tab`, `FlatTable` and `FlatTableRow`, `Accordion` and `AccordionItem`, etc.

>	✅ **Best practice**: Always import both the parent and its subcomponents from the same installed copy of Carbon. This prevents context and state issues.

## Be Cautious with Wrapping Components

If you need to wrap the Carbon components to achieve some additional functionality it is important to note that some rely on their children
being direct descendants. The reason for this is that some parent components iterate and clone their children applying different props depending on the
index of a given child. You should also be aware that some of our components will have invalid HTML markup if you include a new element in the wrapping
component.

If you find that a wrapped component no longer works or is not styled as you'd expect you may need to spread all the the props directly to them like shown below:

```javascript
const ComponentWrapper = ({ customProp, ...rest }) => {
  // ...
  // some additional logic
  // ...
  return <Component {...rest} />;
};
```

It is also possible to achieve the same by using hooks if you prefer:

```javascript
const useComponentHook = (customProp, rest) => {
  // ...
  // some additional logic
  // ...
  return <Component {...rest} />;
};
