import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'utils/route';
import Textbox from 'components/textbox';
import TTFM from 'components/table-fields-for-many';
import ImmutableHelper from 'utils/helpers/immutable';
import Date from 'components/date';
import Form from 'components/form';
import Dropdown from 'components/dropdown';

class testView extends React.Component {
  state = {
      dropdown_options: ImmutableHelper.parseJSON({
        analysis_type_categories: [
          {id: 0, name: 'Department 1'},
          {id: 1, name: 'Department 2'},
          {id: 2, name: 'Department 3'}
        ]
      })
    }

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
      />,
      <Date 
        name='date'
        key='3'/>
    ];

    var deleteLineItem = () => {
      return;
    }

    var updateLineItem = () => {
      return;
    }
    return(
      <div>
        <Form>
          <TTFM
            name='foo'
            data={ data.get('foo') }
            deleteRowHandler={ deleteLineItem }
            updateRowHandler={ updateLineItem }
            fields={ fields }
          />
          <Dropdown name="Alex's dropdown" options={this.state.dropdown_options.get('analysis_type_categories')} />
        </Form>
        
      </div>
    )
  }
}

var routes = (
  <Route path="/" component={testView} />
);

CarbonRoute(routes);