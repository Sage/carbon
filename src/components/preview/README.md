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
     { children }
   </Preview>
  </Detail>
```

| Name              | Required        | Type            | Default       | Description                                                               |
| ----------------- |  -------------  |  -------------- | ------------- | ------------------------------------------------------------------------  |
| `children`        | `false`         | `Node`          | 'null'        | component adds a css shimmer if neither children nor loading prop are set |
| `loading`         | `false`         | `Boolean`       | 'undefined'   | component adds a css shimmer                                              |



