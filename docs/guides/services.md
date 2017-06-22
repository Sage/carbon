# Services

The base service class takes care of setting up the default options for an XHR client. It sets the headers required, sets up some callback actions and automatically executes callbacks for success or error if configured. The client uses [axios](https://github.com/mzabriskie/axios), and is fully customisable (you can access the client via `this.client` in your service class). However we do provide some helper methods to make it easier to setup which you can read about below.

## API for the Base Service

Extending from the base service provides you with:

* `this.get` - `{Function}` - `id, onSuccess, onError`
* `this.post` - `{Function}` - `data, onSuccess, onError`
* `this.put` - `{Function}` - `id, data, onSuccess, onError`
* `this.delete` - `{Function}` - `id, onSuccess, onError`
* `this.client` - `{Object}` - Provides access to the axios client.

In your `constructor`, you can use the following methods to configure your service:

* `this.setURL` - `{Function}` - `url` - Sets the base url for this service (an id will automatically be added to the end for endpoints that need it).
* `this.setTransformRequest` - `{Function}` - `callback` - A callback to allow you to manipulate the data before it is sent to the server.
* `this.setTransformResponse` - `{Function}` - `callback` - A callback to allow you to manipulate the data before it is returned to the client.
* `this.enableGlobalCallbacks` - `{Function}` - Enables any `onSuccess` and `onError` callbacks configured for all services classes on this instance.
* `this.disableGlobalCallbacks` - `{Function}` - Disables any `onSuccess` and `onError` callbacks configured for all services classes on this instance.

### CSRF Token

If you need to set a CSRF Token in your request header, you can configure all of your services with the token:

```js
import Service from 'carbon-react/lib/utils/service';

Service.configure({
  csrfToken: global.CSRF_TOKEN
});
```

### Automatic Responses

You can configure all of your services to respond with a common success and/or error function. Firstly, you need to configure the base class with your functions:

```js
import Service from 'carbon-react/lib/utils/service';

Service.configure({
  onSuccess: () => {},
  onError: () => {}
});
```

Depending on how your server responds, the base service will automatically respond before your callbacks are triggered.

#### Expected Server Responses

If your server responds with a success, and returns an object with a `message` it will trigger the success action:

```
{
  "message": "Object saved successfully!",
  "data": # json object from server
}
```

If your server responds with a status of error and a message, it will trigger the error action:

```
{
  "status": "error",
  "message": "Something went wrong!"
}
```

Note that the above was still a successful response, it just returned the `status` key with a value of `error`.

#### Redirects (not implemented yet)

If you server responds with a status code between `300` and `400` along with a `location`, it will automatically redirect on response.

## Using a Service

* Create a new instance of your service:

```js
let service = new SalesInvoiceService();
```

* Perform your action on the service passing the id, the payload and a success callback:

```js
let service = new SalesInvoiceService();

service.put(data.id, data, (response) => {
  // perform action on success
  // (will most likely dispatch an action at this point)
});
```

## Creating a Service

* Create the relevant directory and files for your new service:

```
/ui/src/services/sales-invoice-service/__spec__.js
/ui/src/services/sales-invoice-service/sales-invoice-service.js
/ui/src/services/sales-invoice-service/package.json
```

* Define your service class, extending the base class from `carbon`:

```js
import Service from "carbon-react/lib/utils/service";

class SalesInvoiceService extends Service {
  constructor() {
    super();
  }
}

export default SalesInvoiceService;
```

* Set the URL for your service in your constructor:

```js
import Service from "carbon-react/lib/utils/service";

class SalesInvoiceService extends Service {
  constructor() {
    super();

    this.setURL("/sales-invoices");
  }
}

export default SalesInvoiceService;
```

* Your service is now ready to use.

### Additional Setup of a Service

#### Adding Transforms

We can add transforms for preparing data either before it is sent to the server, or when it is returned from the server. For example, our data object may have additional keys which we do not want to post to the server, or it may need some keys renaming or values changing.

The example below shows how we might set up a transform to manipulate the data before it is posted to the server:

```js
import Service from "carbon-react/lib/utils/service";

class SalesInvoiceService extends Service {
  constructor() {
    super();

    this.setURL("/sales-invoices");
    this.setTransformRequest(this.prepareForServer);
  }

  prepareForServer = (data) => {
    data = JSON.parse(data);
    delete data.foobar;
    return JSON.stringify(data);
  }
}

export default SalesInvoiceService;
```

> The transform request must return the data in a stringified format

#### Passing Arguments to the Constructor

Occassionally you may need to pass additional arguments to a service, such as an owner's ID for the base URL. Below shows an example of this:

```js
class ContactAddressService extends Service {
  constructor(contactid) {
    super();

    // set the url using the owner's id (every RESTful action will automatically add the address id)
    this.setURL(`/contacts/${contactid}/addresses`);
  }
}

// can initialize the service with the contact id
let service = new ContactAddressService(id);
```
