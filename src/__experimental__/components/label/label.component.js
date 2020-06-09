import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help';
import StyledLabel from './label.style';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import { filterByProps } from '../../../utils/ether';
import IconWrapperStyle from './icon-wrapper.style';
import Logger from '../../../utils/logger/logger';

const shouldDisplayValidationIcon = ({ error, warning, info }) => {
  const validation = error || warning || info;
  return typeof validation === 'string';
};

let deprecatedWarnTriggered = false;

const Label = (props) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    Logger.deprecate('`styleOverride` that is used in the `Label` component is deprecated and will soon be removed.');
  }
  const [isFocused, setFocus] = useState(false);
  const {
    labelId,
    helpId,
    children,
    error,
    warning,
    info,
    help,
    helpIcon,
    helpTag,
    helpTabIndex,
    useValidationIcon,
    htmlFor,
    tabIndex,
    styleOverride
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

    if (useValidationIcon && shouldDisplayValidationIcon(props)) {
      return (
        <IconWrapperStyle { ...wrapperProps }>
          <ValidationIcon
            iconId={ helpId }
            error={ error }
            warning={ warning }
            info={ info }
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
      styleOverride={ styleOverride }
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
  /** Status of error validations */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Status of warnings */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Status of info */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** A message that the Help component will display */
  help: PropTypes.string,
  /** Icon type */
  helpIcon: PropTypes.string,
  /** Overrides the default 'as' attribute of the Help component */
  helpTag: PropTypes.string,
  /** Overrides the default tabindex of the Help component */
  helpTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Whether to show the validation icon */
  useValidationIcon: PropTypes.bool,
  /** A string that represents the ID of another form element */
  htmlFor: PropTypes.string,
  /** Set focus possibilities to an <IconWrapperStyle /> element.
   *  More information: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
  */
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Allows to override existing component styles */
  styleOverride: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

Label.defaultProps = {
  useValidationIcon: true,
  tabIndex: 0,
  styleOverride: {}
};

export default React.memo(Label);
