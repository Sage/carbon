# Introducing Data

This tutorial assumes you have already followed the [Hello World](https://github.com/Sage/carbon/blob/master/docs/tutorials/carbon-rails/hello-world.md) tutorial, as we will be continuing with the same example.

## Responding with JSON

On the Rails side, all we have to do is update our Rails controller to respond to JSON requests:

```ruby
# app/controllers/user_controller.rb

class UserController < ApplicationController
  def index
    respond_to do |format|
      format.html { render inline: "", layout: "application" }
      format.json { render json: data }
    end
  end

  private

  def data
    {
      first_name: "Keanu",
      last_name: "Reeves"
    }
  end
end
```

## Setting Up Flux

Now we have an API endpoint to retrieve data, lets create a Flux pattern to retrieve and store the data.

The first thing we need is a store, so lets create a `User` store:

```json
// ui/src/stores/user/package.json

{
  "main": "./user.js"
}
```

```js
// ui/src/stores/user/user.js

import Dispatcher from 'dispatcher';
import Store from 'carbon/lib/utils/flux/store';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';

let data = ImmutableHelper.parseJSON({
  user: {
    first_name: "",
    last_name: ""
  }
});

class UserStore extends Store {
}

export default new UserStore('userStore', data, Dispatcher);
```

Currently, we are manually setting default data. This is useful so we know what the structure of this store looks like - but really we want to pull this data from the server instead.

Let's create a Constant and an Action which can take care of this:

```js
// ui/src/constants/user.js

export default {
  GET_DATA: "USER_GET_DATA"
};
```

```json
// ui/src/actions/user/package.json

{
  "main": "./user.js"
}
```

```js
// ui/src/actions/user/user.js

import Dispatcher from 'dispatcher';
import UserConstants from 'constants/user';
import Request from 'superagent';

let userActions = {
  getData: () => {
    Request
      .get('/')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (!err) {
          Dispatcher.dispatch({
            actionType: UserConstants.GET_DATA,
            data: response.body
          });
        }
      });
  }
};

export default userActions;
```

So now we have a `UserActions.getData`, which performs an API request and on success will dispatch the event `UserConstants.GET_DATA`.

Let's now go back to our store, and subscribe it to the dispatched event:

```js
// ui/src/stores/user/user.js

import Dispatcher from 'dispatcher';
import Store from 'carbon/lib/utils/flux/store';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';

import UserConstants from 'constants/user';

let data = ImmutableHelper.parseJSON({
  user: {
    first_name: "",
    last_name: ""
  }
});

class UserStore extends Store {
  [UserConstants.GET_DATA](action) {
    this.data = this.data.set('user', ImmutableHelper.parseJSON(action.data));
  }
}

export default new UserStore('userStore', data, Dispatcher);
```

So now our store will set the user key in the store with the returned data from the server.

The last thing to do is to update the view component to connect with the store and to trigger the `getData` action:

```js
// ui/src/views/user/user.js

import React from 'react';
import { connect } from 'carbon/lib/utils/flux';
import UserStore from 'stores/user';
import UserActions from 'actions/user';

class User extends React.Component {
  // Use componentDidMount to ensure that the new data will trigger a re-render
  componentDidMount() {
    UserActions.getData();
  }

  render() {
    let userStore = this.state.userStore,
        firstName = userStore.getIn(["user", "first_name"]),
        lastName = userStore.getIn(["user", "last_name"]);

    return (
      <h1>Hello, { firstName } { lastName }</h1>
    );
  }
}

export default connect(User, UserStore);
```

### Alternative Retrieval of Data

So our React component can now get its data through AJAX - this makes it really flexible if we want to render it in different places. However, in some cases we might get some performance improvements if we render the JSON to the page and have the Flux store retrieve it from there instead.

Let's update our Rails controller to supply this data:

```ruby
# app/controllers/user_controller.rb

class UserController < ApplicationController
  def index
    @user_data = data.to_json

    respond_to do |format|
      format.html { render }
      format.json { render json: data }
    end
  end

  private

  def data
    {
      first_name: "Keanu",
      last_name: "Reeves"
    }
  end
end
```

Our changes have set up an instance variable for `@user_data`, and we are now rendering a view for the HTML format. Let's update the view file to render the required data:

```ruby
# app/views/user/index.html.erb

<script>
  USER_DATA = <%= @user_data.html_safe %>;
</script>
```

This will render the JSON to a global variable labelled `USER_DATA`, which our Flux store will be able to read.

Let's update the store to read this data:

```js
// ui/src/stores/user/user.js

import Dispatcher from 'dispatcher';
import Store from 'carbon/lib/utils/flux/store';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';

import UserConstants from 'constants/user';

let data = ImmutableHelper.parseJSON({
  user: global.USER_DATA
});

class UserStore extends Store {
  [UserConstants.GET_DATA](action) {
    this.data = this.data.set('user', ImmutableHelper.parseJSON(action.data));
  }
}

export default new UserStore('userStore', data, Dispatcher);
```

We are now setting up our default data using the JSON available globally.

So now we know we already have the data, we no longer need to call the action to retrieve the data from the server, so let's update our view:

```js
// ui/src/views/user/user.js

import React from 'react';
import { connect } from 'carbon/lib/utils/flux';
import UserStore from 'stores/user';
import UserActions from 'actions/user';

class User extends React.Component {
  componentDidMount() {
    if (!global.USER_DATA) {
      UserActions.getData();
    }
  }

  render() {
    let userStore = this.state.userStore,
        firstName = userStore.getIn(["user", "first_name"]),
        lastName = userStore.getIn(["user", "last_name"]);

    return (
      <h1>Hello, { firstName } { lastName }</h1>
    );
  }
}

export default connect(User, UserStore);
```

Our view will now only retrieve the data from the server if it cannot find it on the global namespace. This means our view can access the cached data made available on page load from the server, while retaining the ability to retrieve the data itself if necessary.

## What's Next

Our application is now retrieving data from the server and rendering it in the DOM. Next we will take a look at updating the data in the store, and then posting it back to the server.

[Updating Data](https://github.com/Sage/carbon/blob/master/docs/tutorials/carbon-rails/updating-data.md)
