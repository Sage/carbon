# Help widget

## How to use Help in a component:

* In your file

```javascript
import Icon from 'carbon/lib/components/help';
```

*  To render a Help:

```javascript
   <Help tooltipMessage='Helpful Content' />
```

 *  You can also pass additional props of tooltipPosition and pointerAlign. The default position is on top with a center aligned pointer.

| Name           | Required    | Type           | Default       | Options                            | Description  |
| -------------- | ----------- | -------------  | ------------- | ---------------------------------- | ------------ |
| tooltipMessage | true        | String         |       -       |    -                               | message to display in tooltip|
| tooltipPosition| false       | String         |      top      |  top, bottom, left, right          | position of tooltip relative to icon|
| tooltipPosition| false       | String         |      center   |  center, right, left, bottom, top  | alignemnt of pointer on tooltip|
