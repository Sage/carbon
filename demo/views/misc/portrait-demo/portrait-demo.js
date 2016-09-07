import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import SizeDropdown from './../../../components/size-dropdown';
import Immutable from 'immutable';

import Portrait from 'components/portrait';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import Row from 'components/row';
import Dropdown from 'components/dropdown';
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
    let props = {
      size: this.value('size'),
      alt: this.value('alt'),
      shape: this.value('shape'),
      useInitials: this.value('useInitials')
    };

    return (
      <div ref={(c) => this._portrait = c} className='portrait-demo' >
        <Row>
          <div>
            <h2>src:</h2>
            <Portrait
              { ...props }
              src='https://facebook.github.io/react/img/logo.svg'
              initials={ this.value('initials') }
              darkBackground={ this.value('darkBackground') }
            />
          </div>
          <div>
            <h2>Gravatar:</h2>
            <Portrait
              { ...props }
              gravatar='chris.barber@sage.com'
              initials={ this.value('initials') }
              darkBackground={ this.value('darkBackground') }
            />
          </div>
        </Row>

        <Row>
          <div>
            <h2>Gravatar fallback (with initials):</h2>
            <Portrait
              { ...props }
              gravatar='foo'
              initials={ this.value('initials') }
              darkBackground={ this.value('darkBackground') }
            />
          </div>
          <div>
            <h2>Gravatar fallback (without initials):</h2>
            <Portrait
              { ...props }
              gravatar='foo'
              darkBackground={ this.value('darkBackground') }
            />
          </div>
        </Row>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Portrait from 'carbon/lib/components/portrait';\n\n"

    html += '<Portrait\n';
    html += `  size="${ this.value('size') }"\n`;

    if (this.value('alt')) {
      html += `  alt="${ this.value('alt') }"\n`;
    }

    if (this.value('shape') !== 'standard') {
      html += `  shape="${ this.value('shape') }"\n`
    }

    if (this.value('darkBackground')) {
      html += `  darkBackground={ true }"\n`
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
    let shapes = Immutable.fromJS([{
      id: 'standard',
      name: 'Standard'
    }, {
      id: 'circle',
      name: 'Circle'
    }, {
      id: 'leaf',
      name: 'Leaf'
    }])

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
          <Dropdown
            options={ shapes }
            label="Shape"
            labelInline={ true }
            value={ this.value('shape') }
            onChange={ this.action.bind(this, 'shape') }
          />
          <Textbox
            label="Initials"
            value={ this.value('initials') }
            labelInline={ true }
            maxLength={ 3 }
            onChange={ this.action.bind(this, 'initials') }
          />
        </Row>
        <Row>
          <Checkbox
            label="Dark Background"
            value={ this.value('darkBackground') }
            onChange={ this.action.bind(this, 'darkBackground') }
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
