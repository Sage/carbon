import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import Checkbox from 'components/checkbox';
import Textbox from 'components/textbox';
import TextArea from 'components/textarea';
import Presence from 'utils/validations/presence';
import Row from 'components/row';

class CheckboxDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['checkbox', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'checkbox');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Checkbox
        { ...FormInputHelper.demoProps(this, this.action) }
        checked={ this.value('value') }
        reverse={ this.value('reverse') }
        fieldHelpInline={ this.value('fieldHelpInline') }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Checkbox from 'carbon/lib/components/checkbox';\n\n";

    html += "<Checkbox";

    if (this.value('fieldHelpInline')) {
      html += `\n  fieldHelpInline={ true }`;
    }

    if (this.value('reverse')) {
      html += `\n  reverse={${this.value('reverse')}}`;
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
            label="Reverse Label"
            disabled={ !this.value('label') }
            value={ this.value('reverse') }
            onChange={ this.action.bind(this, 'reverse') }
          />
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
        title="Checkbox"
        readme="components/checkbox"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(CheckboxDemo, AppStore);
