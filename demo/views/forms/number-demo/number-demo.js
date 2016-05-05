import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import NumberComponent from 'components/number';

class NumberDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['number', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'number');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <NumberComponent { ...FormInputHelper.demoProps(this, this.action) } />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import NumberComponent from 'carbon/lib/components/number';\n\n";

    html += "<Number";
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
        title="Number"
        readme="components/number"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(NumberDemo, AppStore);
