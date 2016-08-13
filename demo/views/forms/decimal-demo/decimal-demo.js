import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import Decimal from 'components/decimal';
import NumberComponent from 'components/number';

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
      <Decimal
        { ...FormInputHelper.demoProps(this, this.action) }
        helpMessage={ this.value('helpMessage')}
        precision={ Number(this.value('precision')) }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Decimal from 'carbon/lib/components/decimal';\n\n";

    html += "<Decimal";
    html = FormInputHelper.codeProps(this, html);
    
    if (this.value('precision') !== 2) {
      html += `  precision={ ${ this.value('precision') } }`
    }

    html += "/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        { FormInputHelper.controls(this, this.action) }
        <NumberComponent
          label="Precision"
          labelInline={ true }
          value={ this.value('precision') }
          onChange={ this.action.bind(this, 'precision') }
        />
      </div>
    )
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Decimal"
        readme="components/decimal"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(DecimalDemo, AppStore);
