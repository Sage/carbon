import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import Tooltip from "../tooltip";
import tagComponent from "../../utils/helpers/tags";
import PortraitGravatar from "./portrait-gravatar.component";
import PortraitInitials from "./portrait-initials.component";
import { StyledCustomImg, StyledIcon } from "./portrait.style";

import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);
class Portrait extends React.Component {
  state = {
    externalError: false,
  };

  componentDidUpdate(prevProps) {
    const relevantPropsChanged =
      this.props.gravatar !== prevProps.gravatar ||
      this.props.src !== prevProps.src;

    if (relevantPropsChanged) {
      this.setState({ externalError: false }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  getMarginProps() {
    return filterStyledSystemMarginProps(this.props);
  }

  externalImageLoadFailed() {
    this.setState({ externalError: true });
  }

  render() {
    const {
      alt,
      darkBackground,
      gravatar,
      initials,
      shape,
      size,
      src,
      onClick,
      tooltipMessage,
      tooltipId,
      tooltipIsVisible,
      tooltipPosition,
      tooltipType,
      tooltipSize,
      tooltipBgColor,
      tooltipFontColor,
    } = this.props;

    const tagProps = tagComponent("portrait", this.props);

    let portrait = (
      <StyledIcon
        type="individual"
        size={size}
        shape={shape}
        darkBackground={darkBackground}
        onClick={onClick}
        {...tagProps}
      />
    );

    if (initials) {
      portrait = (
        <PortraitInitials
          size={size}
          shape={shape}
          initials={initials}
          darkBackground={darkBackground}
          alt={alt}
          onClick={onClick}
          {...tagProps}
          {...this.getMarginProps()}
        />
      );
    }

    if (src && !this.state.externalError) {
      portrait = (
        <StyledCustomImg
          src={src}
          alt={alt}
          size={size}
          shape={shape}
          data-element="user-image"
          onError={() => this.externalImageLoadFailed()}
          onClick={onClick}
          {...tagProps}
          {...this.getMarginProps()}
        />
      );
    }

    if (gravatar && !this.state.externalError) {
      portrait = (
        <PortraitGravatar
          gravatarEmail={gravatar}
          shape={shape}
          size={size}
          alt={alt}
          errorCallback={() => this.externalImageLoadFailed()}
          onClick={onClick}
          {...tagProps}
          {...this.getMarginProps()}
        />
      );
    }

    if (tooltipMessage) {
      return (
        <Tooltip
          message={tooltipMessage}
          id={tooltipId}
          position={tooltipPosition}
          type={tooltipType}
          size={tooltipSize}
          isVisible={tooltipIsVisible}
          bgColor={tooltipBgColor}
          fontColor={tooltipFontColor}
        >
          {portrait}
        </Tooltip>
      );
    }

    return portrait;
  }
}

Portrait.propTypes = {
  ...marginPropTypes,
  /** The size of the Portrait. */
  size: PropTypes.oneOf(["XS", "S", "M", "ML", "L", "XL", "XXL"]),
  /** A custom image URL. */
  src: (props) => {
    if (props.src && typeof props.src !== "string") {
      throw new Error(
        `Invalid prop \`src\` of type \`${typeof props.src}\` supplied to \`Portrait\`, expected \`string\`.`
      );
    } else if (props.gravatar && props.src) {
      throw new Error(
        'Portrait requires a prop of "src" or "gravatar" but not both'
      );
    }
  },
  /** An email address registered with Gravatar. */
  gravatar: PropTypes.string,
  /** The `alt` HTML string. */
  alt: PropTypes.string,
  /** The shape of the Portrait. */
  shape: PropTypes.oneOf(["circle", "square"]),
  /** The initials to render in the Portrait. */
  initials: PropTypes.string,
  /** Use a dark background. */
  darkBackground: PropTypes.bool,
  /** Prop for `onClick` events. */
  onClick: PropTypes.func,
  /** The message to be displayed within the tooltip */
  tooltipMessage: PropTypes.node,
  /** The id attribute to use for the tooltip */
  tooltipId: PropTypes.string,
  /** Whether to to show the Tooltip */
  tooltipIsVisible: PropTypes.bool,
  /** Sets position of the tooltip */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Defines the message type */
  tooltipType: PropTypes.string,
  /** Defines the size of the tooltip content */
  tooltipSize: PropTypes.oneOf(["medium", "large"]),
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor: PropTypes.string,
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor: PropTypes.string,
};

Portrait.defaultProps = {
  size: "M",
  shape: "square",
  darkBackground: false,
  alt: "",
};

export default Portrait;
