# Pod widget

## How to use a Pod in a component:

* In your file

```javascript
import Pod from 'carbon-react/lib/components/pod';
```

*  To render a Pod:

```javascript
   <Pod>
    <Textbox />
   </Pod>
```

A pod content is defined by its children.

A pod also accepts a prop of collapsed (true or false) which sets the intial state of the pod and allows it
to be collapsible. If the prop is not passed the pod will not be collapsible.

* Note a title is required if the pop is collapsible


| Name          | Required    | Type           | Default       | Description   |
| ------------- | ----------- | -------------  | ------------- | ------------- |
| collapsed     | false       | Boolean        |               | Setting to true or false will set the intial state and allow the pod to be collapsed
| title         | false       | String         |               | Pod Title h4 element |
| alignTitle    | false       | String         | `left`        | Aligns pod title (left, center, right)   |
| description   | false       | String         |               | Pod Description |
| onEdit        | false       | String | Function | Object       |               | Adds an edit link to the Pod |

