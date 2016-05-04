import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import Textarea from 'components/textarea';
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
