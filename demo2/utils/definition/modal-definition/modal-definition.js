import ComponentActions from './../../../actions/component';
import { assign } from 'lodash';

export default (definition) => {
 definition.propTypes = assign({}, definition.propTypes, {
    disableEscKey: "Boolean",
    enableBackgroundUI: "Boolean",
    open: "Boolean",
    onCancel: "Function",
  });

  definition.propValues = assign({}, definition.propValues, {
    open: false
  });

  definition.requiredProps = definition.requiredProps.concat(['open']);

  definition.stubAction('onCancel', 'open', false);

  definition.type = 'modal';

  definition.propDescriptions = assign({}, definition.propDescriptions, {
    onCancel: "A callback for when cancelling the dialog is triggered. You can use this callback to close the dialog.",
    open: "A boolean to track the open state of the dialog.",
    enableBackgroundUI: "Set this prop to false to hide the translucent background when the dialog is open.",
    disableEscKey: "Set this prop to true to stop the escape key from triggering onCancel."
  });

  definition.openPreview = true;
}
