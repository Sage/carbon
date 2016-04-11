# LabelIcon decorator.

## This decorator provides HTML and CSS to style an input icon next to the label.

### == How to use LabelIcon decorator in a component:

 In your file:
```javascript
   import LabelIcon from 'carbon/lib/utils/decorators/label-icon';
```

 To use the decorator, wrap your component with it:
```javascript
   const MyComponent = InputLabel(LabelIcon(
   class MyComponent extends React.Component {
    //  ...
   })
```

 In the render method for your component, you can now output the HTML:
```javascript
   render() {
     return (
       <div>
         { this.labelHTML }
         { this.labelIconType('info') }
         <input />

       </div>
     );
   }
```

| Name          | Required    | Type          | Default       | Description   |
| ------------- | ----------- | ------------- | ------------- | ------------- |
| labelIconType | true        | String        |     none      | The icon to display |
