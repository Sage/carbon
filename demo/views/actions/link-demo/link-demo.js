import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Link from 'components/link';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class LinkDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['link', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'link');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Link
        disabled={ this.value('disabled') }
        href={ this.value('href') }
        icon={ this.value('icon') }
        to={ this.value('to') }
      >
        { this.value('text') || " " }
      </Link>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Link from 'carbon/lib/components/link';\n\n", additionalProps = false;

    html += "<Link";

    if (this.value('href')) {
      html += `\n  href='${this.value('href')}'`;
      additionalProps = true;
    }

    if (this.value('to')) {
      html += `\n  to='${this.value('to')}'`;
      additionalProps = true;
    }

    if (this.value('disabled')) {
      html += "\n  disabled={true}";
      additionalProps = true;
    }

    if (this.value('icon')) {
      html += `\n  icon='${this.value('icon')}'`;
      additionalProps = true;
    }

    if (additionalProps) {
      html += "\n";
    }

    html += ">";

    if (additionalProps) {
      html += "\n  ";
    }

    html += this.value('text');

    if (additionalProps) {
      html += "\n";
    }

    html += "</Link>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <Row columns="3">
          <Textbox
            label="Text"
            value={ this.value('text') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'text') }
            columnSpan="2"
          />

          <Checkbox
            label="Disabled"
            value={ this.value('disabled') }
            onChange={ this.action.bind(this, 'disabled') }
          />
        </Row>

        <Row>
          <Textbox
            label="HREF"
            value={ this.value('href') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'href') }
          />

          <Textbox
            label="To"
            value={ this.value('to') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'to') }
          />

          <Textbox
            label="Icon"
            value={ this.value('icon') }
            labelInline={ true }
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
        title="Link"
        readme="components/link"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(LinkDemo, AppStore);
