import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';

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
        <Textbox name='Name' validations={ [Validation] }/>
        <Textbox name='Name' validations={ [Validation] }/>
      </Form>
    )
  }
}

var routes = (
  <Route path="/" component={testView} />
);

startRouter(routes);;
