import React from 'react';
import { connect } from 'utils/flux';
import TextboxStore from './../../../stores/textbox';
import TextboxActions from './../../../actions/textbox';
import Example from './../../../components/example';

import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';
import Number from 'components/number';

class TextboxDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.textboxStore.get(key);
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Textbox
        label={ this.value('label') }
        labelInline={ this.value('labelInline') }
        labelWidth={ this.value('labelInline') ? this.value('labelWidth') : '' }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Textbox from 'carbon/lib/components/textbox';\n\n";

    html += "<Textbox\n";

    if (this.value('label')) {
      html += `  label='${this.value('label')}'\n`;
    }

    if (this.value('labelInline')) {
      html += `  labelInline={${this.value('labelInline')}}\n`;
    }

    if (this.value('labelInline') && this.value('labelWidth')) {
      html += `  labelWidth='${this.value('labelWidth')}'\n`;
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
            onChange={ TextboxActions.textboxValueUpdated.bind(this, 'label') }
          />
        </Row>

        <Row>
          <Checkbox
            label="Label Inline"
            value={ this.value('labelInline') }
            onChange={ TextboxActions.textboxValueUpdated.bind(this, 'labelInline') }
          />

          <Number
            label="Label Width"
            labelInline={ true }
            value={ this.value('labelWidth') }
            disabled={ !this.value('labelInline') }
            onChange={ TextboxActions.textboxValueUpdated.bind(this, 'labelWidth') }
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
        title="Textbox"
        readme="github/textbox"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(TextboxDemo, TextboxStore);
