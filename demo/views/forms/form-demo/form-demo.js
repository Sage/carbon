import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Form from 'components/form';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';
import Number from 'components/number';
import DateField from 'components/date';
import Presence from 'utils/validations/presence';
import Length from 'utils/validations/length';
import Row from 'components/row';
import FooWarning from './../../../warnings/foo-warning';

class FormDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['form', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'form');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Form
        cancel={ this.value('cancel') }
        saveText={ this.value('saveText') }
        cancelText={ this.value('cancelText') }
        save={ this.value('save') }
      >
        <Row>
          <Textbox
            label='First Name'
            value={ this.value('firstName') }
            onChange={ this.action.bind(this, 'firstName') }
            validations={ [ new Presence() ] }
            warnings={ [new FooWarning()] }
          />
          <Textbox
            label='Last Name'
            value={ this.value('lastName') }
            onChange={ this.action.bind(this, 'lastName') }
            validations={ [ new Presence() ] }
          />
        </Row>
        <Row>
          <Number
            label='Telephone'
            value={ this.value('telephone') }
            onChange={ this.action.bind(this, 'telephone') }
            validations={ [ new Length({ min: 5 }) ] }
          />
          <DateField label='Date of Birth'/>
        </Row>
      </Form>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Form from 'carbon/lib/components/form';\n";
    html += "import Row from 'carbon/lib/components/row';\n";
    html += "import Number from 'carbon/lib/components/number';\n";
    html += "import DateField from 'carbon/lib/components/date';\n";
    html += "import Textbox from 'carbon/lib/components/textbox';\n\n";

    html += "import Presence from 'carbon/lib/utils/validations/presence';\n";
    html += "import Length from 'carbon/lib/utils/validations/length';\n\n";

    html += '<Form'

    let dropline = false;

    if (!this.value('cancel')) {
      dropline = true;
      html += '\n cancel={ false }'
    }

    if (!this.value('save')) {
      dropline = true;
      html += '\n save={ false }'
    }

    if (this.value('saveText')) {
      dropline = true;
      html += `\n saveText="${ this.value('saveText') }"`;
    }

    if (this.value('cancelText')) {
      dropline = true;
      html += `\n cancelText="${ this.value('cancelText') }"`;
    }

    if (dropline) {
      html += '\n';
    }

    html += '>\n'
    html += '  <Row>\n'
    html += '    <Textbox\n'
    html += '      label="First Name"\n'
    html += '      validations={ [ new Presence() ] }\n'
    html += '    />\n'
    html += '    <Textbox\n'
    html += '      label="Last Name"\n'
    html += '      validations={ [ new Presence() ] }\n'
    html += '    />\n'
    html += '  </Row>\n'
    html += '  <Row>\n'
    html += '    <Number\n';
    html += '      label="Telephone"\n';
    html += '      validations={ [ new Length({ min: 5 }) ] }\n';
    html += '    />\n';
    html += '    <DateField label="Date of Birth"/>\n';
    html += '  </Row>\n';
    html += '</Form>';

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
            label="Save Text"
            value={ this.value('saveText') }
            onChange={ this.action.bind(this, 'saveText') }
          />
          <Checkbox
            label="Cancel Button"
            value={ this.value('cancel') }
            onChange={ this.action.bind(this, 'cancel') }
          />
          <Checkbox
            label="Save Button"
            value={ this.value('save') }
            onChange={ this.action.bind(this, 'save') }
          />
          <Textbox
            label="Cancel Text"
            disabled={ !this.value('cancel') }
            value={ this.value('cancelText') }
            onChange={ this.action.bind(this, 'cancelText') }
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
        title="Form"
        readme="components/form"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(FormDemo, AppStore);
