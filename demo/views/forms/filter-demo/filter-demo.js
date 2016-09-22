import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Filter from 'components/filter';
import DateRange from 'components/date-range';
import Textbox from 'components/textbox';

class FilterDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['filter', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'filter');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Filter>
        <Textbox label="First Name" labelInline={ true }/>
        <DateRange labelsInline={ true } onChange={ () => {} } value={[]} startLabel="foo" endLabel="bar" />
        <Textbox label="Last" labelInline={ true }/>
        <Textbox label="A very long label" labelInline={ true }/>
      </Filter>
    );
  }

  /**
   * @method code
   */
  get code() {
    return "pending";
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        Pending
      </div>
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Filter"
        readme="components/filter"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(FilterDemo, AppStore);
