# A Preview widget.

### == How to use a Preview in a component:

* In your file:
```javascript
   import Preview from 'carbon/lib/components/preview'
```

* To render the Preview:
```
  <Detail>
   <Preview>
     { this.props.children }
   </Preview>
  </Detail>
```

* The 'isVisible' boolean prop determines whether or not to render the text and children. 

| Name              | Required       | Type           | Default       | Description           |
| ----------------- |  ------------- |  ------------- | ------------- | --------------------- |
| `isVisible`     | `false`        | `Boolean`       |  'false'      | toggle tooltip hide/show  |



