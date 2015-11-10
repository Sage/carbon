import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'utils/route';

import Form from 'components/form';
import Textbox from 'components/textbox';

import Validation from 'utils/validations/presence';

class testView extends React.Component {

  foo = () => {
    console.log("bar")
  }

  render () {
    return(
      <Form model="foo">
        <Textbox name="foo" onBlur={ this.foo } validations={ [Validation] } />
      </Form>
    )
  }

}

var routes = (
  <Route path="/" component={testView} />
);

CarbonRoute(routes);
