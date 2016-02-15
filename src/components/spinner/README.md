# Spinner

## How to use a Spinner in a component:

* In your file

```javascript
import Spinner from 'carbon/lib/components/spinner';
```

To render the Spinner:

```javascript
<Spinner />
```

You can pass a 'as' property to the spinner to define the type of spinner.

You can pass a 'size' property to adjust the size of the spinner.

| Name          | Required    | Type          | Default       | Description   |
| ------------- | ----------- | ------------- | ------------- | ------------- |
| as            | false       | String        | `std`         | The type of spinner |
| size          | false       | String        | `lmed`        | The size of spinner affect height, width and border thickness. Options: `small`, `smed`, `lmed`, `large` |
