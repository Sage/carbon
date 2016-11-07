import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Pod from 'components/pod';
import Link from 'components/link';
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
    let footer;

    if (this.value('footer')) {
      footer = <Link href='#'>Action 1</Link>;
    }

    return (
      <Pod
        editContentFullWidth={ this.value('editContentFullWidth') }
        collapsed={ this.props.collapsed }
        title={ this.value('title') }
        subtitle={ this.value('subtitle') }
        description={ this.value('description') }
        padding={ this.value('padding') }
        border={ this.value('border') }
        as={ this.value('as') }
        footer={ footer }
        onEdit={ this.value('edit') }
        alignTitle={ this.value('alignTitle') }
        triggerEditOnContent={ this.value('triggerEditOnContent') }
        displayEditButtonOnHover={ this.value('displayEditButtonOnHover') }
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
        padding = this.value('padding'),
        as = this.value('as'),
        edit = this.value('edit'),
        alignTitle = this.value('alignTitle'),
        editContentFullWidth = this.value('editContentFullWidth'),
        triggerEditOnContent = this.value('triggerEditOnContent'),
        displayEditButtonOnHover = this.value('displayEditButtonOnHover');

    let html = "import Pod from 'carbon/lib/components/pod';\n\n";

    html += '<Pod';

    if (editContentFullWidth) {
      html += `\n  editContentFullWidth={ true }`
    }

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

    if (padding !== "medium") {
      html += `\n  padding='${padding}'`
    }

    if (as !== "primary") {
      html += `\n  as='${as}'`
    }

    if (edit) {
      html += `\n  onEdit='${edit}'`
    }

    if (alignTitle !== 'left') {
      html += `\n  alignTitle='${ alignTitle }'`
    }

    if (triggerEditOnContent) {
      html += '\n  triggerEditOnContent={ true }'
    }

    if (displayEditButtonOnHover) {
      html += '\n  displayEditButtonOnHover={ true }'
    }

    html += '\n>'
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
      id: "extra-small",
      name: "Extra Small"
    }, {
      id: "small",
      name: "Small"
    }, {
      id: "medium",
      name: "Medium"
    }, {
      id: "large",
      name: "Large"
    }, {
      id: "extra-large",
      name: "Extra Large"
    }]);
  }

  /**
   * @method asOptions
   */
  get asOptions() {
    return Immutable.fromJS([{
      id: "primary",
      name: "Primary"
    }, {
      id: "secondary",
      name: "Secondary"
    }, {
      id: "tertiary",
      name: "Tertiary"
    }, {
      id: "tile",
      name: "Tile"
    }]);
  }

  get alignOptions() {
    return Immutable.fromJS([{
      id: "left",
      name: "Left"
    }, {
      id: "center",
      name: "Center"
    }, {
      id: "right",
      name: "Right"
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

          <Textbox
            label="Subtitle"
            labelInline={ true }
            value={ this.value('subtitle') }
            onChange={ this.action.bind(this, 'subtitle') }
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
            label="As"
            labelInline={ true }
            value={ this.value('as') }
            onChange={ this.action.bind(this, 'as') }
            options={ this.asOptions }
          />
          <Dropdown
            label="Padding Size"
            labelInline={ true }
            value={ this.value('padding') }
            onChange={ this.action.bind(this, 'padding') }
            options={ this.paddingOptions }
          />
          <Textbox
            label="On Edit"
            labelInline={ true }
            value={ this.value('edit') }
            onChange={ this.action.bind(this, 'edit') }
          />
        </Row>
        <Row>
          <Checkbox
            label="Border"
            checked={ this.value('border') }
            onChange={ this.action.bind(this, 'border') }
          />
          <Checkbox
            label="Footer"
            checked={ this.value('footer') }
            onChange={ this.action.bind(this, 'footer') }
          />
          <Checkbox
            label="Edit content full width"
            checked={ this.value('editContentFullWidth') }
            onChange={ this.action.bind(this, 'editContentFullWidth') }
          />
          <Dropdown
            label="Align Title"
            labelInline={ true }
            options={ this.alignOptions }
            value={ this.value('alignTitle') }
            onChange={ this.action.bind(this, 'alignTitle') }
            disabled={ !this.value('title') }
          />
        </Row>
        <Row>
          <Checkbox
            label="Trigger edit on content"
            checked={ this.value('triggerEditOnContent') }
            onChange={ this.action.bind(this, 'triggerEditOnContent') }
          />
          <Checkbox
            label='Display edit button on hover'
            checked={ this.value('displayEditButtonOnHover') }
            onChange={ this.action.bind(this, 'displayEditButtonOnHover') }
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
