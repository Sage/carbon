import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import Date from 'components/date';
import Presence from 'utils/validations/presence';

class DateDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['date', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'date');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Date { ...FormInputHelper.demoProps(this, this.action) } />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Date from 'carbon/lib/components/date';\n\n";

    html += "<Date";
    html = FormInputHelper.codeProps(this, html);
    html += "/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return FormInputHelper.controls(this, this.action);
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Date"
        readme="components/date"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(DateDemo, AppStore);
