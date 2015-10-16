import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'utils/route';
import Textbox from 'components/textbox';
import TTFM from 'components/table-fields-for-many';
import ImmutableHelper from 'utils/helpers/immutable';
import DDSuggest from 'components/dropdown-suggest';

class testView extends React.Component {

  render () {

    var data = ImmutableHelper.parseJSON({
      foo: [
        {foo_1: 'Hello', ledger_account: {resource_name: 'bla', id: '1'}}
      ]
    });

    var fields = [
      <Textbox  
        name='foo_1'
        key='1'
      />,
      <DDSuggest
        path=""
        value= { { name: '', id: '' } }
        key='0'
        resource_key='resource_name'
        name='ledger_account'
       />
    ];

    var deleteLineItem = () => {
      return;
    }

    var updateLineItem = () => {
      return;
    }
    return(
      <TTFM
        name='foo'
        data={ data.get('foo') }
        deleteRowHandler={ deleteLineItem }
        updateRowHandler={ updateLineItem }
        fields={ fields }
      />
    )
  }
}

var routes = (
  <Route path="/" component={testView} />
);

CarbonRoute(routes);
