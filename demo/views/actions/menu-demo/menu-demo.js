import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import { Menu, MenuItem, SubmenuBlock } from 'components/menu';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class MenuDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['menu', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'menu');
  }

  /**
   * @method demo
   */
  get demo() {
    let as = this.value('secondary') ? 'secondary' : 'primary';

    return (
      <Menu as={ as }>
        <MenuItem href="/">First Menu Item</MenuItem>
        <MenuItem href="/">Second Menu Item</MenuItem>
        <MenuItem href="/">Third Menu Item</MenuItem>
        <MenuItem selected={ true } submenu="Fourth Menu Item">
          <MenuItem href="/">First Submenu Item</MenuItem>
          <MenuItem href="/" selected={ true }>Second Submenu Item</MenuItem>
          <MenuItem href="/">Third Submenu Item</MenuItem>
        </MenuItem>
        <MenuItem href="/" submenu="Fifth Menu Item" submenuDirection="left">
          <MenuItem href="/">First Submenu Item</MenuItem>
          <MenuItem href="/">Second Submenu Item</MenuItem>
          <MenuItem href="/">Third Submenu Item</MenuItem>
          <MenuItem href="/" divide={ true }>Fourth Submenu Item</MenuItem>
        </MenuItem>
      </Menu>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import { Menu, MenuItem, SubmenuBlock } from 'carbon/lib/components/menu';\n\n",
        as = this.value('secondary') ? 'secondary' : 'primary';

    html += `<Menu as="${as}">\n`;
    html += '  <MenuItem>First Menu Item</MenuItem>\n';
    html += '  <MenuItem selected={ true }>Second Menu Item</MenuItem>\n';
    html += '  <MenuItem>Third Menu Item</MenuItem>\n';
    html += '  <MenuItem submenu="Fourth Menu Item">\n';
    html += '    <MenuItem>First Submenu Item</MenuItem>\n';
    html += '    <MenuItem>Second Submenu Item</MenuItem>\n';
    html += '    <MenuItem>Third Submenu Item</MenuItem>\n';
    html += '  </MenuItem>\n';
    html += '  <MenuItem submenu="Fifth Menu Item" submenuDirection="left">\n';
    html += '    <MenuItem>First Submenu Item</MenuItem>\n';
    html += '    <MenuItem>Second Submenu Item</MenuItem>\n';
    html += '    <MenuItem>Third Submenu Item</MenuItem>\n';
    html += '    <MenuItem divide={ true }>Fourth Submenu Item</MenuItem>\n';
    html += '  </MenuItem>\n';
    html += '</Menu>\n';

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <Row>
        <Checkbox
          label="Secondary"
          value={ this.value('secondary') }
          onChange={ this.action.bind(this, 'secondary') }
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
        title="Menu"
        readme="components/menu"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(MenuDemo, AppStore);
