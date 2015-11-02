import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'utils/route';

import UIDate from 'components/date';
import Dropdown from 'components/dropdown-suggest';

class testView extends React.Component {

  customOnChange = () => {
    console.log("CHANGE");
  }

  render () {
    return(
      <div>
        <Dropdown 
          name="foo"
          onChange={this.customOnChange}
        />
      </div>
    )
  }

}

var routes = (
  <Route path="/" component={testView} />
);

CarbonRoute(routes);
