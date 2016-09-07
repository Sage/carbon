import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Content from 'components/content';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Textarea from 'components/textarea';

class ContentDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['content', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'content');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Content title={ this.value('title') } as={ this.value('as') }>
        { this.value('body') }
      </Content>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Content from 'carbon/lib/components/content';\n\n";

    html += `<Content title='${this.value('title')}' as='${this.value('as')}'>\n`;
    html += `  ${this.value('body')}\n`;
    html += "</Content>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <Row>
        <Textbox
          label="Title"
          value={ this.value('title') }
          onChange={ this.action.bind(this, 'title') }
        />
        <Textarea
          rows="4"
          label="Body"
          value={ this.value('body') }
          onChange={ this.action.bind(this, 'body') }
        />
        <Textbox
          label="As"
          value={ this.value('as') }
          onChange={ this.action.bind(this, 'as') }
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
        title="Content"
        readme="components/content"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(ContentDemo, AppStore);
