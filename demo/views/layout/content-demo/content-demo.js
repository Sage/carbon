import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Content from 'components/content';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';
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
      <div>
      <Content title={ this.value('title') } as={ this.value('as') } inline={ this.value('inline') }  centerInline={ this.value('centerInline') } titleWidth={ this.value('titleWidth') }>
        { this.value('body') }
      </Content>
      <Content title="Some title" as={ this.value('as') } inline={ this.value('inline') }  centerInline={ this.value('centerInline') } titleWidth={ this.value('titleWidth') }>
        { this.value('body') }
      </Content>
      <Content title="A really long title here" as={ this.value('as') } inline={ this.value('inline') }  centerInline={ this.value('centerInline') } titleWidth={ this.value('titleWidth') }>
        { this.value('body') }
      </Content>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Content from 'carbon/lib/components/content';\n\n";

    html += `<Content title='${this.value('title')}' as='${this.value('as')}' inline='${this.value('inline')}' centerInline='${this.value('centerInline')}' titleWidth='${this.value('titleWidth')}'>\n`;
    html += `  ${this.value('body')}\n`;
    html += "</Content>\n\n";

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
        </Row>
        <Row>
          <Textbox
            label="As"
            value={ this.value('as') }
            onChange={ this.action.bind(this, 'as') }
          />
          <Checkbox
            label="Inline"
            checked={ this.value('inline') }
            onChange={ this.action.bind(this, 'inline') }
          />
          <Checkbox
            label="Center & Inline"
            checked={ this.value('centerInline') }
            onChange={ this.action.bind(this, 'centerInline') }
          />
          <Textbox
            label="Title Width"
            value={ this.value('titleWidth') }
            onChange={ this.action.bind(this, 'titleWidth') }
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
