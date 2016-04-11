import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import SizeDropdown from './../../../components/size-dropdown';

import Portrait from 'components/portrait';
import Checkbox from 'components/checkbox';
import Row from 'components/row';
import Textbox from 'components/textbox';

class PortraitDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['portrait', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'portrait');
  }

  /**
   * @method demo
   */
  get demo() {
    let props = {};
    props.size = this.value('size');
    props.alt = this.value('alt');

    if (this.value('gravatar')) {
      props.gravatar = this.value('email'); 
    } else {
      props.src='https://facebook.github.io/react/img/logo.svg';
    }

    return (
      <div className='portrait-demo' >
        <Portrait
          { ...props }
        />
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Portrait from 'carbon/lib/components/portrait';\n\n"

    html += '<Portrait\n';
    html += `  size=${ this.value('size') }\n`;

    if (this.value('alt')) {
      html += `  alt="${ this.value('alt') }"\n`;
    }

    if (this.value('gravatar')) {
      html += `  gravatar="${ this.value('email') }"\n`;
    } else {
      html += '  src="https://facebook.github.io/react/img/logo.svg"\n';
    }
    html += '/>';

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <Row>
          <SizeDropdown
            value={ this.value('size') }
            onChange={ this.action.bind(this, 'size') }
          />

          <Textbox
            label="Alt"
            value={ this.value('alt') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'alt') }
          />
        </Row>
        <Row>
          <Checkbox
            label="Gravatar"
            value={ this.value('gravatar') }
            onChange={ this.action.bind(this, 'gravatar') }
          />

          <Textbox
            label="Gravatar"
            value={ this.value('email') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'email') }
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
        title="Portrait"
        readme="components/portrait"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(PortraitDemo, AppStore);
