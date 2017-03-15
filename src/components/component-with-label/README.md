+# ComponentWithLabel
 +
 +## How to use a ComponentWithLabel in a component:
 +
 +* In your file
 +
 +```javascript
 +import ComponentWithLabel from 'carbon/lib/components/component-with-label';
 +```
 +
 +To render the ComponentWithLabel:
 +
 +```javascript
 +<ComponentWithLabel />
 +```
 +
 +You must pass a 'label' property to the component-with-label to define its title.
 +You must pass a 'columnSpan' property to the component-with-label to define the columnSpan of the `Row` wrapper
 +You must pass children property to the component-with-label to define the content of it.
 +
 +
 +| Name          | Required    | Type          | Default       | Description   |
 +| ------------- | ----------- | ------------- | ------------- | ------------- |
 +| label         | true        | String        | none          | The label for the component |
 +| columnSpan    | true        | String        | none          | The columnSpan for the row wrapper |
 +| children      | true        | Array/Object  | none          | The children that are rendered inside the component-with-label |
