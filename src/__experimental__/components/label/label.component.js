import React from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help';
import StyledLabel from './label.style';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import { getValidationType } from '../../../components/validations/with-validation.hoc';
import { filterByProps } from '../../../utils/ether';

const validationsPresent = ({ hasError, hasWarning, hasInfo }) => hasError || hasWarning || hasInfo;

const Label = (props) => {
  const {
    labelId,
    helpId,
    children,
    help,
    helpIcon,
    helpTag,
    helpTabIndex,
    tooltipMessage,
    useValidationIcon,
    htmlFor
  } = props;
  const labelProps = filterByProps(props, [
    'theme',
    'disabled',
    'inline',
    'align',
    'inputSize',
    'width',
    'childOfForm',
    'optional'
  ]);

  const icon = () => {
    if (useValidationIcon && validationsPresent(props) && tooltipMessage) {
      return (
        <ValidationIcon
          iconId={ helpId }
          type={ getValidationType(props) }
          tooltipMessage={ tooltipMessage }
          tabIndex={ helpTabIndex }
        />
      );
    }

    return help && (
      <Help
        helpId={ helpId }
        as={ helpTag }
        tabIndex={ helpTabIndex }
        type={ helpIcon }
      >
        {help}
      </Help>
    );
  };

  return (
    <StyledLabel
      data-element='label'
      { ...labelProps }
    >
      {/* eslint jsx-a11y/label-has-for: ["error", { every: ["id"], allowChildren: true } ] */}
      <label id={ labelId } htmlFor={ htmlFor }>{children}</label>
      {/* eslint-enable jsx-a11y/label-has-for */}
      {icon()}
    </StyledLabel>
  );
};

Label.propTypes = {
  /** The unique id of the label element */
  labelId: PropTypes.string,
  /** The unique id of the Help component */
  helpId: PropTypes.string,
  /** Children elements */
  children: PropTypes.node,
  /** A message that the Help component will display */
  help: PropTypes.string,
  /** Icon type */
  helpIcon: PropTypes.string,
  /** Overrides the default 'as' attribute of the Help component */
  helpTag: PropTypes.string,
  /** Overrides the default tabindex of the Help component */
  helpTabIndex: PropTypes.number,
  /** A message that the ValidationIcon component will display */
  tooltipMessage: PropTypes.string,
  /** Whether to show the validation icon */
  useValidationIcon: PropTypes.bool,
  /** A string that represents the ID of another form element */
  htmlFor: PropTypes.string
};

Label.defaultProps = {
  useValidationIcon: false
};

export default React.memo(Label);
