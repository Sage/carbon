# Portrait widget

## How to use a Portrait in a component:

* In your file

```javascript
import Portrait from 'carbon-react/lib/components/portrait';
```

*  To render a Portrait:

```javascript
<Portrait src='/my-image' alt='my image' />
```

To render a gravatar Portrait:

```javascript
  <Portrait gravatar='mygrav@email.com' />
```

You can pass a 'size' property to adjust the size of the Portrait
* The default is lmed
* options: small, smed, lmed, large

## Props

| Name          | Required                         | Type           | Default       | Description              |
| ------------- | -----------                      | -------------  | ------------- | -------------            |
| size          | false                            | String         | `lmed`        | Size of the portrait     |
| src           | True if gravatar is not provided | String         |               | src of the image         |
| gravatar      | True if src is not provided      | String         |               | gravatar email adddress  |
| alt           | false                            | String         |               | alternate text for image |
| shape         | false                            | String         | `standard`    | shape of the portrait    |
