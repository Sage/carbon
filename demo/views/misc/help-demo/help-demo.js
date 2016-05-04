import React from 'react';
import Immutable from 'immutable';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Help from 'components/help';
import Row from 'components/row';
import Textarea from 'components/textarea';
import Textbox from 'components/textbox';

class HelpDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['help', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'help');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div>
        Example of a Help component
        <Help
          tooltipPosition={ this.value('tooltip_position') }
          tooltipAlign={ this.value('tooltip_align') }
          href={ this.value('href') }
        >
          { this.value('message') }
        </Help>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Help from 'carbon/lib/components/help';\n\n"

    html += '<Help';
    html += ` helpMessage='${this.value('message')}' `;
    html += "\n/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <Row>
          <Textarea
            label="Message"
            value={ this.value('message') }
            onChange={ this.action.bind(this, 'message') }
          />
          <Textbox
            label="Href"
            value={ this.value('href') }
            onChange={ this.action.bind(this, 'href') }
          />
        </Row>
        <Row>
          <Textbox
            label="Tooltip Position"
            value={ this.value('tooltip_position') }
            onChange={ this.action.bind(this, 'tooltip_position') }
          />
          <Textbox
            label="Pointer Align"
            value={ this.value('tooltip_align') }
            onChange={ this.action.bind(this, 'tooltip_align') }
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
        title="Help"
        readme="components/help"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(HelpDemo, AppStore);
