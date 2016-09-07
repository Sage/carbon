import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import Textarea from 'components/textarea';
import NumberComponent from 'components/number';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class TextareaDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['textarea', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'textarea');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Textarea
        { ...FormInputHelper.demoProps(this, this.action) }
        expandable={ this.value('expandable') }
        characterLimit={ this.value('characterLimit') }
        enforceCharacterLimit={ this.value('enforceCharacterLimit') }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Textarea from 'carbon/lib/components/textarea';\n\n";

    html += "<Textarea";

    if (this.value('label')) {
      html += `\n  label='${this.value('label')}'`;
    }

    if (this.value('disabled')) {
      html += `\n  disabled={${this.value('disabled')}}`;
    }

    if (this.value('readOnly')) {
      html += `\n  readOnly={${this.value('readOnly')}}`;
    }

    if (this.value('prefix')) {
      html += `\n  prefix='${this.value('prefix')}'`;
    }

    if (this.value('expandable')) {
      html += `\n  expandable='${this.value('expandable')}'`;
    }

    if (this.value('characterLimit')) {
      html += `\n  characterLimit='${this.value('characterLimit')}'`;
    }

    if (!this.value('enforceCharacterLimit')) {
      html += `\n  enforceCharacterLimit={ false }`;
    }

    // determine if we need extra space
    let splitHtml = html.split("\n  ");
    if (splitHtml.length == 1) {
      html += " ";
    } else {
      html += "\n";
    }

    return html;
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
          <Textbox
            label="Prefix"
            labelInline={ true }
            value={ this.value('prefix') }
            onChange={ this.action.bind(this, 'prefix') }
          />
        </Row>
        <Row>
          <Checkbox
            label="Disabled"
            value={ this.value('disabled') }
            onChange={ this.action.bind(this, 'disabled') }
          />
          <Checkbox
            label="Read Only"
            value={ this.value('readOnly') }
            onChange={ this.action.bind(this, 'readOnly') }
          />
          <Checkbox
            label="Expandable"
            value={ this.value('expandable') }
            onChange={ this.action.bind(this, 'expandable') }
          />
        </Row>
        <Row>
          <NumberComponent
            label="Character Limit"
            labelInline={ true }
            value={ this.value('characterLimit') }
            onChange={ this.action.bind(this, 'characterLimit') }
          />
          <Checkbox
            label="Enforce Character Limit"
            value={ this.value('enforceCharacterLimit') }
            onChange={ this.action.bind(this, 'enforceCharacterLimit') }
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
        title="Textarea"
        readme="components/textarea"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(TextareaDemo, AppStore);
