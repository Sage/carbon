import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';
import FieldSet from 'components/fieldset';
import ShowEditPod from 'components/show-edit-pod';
import Content from 'components/content';

class ShowEditPodDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['show_edit_pod', key]);
  }

  editValue = (key) => {
    return this.state.appStore.getIn(['show_edit_pod', 'edit', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'show_edit_pod');
  }

  onEdit = () => {
    AppActions.editContent('show_edit_pod');
  }

  onSave = () => {
    AppActions.saveEditedContent('show_edit_pod')
  }

  demoFieldProps = (key) => {
    return {
      labelInline: true,
      labelAlign: 'right',
      value: this.editValue(key),
      label: key,
      onChange: this.action.bind(this, ['edit', key])
    };
  }

  /**
   * @method demo
   */
  get demo() {
    let fields = (
      <FieldSet key='foo'>
        <Textbox { ...this.demoFieldProps('address_1') } />
        <Textbox { ...this.demoFieldProps('address_2') } />
        <Textbox { ...this.demoFieldProps('city') } />
        <Textbox { ...this.demoFieldProps('county') } />
        <Textbox { ...this.demoFieldProps('country') } />
        <Textbox { ...this.demoFieldProps('postcode') } />
      </FieldSet>
    );

    let editFields = [ fields ]

    let content = this.value('address_1') || '';
    if (this.value('address_2')) { content += '\n' + this.value('address_2'); }
    if (this.value('city')) { content += '\n' + this.value('city'); }
    if (this.value('county')) { content += '\n' + this.value('county'); }
    if (this.value('country')) { content += '\n' + this.value('country'); }
    if (this.value('postcode')) { content += '\n' + this.value('postcode'); }

    let onDelete = this.value('deletable') ? (() => {} ) : null;

    return (
      <ShowEditPod
        editFields={ editFields }
        afterFormValidation={ this.onSave }
        onEdit={ this.onEdit }
        onCancel={ (() => {} ) }
        saveText='Save Address'
        onDelete={ onDelete }
      >
        <Content title='Company Name'>
          { content }
        </Content>
      </ShowEditPod>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import ShowEditPod from 'carbon/lib/components/show-edit-pod';\n\n";

    html += 'let fields = [\n';
    html += '  <FieldSet key="foo">\n';
    html += '    <Textbox { ...this.demoFieldProps("address_1") } />\n';
    html += '    <Textbox { ...this.demoFieldProps("address_2") } />\n';
    html += '    <Textbox { ...this.demoFieldProps("city") } />\n';
    html += '    <Textbox { ...this.demoFieldProps("county") } />\n';
    html += '    <Textbox { ...this.demoFieldProps("country") } />\n';
    html += '    <Textbox { ...this.demoFieldProps("postcode") } />\n';
    html += '  </FieldSet>\n';
    html += '];\n\n';

    html += 'return (\n';
    html += '  <ShowEditPod\n';
    html += '    editFields={ fields }\n';
    html += '    afterFormValidation={ this.onSave }\n';
    html += '    onEdit={ this.onEdit }\n';
    html += '    onCancel={ this.onCancel }\n';
    html += '    saveText="Save Address"\n';

    if (this.value('deletable')) {
      html += '    onDelete={ this.onDelete }\n';
    }

    html += '  >\n';
    html += '    <Content title="Company Name">\n';
    html += '      { this.value("address_1") }\n';
    html += '      { this.value("address_2") }\n';
    html += '      { this.value("city") }\n';
    html += '      { this.value("county") }\n';
    html += '      { this.value("country") }\n';
    html += '      { this.value("postcode") }\n';
    html += '    </Content>\n';
    html += '  </ShowEditPod>\n';
    html += ');\n';

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <Checkbox
        label="Deletable?"
        value={ this.value('deletable') }
        onChange={ this.action.bind(this, 'deletable') }
      />
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Show Edit Pod"
        readme="components/show-edit-pod"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(ShowEditPodDemo, AppStore);
