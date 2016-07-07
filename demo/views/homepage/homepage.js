import React from 'react';
import Pod from 'components/pod';
import MultiActionButton from 'components/multi-action-button';
import ShowEditPod from 'components/show-edit-pod';
import Textbox from 'components/textbox';
import FieldSet from 'components/fieldset';

class Homepage extends React.Component {
  /**
   * @method render
   */
  render() {
    let fields = (
      <FieldSet>
        <Textbox label='Address 1' labelInline={ true } labelAlign='right' />
        <Textbox label='Address 2' labelInline={ true } labelAlign='right' />
        <Textbox label='City' labelInline={ true } labelAlign='right' />
        <Textbox label='County' labelInline={ true } labelAlign='right' />
        <Textbox label='Postcode' labelInline={ true } labelAlign='right' />
      </FieldSet>
    );

    let editFields = [ fields ]

    return (
      <Pod style={ { width: '400px' } } className="ui-homepage">
        <ShowEditPod
          editFields={ editFields }
          onSave={ (ev) => {} }
          onCancel={ (() => {} ) }
          saveText='Save Address'
        >
          Hello
        </ShowEditPod>
      </Pod>
    );
  }
}

export default Homepage;
