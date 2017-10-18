# Updating Data

This tutorial assumes you have already followed the [Introducing Data](https://github.com/Sage/carbon/blob/master/docs/tutorials/carbon-rails/introducing-data.md) tutorial, as we will be continuing with the same example.

## Setting Up a Rails Model

We will use the Rails command line to generate a User model:

```shell
rails g model User first_name:string last_name:string
```

And let's migrate the database:

```shell
bundle exec rake db:migrate
```

And finally, let's use the rails console to create a user that we can load and edit in the app:

```shell
rails c
```

Once booted, create the user:

```shell
User.create(first_name: "Keanu", last_name: "Reeves")
```

## Update the Controller

We can now update the Rails controller:

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

  def update
    user = data
    user_params = params["user"]

    user.update(user_params.to_hash)

    render json: data
  end

  private

  def data
    User.select(:id, :first_name, :last_name).last
  end
end
```

As we only have one user, we will always load the last user for the data. We have also added an `update` action for when data gets posted back to the server. Let's also add a route for this action:

```rb
# config/routes.rb

Rails.application.routes.draw do
  get 'user/index'
  post '/update', controller: :user, action: :update
  root 'user#index'
end
```

## Update React/Flux

Currently our view is rendering text, but we probably want some inputs so we can edit the data. Lets update the view:

```js
// ui/src/views/user/user.js

import React from 'react';
import { connect } from 'carbon/lib/utils/flux';
import UserStore from 'stores/user';
import UserActions from 'actions/user';

import Textbox from 'carbon/lib/components/textbox';

class User extends React.Component {
  componentWillMount() {
    if (!global.USER_DATA) {
      UserActions.getData();
    }
  }

  render() {
    let userStore = this.state.userStore,
        firstName = userStore.getIn(["user", "first_name"]),
        lastName = userStore.getIn(["user", "last_name"]);

    return (
      <div>
        <h1>Hello, { firstName } { lastName }</h1>

        <Textbox
          label="First Name"
          value={ firstName }
        />

        <Textbox
          label="Last Name"
          value={ lastName }
        />
      </div>
    );
  }
}

export default connect(User, UserStore);
```

We have updated our view to import a `Textbox` component, and render two of these for the first and last names. The values are populated by the store, but currently do not update the store - we should set up an action which tells the store how to update when these inputs change.

```js
// ui/src/constants/user.js

export default {
  GET_DATA: "USER_GET_DATA",
  VALUE_UPDATED: "USER_VALUE_UPDATED"
};
```

```js
// ui/src/actions/user/user.js

import { Dispatcher } from 'carbon-react/lib/utils/flux';
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
  },

  updateValue: (key, ev) => {
    Dispatcher.dispatch({
      actionType: UserConstants.VALUE_UPDATED,
      key: key,
      value: ev.target.value
    });
  }
};

export default userActions;
```

We have now added an additional constant for the update value action, and have also added the new action for `updateValue`. This action will receive the input name or key that has updated, as well as the JavaScript event emitted by the change (from this we can use `ev.target.value` to retrieve the new value from the input).

We should also update the store to subscribe to this event:

```js
// ui/src/stores/user/user.js

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

  [UserConstants.VALUE_UPDATED](action) {
    this.data = this.data.setIn(['user', action.key], action.value);
  }
}

export default new UserStore('userStore', data);
```

Our newly subscribed action in the store will update the relevant key in `user` with the new value.

Finally, we need to update the view to trigger this action when the input changes:

```js
// ui/src/views/user/user.js

import React from 'react';
import { connect } from 'carbon/lib/utils/flux';
import UserStore from 'stores/user';
import UserActions from 'actions/user';

import Textbox from 'carbon/lib/components/textbox';

class User extends React.Component {
  componentWillMount() {
    if (!global.USER_DATA) {
      UserActions.getData();
    }
  }

  render() {
    let userStore = this.state.userStore,
        firstName = userStore.getIn(["user", "first_name"]),
        lastName = userStore.getIn(["user", "last_name"]);

    return (
      <div>
        <h1>Hello, { firstName } { lastName }</h1>

        <Textbox
          label="First Name"
          value={ firstName }
          onChange={ UserActions.updateValue.bind(this, 'first_name') }
        />

        <Textbox
          label="Last Name"
          value={ lastName }
          onChange={ UserActions.updateValue.bind(this, 'last_name') }
        />
      </div>
    );
  }
}

export default connect(User, UserStore);
```

We should now be able to successfully type and update the values in the textboxes in the browser.

### Posting Data

Our Flux store is now being updated by user input, which we can see by the `H1` text being updated as we type.

We now need to post this data back to the server. Let's create an additional constant and action pair for this:

```js
// ui/src/constants/user.js

export default {
  GET_DATA: "USER_GET_DATA",
  POST_DATA: "USER_POST_DATA",
  VALUE_UPDATED: "USER_VALUE_UPDATED"
};
```

```js
// ui/src/actions/user/user.js

import { Dispatcher } from 'carbon-react/lib/utils/flux';
import UserConstants from 'constants/user';
import Request from 'superagent';

let csrfToken = document.getElementsByName('csrf-token')[0].content;

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
  },

  postData: (data) => {
    Request
      .post('/update')
      .send(data)
      .set('Accept', 'application/json')
      .set('X-CSRF-Token', csrfToken)
      .end((err, response) => {
        if (!err) {
          Dispatcher.dispatch({
            actionType: UserConstants.POST_DATA,
            data: response.body
          });
        }
      });
  },

  updateValue: (key, ev) => {
    Dispatcher.dispatch({
      actionType: UserConstants.VALUE_UPDATED,
      key: key,
      value: ev.target.value
    });
  }
};

export default userActions;
```

Note that we also get the CSRF token from the page, and add it to the POST call.

Now let's update our view to use a `Form` which calls the new action on submit:

```js
// ui/src/views/user/user.js

import React from 'react';
import { connect } from 'carbon/lib/utils/flux';
import UserStore from 'stores/user';
import UserActions from 'actions/user';

import Form from 'carbon/lib/components/form';
import Textbox from 'carbon/lib/components/textbox';

class User extends React.Component {
  componentWillMount() {
    if (!global.USER_DATA) {
      UserActions.getData();
    }
  }

  submit = (ev, valid) => {
    ev.preventDefault();

    if (valid) {
      UserActions.postData(this.state.userStore.get('user'));
    }
  }

  render() {
    let userStore = this.state.userStore,
        firstName = userStore.getIn(["user", "first_name"]),
        lastName = userStore.getIn(["user", "last_name"]);

    return (
      <Form afterFormValidation={ this.submit }>
        <h1>Hello, { firstName } { lastName }</h1>

        <Textbox
          label="First Name"
          value={ firstName }
          onChange={ UserActions.updateValue.bind(this, 'first_name') }
        />

        <Textbox
          label="Last Name"
          value={ lastName }
          onChange={ UserActions.updateValue.bind(this, 'last_name') }
        />
      </Form>
    );
  }
}

export default connect(User, UserStore);
```

We should now have a fully functioning Rails app which performs Read and Write functions via the React/Flux interface.
