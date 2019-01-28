# Poller helper

* A helper to make poll an endpoint with a GET request

## How to use a Poller:

* In your file

```javascript
import Poller from 'carbon-react/lib/utils/helpers/poller';

let queryOptions = { url: '/foo/bar/1' };
let options = { interval: 5000 };
let functions = {
 conditionMet: function(response) => { return response.body.status === 'complete' },
 callback: function(response) => { doSomethingFancy(reponse) },
 handleError: function(err) => { FlashMessage("Failed", err) }
}

 Poller(queryOptions, functions);
```

## Params

| Param object |  Key            | Required                       | Type     | Default      | Description              |
| ------------ | --------------- |------------------------------- | -------- | ------------ | -------------            |
| queryOptions | url             | true                           | String   |              | the url for the the GET request     |
| queryOptions | data            | false                          | Object   |              | data to pass with the request        |
| queryOptions | headers         | false                          | Object   |              | header to pass with the request  |
| functions    | conditionMet    | false                          | Function | return false | Use this to test a desired condition in the response and return a boolean. If the condition is true, the callback will be executed. |
| functions    | conditionNotMetCallback | false                          | Function | return false | Called when condition is not met and poller will try again |
| functions    | callback        | true if conditionMet is passed | Function |  null        | callback function to call when the conditionMet returns true   |
| functions    | handleError     | false                          | Function |  null        | callback function that takes an error and handles it |
| functions    | terminate       | false                          | Function | return false | Use this to test a desired condition in the response and return a boolean. If the condition is true, the polling will end. |
| options      | interval        | false                          | Number   | 3000         | interval after which the request is re-submitted, in milliseconds |
| options      | retries         | false                          | Number   | Infinity     | number of times to re-submit the request before giving up |
| options      | endTime         | false                          | Number   | Infinity     | time period after which to end the polling in milliseconds |
