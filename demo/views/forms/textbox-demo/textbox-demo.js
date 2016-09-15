import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import Presence from 'utils/validations/presence';
import Textbox from 'components/textbox';
import Row from 'components/row';

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

  /**
   * @method demo
   */
  get demo() {
    return (
      <Textbox
      validations={[ new Presence ]}
        { ...FormInputHelper.demoProps(this, this.action) }
      />
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
