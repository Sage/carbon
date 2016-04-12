import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Pod from 'components/pod';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';
import Dropdown from 'components/dropdown';
import Row from 'components/row';
import { startCase } from 'lodash';

class PodDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn([this.identifier, key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, this.identifier);
  }

  /**
   * @method identifier
   */
  get identifier() {
    return this.collapsible ? 'collapsible_pod' : 'pod';
  }

  /**
   * @method collapsible
   */
  get collapsible() {
    return this.props.collapsed !== undefined;
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Pod
        collapsed={ this.props.collapsed }
        title={ this.value('title') }
        description={ this.value('description') }
        padding={ this.value('padding') }
        border={ this.value('border') }
      >
        <Row>
          <Textbox />
          <Textbox />
          <Textbox />
        </Row>
      </Pod>
    )
  }

  /**
   * @method code
   */
  get code() {
    let collapsible = this.collapsible,
        title = this.value('title'),
        description = this.value('description'),
        border = this.value('border'),
        padding = this.value('padding');

    let html = "import Pod from 'carbon/lib/components/pod';\n\n";

    if (!collapsible && !title && !description && border && padding == "medium") {
      html += '<Pod>';
    } else {
      html += '<Pod';

      if (collapsible) {
        html += `\n  collapsed={ true } }`
      }

      if (title) {
        html += `\n  title={ ${this.value('title')} }`
      }

      if (description) {
        html += `\n  description={ ${this.value('description')} }`
      }

      if (!border) {
        html += "\n  border={ false }";
      }

      if (padding != "medium") {
        html += `\n  padding='${padding}'`
      }

      html += '\n>'
    }
    html += '\n  <Row>'
    html += '\n    <Textbox />'
    html += '\n    <Textbox />'
    html += '\n    <Textbox />'
    html += '\n  </Row>'
    html += '\n</Pod>'

    return html;
  }

  /**
   * @method paddingOptions
   */
  get paddingOptions() {
    return Immutable.fromJS([{
      id: "none",
      name: "None"
    }, {
      id: "small",
      name: "Small"
    }, {
      id: "medium",
      name: "Medium"
    }, {
      id: "large",
      name: "Large"
    }]);
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
            labelInline={ true }
            value={ this.value('title') }
            onChange={ this.action.bind(this, 'title') }
          />
        </Row>
        <Row>
          <Textbox
            label="Description"
            labelInline={ true }
            value={ this.value('description') }
            onChange={ this.action.bind(this, 'description') }
          />
        </Row>
        <Row>
          <Dropdown
            label="Padding Size"
            labelInline={ true }
            value={ this.value('padding') }
            onChange={ this.action.bind(this, 'padding') }
            options={ this.paddingOptions }
          />
          <Checkbox
            label="Border"
            value={ this.value('border') }
            onChange={ this.action.bind(this, 'border') }
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
        title={ startCase(this.identifier) }
        readme='components/pod'
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }

}

export default connect(PodDemo, AppStore);
