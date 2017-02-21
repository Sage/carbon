## A Content widget.

* Content renders a div with a title and body text.

### How to use a Content in a component:

* In your file:

```javascript
import Content from 'carbon/lib/components/content';
```

To render the Content:

```javascript
  <Content>
    // Children
  </Content>
```

| Name          | Required       | Type           | Default       | Description   |
| ------------- |  ------------- |  ------------- | ------------- | ------------- |
| title         | false          | String         |               | Title of the content  |
| as            | false          | String         | `primary`     | Content style `primary` or `secondary` |
| inline        | false          | Boolean        | `false`       | Sets the title inline with the content  |
| align         | false          | String         | `left`        | Aligns the content `left`, `center`, `right`    |
| titleWidth    | false          | String         |               | Sets a custom width for the title element |
| bodyFullWidth | false          | Boolean        | `false`       | Over-rides the calculation of body width based on titleWidth |
| children      | false          | Node           |               | children content to render  |
| className     | false          | String         |               | Custom className |
