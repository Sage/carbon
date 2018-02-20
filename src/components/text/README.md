# A Text widget.

### == How to use a Text in a component:

* In your file:
```javascript
   import Text from 'carbon/lib/components/text'
```

* To render the ToolTip:
```
   <Text preloading>
     { this.props.children }
   </Text>
```

* You can pass a prop of 'preloading' to the component which give a preloading css aspect to the inner content.
* The 'isVisible' boolean prop determines whether or not to render the text and children. 

| Name              | Required       | Type           | Default       | Description           |
| ----------------- |  ------------- |  ------------- | ------------- | --------------------- |
| `preloading`    | `false`        | `Boolean`       |  'false'     | applies css while preloading content   |
| `isVisible`     | `false`        | `Boolean`       |  'false'      | toggle tooltip hide/show  |



