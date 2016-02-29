import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import Decimal from 'components/decimal';

class DecimalDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['decimal', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'decimal');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Decimal { ...FormInputHelper.demoProps(this, this.action) } />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Decimal from 'carbon/lib/components/decimal';\n\n";

    html += "<Decimal\n";
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
        title="Decimal"
        readme="github/decimal"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(DecimalDemo, AppStore);
