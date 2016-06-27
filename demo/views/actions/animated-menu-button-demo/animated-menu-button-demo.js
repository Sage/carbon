import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import AnimatedMenuButton from 'components/animated-menu-button';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';
import SizeDropdown from './../../../components/size-dropdown';
import Link from 'components/link';

class AnimatedMenuButtonDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['animated_menu_button', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'animated_menu_button');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div className='animated-menu-button-demo'>
        <AnimatedMenuButton
          label={ this.value('label') } 
          direction={ this.value('alignRight') ? 'right' : 'left' }
          size={ this.value('size') }
        >
          <Row>
            <h2>Foo</h2>
            <p><Link href='#'>Bar</Link></p>
          </Row>
          <Row>
            <h2>Bar</h2>
            <p><Link href='#'>Foo</Link></p>
          </Row>
        </AnimatedMenuButton>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import AnimatedMenuButton from 'carbon/lib/components/animated-menu-button';\n\n", additionalProps = false;

    html += "<AnimatedMenuButton";

    if (this.value('label')) {
      html += `\n  label='${ this.value('label') }'`
    }
    html += `\n  size='${ this.value('size') }'`

    if (this.value('alignRight')) {
      html += "\n  direction='right'"
    }
    html += "\n>";

    html += '\n  <Row>'
    html += '\n    <h2>Foo</h2>'
    html += "\n    <p><Link href='#'>Bar</Link></p>"
    html += '\n  </Row>'
    html += '\n  <Row>'
    html += '\n    <h2>Bar</h2>'
    html += "\n    <p><Link href='#'>Foo</Link></p>"
    html += '\n  </Row>'


    html += "\n</AnimatedMenuButton>\n\n";

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
            label="Label"
            value={ this.value('label') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'label') }
          />
        </Row>
        <Row>
          <SizeDropdown
            label="Size"
            value={ this.value('size') }
            onChange={ this.action.bind(this, 'size') }
          />
          <Checkbox
            label="Align Right"
            checked={ this.value('alignRight') }
            onChange={ this.action.bind(this, 'alignRight') }
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
        title="Animated Menu Button"
        readme="components/animated-menu-button"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(AnimatedMenuButtonDemo, AppStore);
