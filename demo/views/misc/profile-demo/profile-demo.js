import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import SizeDropdown from './../../../components/size-dropdown';
import Immutable from 'immutable';

import Profile from 'components/profile';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import Row from 'components/row';
import Dropdown from 'components/dropdown';
import Textbox from 'components/textbox';

class ProfileDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['profile', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'profile');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Profile
        name={ this.value('name') }
        email={ this.value('email') }
        initials={ this.value('initials') }
        large={ this.value('large') }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Profile from 'carbon/lib/components/profile';\n\n"

    html += '<Profile\n';

    if (this.value('name')) {
      html += `  name="${ this.value('name') }"\n`;
    }

    if (this.value('email')) {
      html += `  email="${ this.value('email') }"\n`
    }

    if (this.value('initials')) {
      html += `  initials="${ this.value('initials') }"\n`
    }

    if (this.value('large')) {
      html += `  large={ true }\n`
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
          <Textbox
            label="Name"
            value={ this.value('name') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'name') }
          />
          <Textbox
            label="Email"
            value={ this.value('email') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'email') }
          />
          <Textbox
            label="Initials"
            value={ this.value('initials') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'initials') }
          />
        </Row>
        <Row>
          <Checkbox
            label="Large"
            value={ this.value('large') }
            onChange={ this.action.bind(this, 'large') }
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
        title="Profile"
        readme="components/profile"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(ProfileDemo, AppStore);
