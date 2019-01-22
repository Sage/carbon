# Spinner

## How to use a Spinner in a component:

* In your file

```javascript
import Spinner from 'carbon-react/lib/components/spinner';
```

To render the Spinner:

```javascript
<Spinner />
```

You can pass a 'as' property to the spinner to define the color of the spinner.

You can pass a 'size' property to adjust the size of the spinner.

| Name          | Required    | Type          | Default       | Description   |
| ------------- | ----------- | ------------- | ------------- | ------------- |
| as            | false       | String        | `info`        | The color of the spinner |
| size          | false       | String        | `medium`      | The size of spinner affect height, width and border thickness. Options: `extra-small`, `small`, `medium-small`, `medium`, `medium-large`, `large` and `extra-large` |
