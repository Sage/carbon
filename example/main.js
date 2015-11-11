import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'utils/route';

import Form from 'components/form';
import Textbox from 'components/textbox';
import Textarea from 'components/textarea';

import Validation from 'utils/validations/presence';

class testView extends React.Component {

  foo = (ev) => {
    console.log(ev)
  }

  render () {
    return(
      <Form model="foo">
        <Textarea name="date" onChange={ this.foo }  validations={ [Validation] }/>
        <Textbox name="foo" onBlur={ this.foo } validations={ [Validation] } />
      </Form>
    )
  }

}

var routes = (
  <Route path="/" component={testView} />
);

CarbonRoute(routes);
