import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import Checkbox from 'components/checkbox';
import Textbox from 'components/textbox';
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
        value={ this.value('value') }
        label={ this.value('label') }
        labelHelp={ this.value('labelHelp') }
        labelHelpInline={ this.value('helpInline') }
        reverse={ this.value('reverse') }
        disabled={ this.value('disabled') }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Checkbox from 'carbon/lib/components/checkbox';\n\n";

    html += "<Checkbox";

    if (this.value('label')) {
      html += `\n  label='${this.value('label')}'`;

      if (this.value('labelHelp')) {
        html += `\n  labelHelp='${this.value('labelHelp')}'`;
      }

      if (this.value('helpInline')) {
        html += `\n  labelHelpInline={ true }`;
      }
    }

    if (this.value('disabled')) {
      html += `\n  disabled={${this.value('disabled')}}`;
    }

    if (this.value('reverse')) {
      html += `\n  reverse={${this.value('reverse')}}`;
    }

    // determine if we need extra space
    let splitHtml = html.split("\n  ");
    if (splitHtml.length == 1) {
      html += " ";
    } else {
      html += "\n";
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
        <Row>
          <Textbox
            label="Label"
            labelInline={ true }
            value={ this.value('label') }
            onChange={ this.action.bind(this, 'label') }
          />
          <Checkbox
            label="Disabled"
            value={ this.value('disabled') }
            onChange={ this.action.bind(this, 'disabled') }
          />
        </Row>
        <Row>
          <Textbox
            label="Label Help"
            labelInline={ true }
            disabled={ !this.value('label') }
            value={ this.value('labelHelp') }
            onChange={ this.action.bind(this, 'labelHelp') }
          />
          <Checkbox
            label="Reverse Label"
            disabled={ !this.value('label') }
            value={ this.value('reverse') }
            onChange={ this.action.bind(this, 'reverse') }
          />
          <Checkbox
            label="Help Label Inline"
            disabled={ !this.value('labelHelp') }
            value={ this.value('helpInline') }
            onChange={ this.action.bind(this, 'helpInline') }
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
