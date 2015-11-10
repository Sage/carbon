import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'utils/route';

import Form from 'components/form';
import Textbox from 'components/textbox';

class testView extends React.Component {

  foo = () => {
    console.log("o")
  }

  render () {
    return(
      <Form>
        <Textbox name="hello" onChange={ this.foo } />
      </Form>
    )
  }

}

var routes = (
  <Route path="/" component={testView} />
);

CarbonRoute(routes);
