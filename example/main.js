import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'utils/route';

import Form from 'components/form';
import Textbox from 'components/textbox';
import Decimal from 'components/decimal';
import Checkbox from 'components/checkbox';
import Date from 'components/date';
import DropdownSuggest from 'components/dropdown-suggest';
import Textarea from 'components/textarea';

import Validation from 'utils/validations/presence';

class testView extends React.Component {

  render () {
    return(
      <Form model="foo">
        <Date name="date"/>
        <DropdownSuggest path="/" name="foo" onChange={ this.foo }  validations={ [Validation] }/>
        <Checkbox path="/" name="foo" onChange={ this.foo }  validations={ [Validation] }/>
        <Decimal path="/" name="cost" onChange={ this.foo }  validations={ [Validation] }/>
        <Textbox name="foo" onChange={ this.foo } validations={ [Validation] } />
      </Form>
    )
  }
}

var routes = (
  <Route path="/" component={testView} />
);

CarbonRoute(routes);
