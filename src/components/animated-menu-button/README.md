## An AnimatedMenuButton widget.

### How to use an AnimatedMenuButton in a component:

  -  In your file

```javascript
import AnimatedMenuButton from 'carbon/lib/components/animated-menu-button';
```

To render a AnimatedMenuButton, pass children to be rendered in the expanded menu:

```javascript
<AnimatedMenuButton>
  <Row>
    <div>
      <h2 className="title">Foo</h2>
      <p><Link href='#'>Bar</Link></p>
    </div>
  </Row>
</AnimatedMenuButton>
```
| Name          | Required    | Type           | Default       | Description   |
| ------------- |  ---------- |  ------------- | ------------- | ------------- |
| size          | false       | String         | `medium`      | Size of the menu. Options: `small`, `smed`, `medium`, `mlarge`, `large` |
| direction     | false       | String         | `left`        | The direction in which the menu expands. Options: `right`, `left` |
| label         | false       | String         |               | A label to display at the top of the expanded menu. |
| children      | false       | node           |               | content to render in menu |
| className     | false       | String         |               | custom class name |
