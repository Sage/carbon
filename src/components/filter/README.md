## Filter

### How to use a Filter in a component:

* Import the component:

```javascript
import Filter from 'carbon-react/lib/components/filter';
```

* To render a Filter:

```javascript
<Filter>
  <Textbox />
</Filter>
```

The filter can be used with other components, such as TableAjax, to control the data it displays. See the TableAjax component for information on how to do this.

### Props

| Name          | Required    | Type          | Default       | Description   |
| ------------- | ----------- | ------------- | ------------- | ------------- |
| align         | false       | String        | "left"        | Determines the alignment of the filter's child components. |
