## Carousel

### How to use a Carousel in a component:

* In your file

```javascript
import { Carousel, Slide } from 'carbon-react/lib/components/carousel';
```

*  To render a Carousel:

```javascript
<Carousel>
  <Slide>Foo</Slide>
  <Slide>Bar</Slide>
  <Slide>Baz</Slide>
</Carousel>
```

| Name              | Required    | Type           | Default       | Description   |
| ----------------- | ----------- | -------------  | ------------- | ------------- |
| initialSlideIndex | false       | Integer        | 0             | Sets the slide to show on initial render |
| className         | false       | String         |               | Custom class name |
| children          | false       | Array | Object |               | Content to display |
