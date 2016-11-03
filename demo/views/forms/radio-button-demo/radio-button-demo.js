import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';
import Immutable from 'immutable'

import RadioButton from 'components/radio-button';
import Checkbox from 'components/checkbox';
import Textbox from 'components/textbox';
import Row from 'components/row';
import Icon from 'components/icon';
import Button from 'components/button';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

class RadiButtonDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['radio_button', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'radio_button');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <RadioButton
        { ...FormInputHelper.demoProps(this, this.action) }
        fieldHelpInline={ this.value('fieldHelpInline') }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import RadioButton from 'carbon/lib/components/radio-button';\n\n";

    html += "<RadioButton";

    if (this.value('fieldHelpInline')) {
      html += `\n  fieldHelpInline={ true }`;
    }

    html = FormInputHelper.codeProps(this, html);

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

        <Row>
          <Checkbox
            label="Help Label Inline"
            value={ this.value('fieldHelpInline') }
            onChange={ this.action.bind(this, 'fieldHelpInline') }
          />
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
        title="Radio Button"
        readme="components/radio-button"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(RadiButtonDemo, AppStore);
