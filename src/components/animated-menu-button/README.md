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
