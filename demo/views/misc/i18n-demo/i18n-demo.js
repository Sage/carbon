import React from 'react';
import Immutable from 'immutable';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import Row from 'components/row';
import Textarea from 'components/textarea';
import Textbox from 'components/textbox';
import i18n from 'i18n-js';
import I18n from 'components/i18n';
import Checkbox from 'components/checkbox';

class I18nDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['i18n', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'i18n');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <I18n
        scope="i18n_test"
        markdown={ this.value('markdown') }
        inline={ this.value('inline') }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import I18n from 'carbon/lib/components/i18n';\n\n"

    html += '<I18n';
    html += "\n  scope='i18n_test'";

    if (this.value('markdown')) {
      html += "\n  markdown={ true }"
    }

    if (this.value('inline')) {
      html += "\n  inline={ true }"
    }

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
          <Checkbox
            label="Markdown"
            value={ this.value('markdown') }
            onChange={ this.action.bind(this, 'markdown') }
          />
          <Checkbox
            label="Inline"
            value={ this.value('inline') }
            onChange={ this.action.bind(this, 'inline') }
          />
        </Row>
      </div>
    );
  }

  /**
   * @method render
   */
  render() {
    i18n.translations.en = { i18n_test: this.value('message') };

    return (
      <Example
        title="i18n"
        readme="components/i18n"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(I18nDemo, AppStore);
