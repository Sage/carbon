import React from 'react';
import Immutable from 'immutable';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';

import Pill from 'components/pill';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

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
        <Pill fill={ this.value('fill') } as={ this.value('as') } >
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

    if (this.value('fill')) {
      html += ` fill={ true }`;
    }

    html += '/>';
    html += `\n  ${this.value('text')}`;
    html += "\n</Pill>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    let extraOpts = Immutable.fromJS([{ id: 'disabled', name: 'Disabled' }]);

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
        </Row>
        <Row>
          <Checkbox
            label="Fill"
            reverse={ true }
            value={ this.value('fill') }
            onChange={ this.action.bind(this, 'fill') }
          />
          <AsDropdown
            value={ this.value('as') }
            onChange={ this.action.bind(this, 'as') }
            extraOpts={ extraOpts }
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
