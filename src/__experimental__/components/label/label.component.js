import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help';
import StyledLabel from './label.style';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import { getValidationType } from '../../../components/validations/with-validation.hoc';
import { filterByProps } from '../../../utils/ether';
import IconWrapperStyle from './icon-wrapper.style';

const validationsPresent = ({ hasError, hasWarning, hasInfo }) => hasError || hasWarning || hasInfo;

const Label = (props) => {
  const [isFocused, setFocus] = useState(false);
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
    htmlFor,
    tabIndex
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
    const wrapperProps = {
      tabIndex,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false)
    };

    if (useValidationIcon && validationsPresent(props) && tooltipMessage) {
      return (
        <IconWrapperStyle { ...wrapperProps }>
          <ValidationIcon
            iconId={ helpId }
            type={ getValidationType(props) }
            tooltipMessage={ tooltipMessage }
            tabIndex={ helpTabIndex }
            isFocused={ isFocused }
          />
        </IconWrapperStyle>

      );
    }

    return help && (
      <IconWrapperStyle { ...wrapperProps }>
        <Help
          helpId={ helpId }
          as={ helpTag }
          tabIndex={ -1 }
          type={ helpIcon }
          isFocused={ isFocused }
        >
          {help}
        </Help>
      </IconWrapperStyle>
    );
  };

  return (
    <StyledLabel
      data-element='label'
      { ...labelProps }
      id={ labelId }
      htmlFor={ htmlFor }
    >
      {children}
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
  helpTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** A message that the ValidationIcon component will display */
  tooltipMessage: PropTypes.string,
  /** Whether to show the validation icon */
  useValidationIcon: PropTypes.bool,
  /** A string that represents the ID of another form element */
  htmlFor: PropTypes.string,
  /** Set focus possibilities to an <IconWrapperStyle /> element.
   *  More information: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
  */
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Label.defaultProps = {
  useValidationIcon: false,
  tabIndex: 0
};

export default React.memo(Label);
