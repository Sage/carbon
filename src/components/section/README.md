# Section

## How to use a Section in a component:

* In your file

```javascript
import Section from 'carbon/lib/components/section';
```

To render the Section:

```javascript
<Section />
```

You must pass a 'title' property to the section to define its title.

You can pass children property to the section to define the content of it.

| Name          | Required    | Type          | Default       | Description   |
| ------------- | ----------- | ------------- | ------------- | ------------- |
| title         | true        | String        | none          | The title of the section |
| children      | false       | Array/Object  | none          | The children that are rendered inside the section |
