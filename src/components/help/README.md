# Help widget

## How to use Help in a component:

* In your file

```javascript
import Help from 'carbon-react/lib/components/help';
```

*  To render a Help:

```javascript
   <Help>{ 'Helpful Content' }</Help>
```

 *  You can also pass additional props of tooltipPosition and tooltipAlign. The default position is on top with a center aligned pointer.

| Name           | Required    | Type           | Default       | Options                            | Description  |
| -------------- | ----------- | -------------  | ------------- | ---------------------------------- | ------------ |
| tooltipPosition| false       | String         |      top      |  top, bottom, left, right          | position of tooltip relative to icon|
| tooltipAlign | false       | String         |      center   |  center, right, left, bottom, top  | alignment of pointer on tooltip|
