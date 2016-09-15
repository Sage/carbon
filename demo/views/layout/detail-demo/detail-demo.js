import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Detail from 'components/detail';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Textarea from 'components/textarea';

class DetailDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['detail', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'detail');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Detail icon={ this.value('icon') } footnote={ this.value('footnote') }>
        { this.value('body') }
      </Detail>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Detail from 'carbon/lib/components/detail';\n\n";

    html += `<Detail icon='${this.value('icon')}' footnote='${this.value('footnote')}'>\n`;
    html += `  ${this.value('body')}\n`;
    html += "</Detail>\n\n";

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
            rows="4"
            label="Body"
            value={ this.value('body') }
            onChange={ this.action.bind(this, 'body') }
          />
        </Row>
        <Row>
          <Textbox
            label="Footnote"
            value={ this.value('footnote') }
            onChange={ this.action.bind(this, 'footnote') }
          />
          <Textbox
            label="Icon"
            value={ this.value('icon') }
            onChange={ this.action.bind(this, 'icon') }
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
        title="Detail"
        readme="components/detail"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(DetailDemo, AppStore);
