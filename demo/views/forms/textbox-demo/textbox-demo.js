import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import ButtonToggle from 'components/button-toggle';
import Textbox from 'components/textbox';
import Row from 'components/row';
import Icon from 'components/icon';

class TextboxDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['textbox', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'textbox');
  }

  foo = (ev) => {
    // debugger
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div>
        <Row>
      <div>
        <ButtonToggle name="foo" onChange={ this.foo } value="foo" icon="company" iconSize="large">
          My Company
        </ButtonToggle>

        <ButtonToggle name="foo" value="bar">
          The Client
        </ButtonToggle>

        <ButtonToggle name="foo" value="bar" disabled={ true }>
          Other Option
        </ButtonToggle>
      </div>
        </Row>

        <Textbox
          { ...FormInputHelper.demoProps(this, this.action) }
        />
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Textbox from 'carbon/lib/components/textbox';\n\n";

    html += "<Textbox";
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
        title="Textbox"
        readme="components/textbox"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(TextboxDemo, AppStore);
