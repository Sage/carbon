import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import ToolTip from 'components/tooltip';
import Icon from 'components/icon';

class ToolTipDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['tooltip', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'tooltip');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div className='tooltip-demo'>
        <ToolTip>
          Icons are a fundamental part of the user experience. They can help to communicate, guide and inform the user. Icons make the meaning of buttons clearer, help users find their way through an interface and prepare users for what is happening next.
        </ToolTip>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "ToolTip from 'carbon/lib/components/tooltip';\n\n";

    html += `<Icon type='${this.value('type')}'>`;

    return html;
  }

  /**
   * @method controls
   */
  get controls() {

    return null;
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title='ToolTip'
        readme='components/tooltip'
        demo={ this.demo }
        code={ this.code }
      />
    );
  }
}

export default connect(ToolTipDemo, AppStore);
