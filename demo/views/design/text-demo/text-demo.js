import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import classNames from 'classnames';

import Textbox from 'components/textbox';
import Row from 'components/row';
import Checkbox from 'components/checkbox';
import AsDropdown from './../../../components/as-dropdown';

class TextDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['text', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'text');
  }

  get classes() {
    let asClass;

    if (this.value('as') != 'null') {
      asClass = `text--${this.value('as')}`;
    }

    let classes = classNames(asClass, {
      'text--tag': this.value('textTag'),
      'text--bold': this.value('textBold'),
      'text--italic': this.value('textItalic'),
      'text--secondary': this.value('textSecondary'),
      'text--inactive': this.value('textInactive')
    });

    return classes;
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div>
        <Row columns="4">
          <p>Paragraph:</p>
          <p columnSpan="3" className={ this.classes }>
            { this.value('content') }
          </p>
        </Row>

        <Row columns="4">
          <p>h1:</p>
          <h1 columnSpan="3" className={ this.classes }>
            { this.value('content') }
          </h1>
        </Row>

        <Row columns="4">
          <p>h2:</p>
          <h2 columnSpan="3" className={ this.classes }>
            { this.value('content') }
          </h2>
        </Row>

        <Row columns="4">
          <p>h3:</p>
          <h3 columnSpan="3" className={ this.classes }>
            { this.value('content') }
          </h3>
        </Row>

        <Row columns="4">
          <p>h4:</p>
          <h4 columnSpan="3" className={ this.classes }>
            { this.value('content') }
          </h4>
        </Row>

        <Row columns="4">
          <p>h5:</p>
          <h5 columnSpan="3" className={ this.classes }>
            { this.value('content') }
          </h5>
        </Row>

        <Row columns="4">
          <p>h6:</p>
          <h6 columnSpan="3" className={ this.classes }>
            { this.value('content') }
          </h6>
        </Row>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = '<p';
    if (this.classes) {
      html += ` className="${this.classes}"`;
    }
    html += '>';
    html += this.value('content');
    html += '</p>';

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
            label="Content"
            labelInline={ true }
            value={ this.value('content') }
            onChange={ this.action.bind(this, 'content') }
          />

          <AsDropdown
            value={ this.value('as') }
            onChange={ this.action.bind(this, 'as') }
          />
        </Row>

        <Row columns="3">
          <Checkbox
            label="text--tag"
            value={ this.value('textTag') }
            onChange={ this.action.bind(this, 'textTag') }
          />

          <Checkbox
            label="text--bold"
            value={ this.value('textBold') }
            onChange={ this.action.bind(this, 'textBold') }
          />

          <Checkbox
            label="text--italic"
            value={ this.value('textItalic') }
            onChange={ this.action.bind(this, 'textItalic') }
          />
        </Row>

        <Row columns="3">
          <Checkbox
            label="text--secondary"
            value={ this.value('textSecondary') }
            onChange={ this.action.bind(this, 'textSecondary') }
          />

          <Checkbox
            label="text--inactive"
            value={ this.value('textInactive') }
            onChange={ this.action.bind(this, 'textInactive') }
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
        title="Text"
        readme="design/text"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(TextDemo, AppStore);
