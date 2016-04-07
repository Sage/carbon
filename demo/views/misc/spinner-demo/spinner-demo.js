import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';
import SizeDropdown from './../../../components/size-dropdown';

import Spinner from 'components/spinner';
import Row from 'components/row';

class SpinnerDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['spinner', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'spinner');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div className='spinner-demo__spinner' >
        <Spinner as={ this.value('as') } size={ this.value('size') } />
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Spinner from 'carbon/lib/components/spinner';\n\n";

    html += "<Spinner";
    html += ` as='${this.value('as')}'`
    html += ` size='${this.value('size')}'`
    html += "/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <Row>
          <SizeDropdown value={ this.value('size') } onChange={ this.action.bind(this, 'size') } />
          <AsDropdown value={ this.value('as') } onChange={ this.action.bind(this, 'as') } />
        </Row>
      </div>
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Spinner"
        readme="components/spinner"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(SpinnerDemo, AppStore);
