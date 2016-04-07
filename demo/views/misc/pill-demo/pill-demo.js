import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';

import Pill from 'components/pill';
import Row from 'components/row';
import Textbox from 'components/textbox';

class PillDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['pill', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'pill');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div className='pill-demo' >
        <Pill as={ this.value('as') } >
          { this.value('text') }
        </Pill>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Pill from 'carbon/lib/components/pill';\n\n"

    html += '<Pill';
    html += ` as='${this.value('as')}' `;
    html += '/>';
    html += `\n  ${this.value('text')}`;
    html += "\n</Pill>\n\n";

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
            label="Text"
            value={ this.value('text') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'text') }
            columnSpan="2"
          />
          <AsDropdown value={ this.value('as') } onChange={ this.action.bind(this, 'as') } />
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
        title="Pill"
        readme="components/pill"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(PillDemo, AppStore);
