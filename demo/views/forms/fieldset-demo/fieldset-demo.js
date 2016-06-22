import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Fieldset from 'components/fieldset';
import Textbox from 'components/textbox';
import Date from 'components/date';
import Row from 'components/row';
import Presence from 'utils/validations/presence';

class FieldsetDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['fieldset', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'fieldset');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Fieldset legend={ this.value('legend') }>
        <Textbox validations={[new Presence]} />
        <Textbox validations={[new Presence]} />
        <Date validations={[new Presence]} />
        <Textbox validations={[new Presence]} />
      </Fieldset>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Fieldset from 'carbon/lib/components/fieldset';\n";
    html += "import Textbox from 'carbon/lib/components/textbox';\n\n";

    html += '<Fieldset'

    let dropline = false;
    
    if (!this.value('legend')) {
      dropline = true;
      html += `\n legend="${this.value('legend')}"`
    }

    if (dropline) {
      html += '\n';
    }

    html += '>\n'
    html += '</Fieldset>';

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <Row>
        <Textbox
          label="Legend"
          value={ this.value('legend') }
          onChange={ this.action.bind(this, 'legend') }
        />
      </Row>
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Fieldset"
        readme="components/fieldset"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(FieldsetDemo, AppStore);
