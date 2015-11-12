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

  foo = (ev, props) => {
    // console.log(props);

  }

  render () {
    return(
      <Form model="foo">
        <Textarea path="/" name="date" onChange={ this.foo }  validations={ [Validation] }/>
        <Date path="/" name="date" onChange={ this.foo }  validations={ [Validation] }/>
        <DropdownSuggest path="/" name="date" onChange={ this.foo }  validations={ [Validation] }/>
        <Checkbox path="/" name="date" onChange={ this.foo }  validations={ [Validation] }/>
        <Decimal path="/" name="date" onChange={ this.foo }  validations={ [Validation] }/>
        <Textbox name="foo" onChange={ this.foo } validations={ [Validation] } />
      </Form>
    )
  }
}

var routes = (
  <Route path="/" component={testView} />
);

CarbonRoute(routes);
