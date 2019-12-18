## A DateRange widget.

### How to use a DateRange in a component:

* In your file

```javascript
import DateRange from 'carbon-react/lib/components/date-range';
```

* To render the DateRange:

```javascript
<DateRange
  onChange={ myCustomChangeHandler.bind(this) }
  value={ [startDate, endDate] }
/>
```

| Name          | Required | Type      | Default        | Description   |
| ------------- |  ------- |  -------- | -------------- | ------------- |
| onChange      | true     | Function  |                | A custom onChange handler that receives an array with the updated start and end dates |
| value         | true     | Array     |                | An array with the start and end dates |
| endLabel      | false    | String    |                | A label for the end date field |
| startLabel    | false    | String    |                | A label for the start date field |
| endMessage    | false    | String    | 'start date must not be later than end date' | Error message for the start date field  |
| startMessage  | false    | String    | 'start date must not be later than end date' | Error message for the start date field  |  
| labelsInline  | false    | Boolean   |                | Display labels inline  |  
