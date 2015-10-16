import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'utils/route';
import Textbox from 'components/textbox';
import TTFM from 'components/table-fields-for-many';
import ImmutableHelper from 'utils/helpers/immutable';



class testView extends React.Component {

  render () {

    var data = ImmutableHelper.parseJSON({
      foo: [
        {foo_1: 'Hello'},
        {foo_2: 'goodbye'}
      ]
    });

    var fields = [
      <Textbox
        name="foo_1"
        key="1"
      />,
      <Textbox 
        name="foo_2"
        key="2"
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
