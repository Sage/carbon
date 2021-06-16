import React from "react";
import PropTypes from "prop-types";
import {
  StyledLinkPreview,
  StyledPreviewWrapper,
  StyledCloseIconWrapper,
  StyledTitle,
  StyledDescription,
  StyledUrl,
} from "./link-preview.style";
import Image from "../image";
import Preview from "../preview";
import IconButton from "../icon-button";
import Icon from "../icon";
import Placeholder from "./__internal__/placeholder.component";

const SCHEME_SEPARATOR = "://";

const LinkPreview = ({
  as,
  description,
  image,
  isLoading,
  onClose,
  title,
  url,
  ...rest
}) => {
  const loadingState = isLoading || !url;
  const canRenderAsLink = !loadingState && as !== "div";

  const imageProps = () => {
    return {
      src: image?.url,
      alt: image?.alt || "Link preview image",
      height: "152px",
    };
  };

  const displayUrl = () => {
    if (url?.includes(SCHEME_SEPARATOR)) {
      const startIndex =
        url.indexOf(SCHEME_SEPARATOR) + SCHEME_SEPARATOR.length;
      return url.substring(startIndex);
    }

    return url;
  };

  return (
    <StyledLinkPreview
      as={loadingState ? "div" : as}
      tabIndex={loadingState || as === "div" ? -1 : 0}
      href={canRenderAsLink ? url : undefined}
      target={canRenderAsLink ? "_blank" : undefined}
      rel={canRenderAsLink ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {imageProps().src ? <Image {...imageProps()} /> : <Placeholder />}
      <StyledPreviewWrapper isLoading={loadingState}>
        <Preview loading={loadingState} lines={4}>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription>
            <div>{description}</div>
          </StyledDescription>
          <StyledUrl>{displayUrl()}</StyledUrl>
        </Preview>
      </StyledPreviewWrapper>
      {onClose && as === "div" && (
        <StyledCloseIconWrapper>
          <IconButton
            aria-label="link preview close button"
            onAction={() => onClose(url)}
          >
            <Icon type="close" />
          </IconButton>
        </StyledCloseIconWrapper>
      )}
    </StyledLinkPreview>
  );
};

LinkPreview.propTypes = {
  /** Used to set the root element to either am anchor link or div container */
  as: PropTypes.oneOf(["a", "div"]),
  /** The description to be displayed */
  description: PropTypes.string,
  /** The config for the image to be displayed */
  image: PropTypes.shape({
    /** The url string to be passed to image src */
    url: PropTypes.string.isRequired,
    /** The string to be passed to image alt */
    alt: PropTypes.string,
  }),
  /** Flag to trigger the loading animation */
  isLoading: PropTypes.bool,
  /** The callback to handle the deleting of a Preview, to hide the close button do not set this prop */
  onClose: PropTypes.func,
  /** The title to be displayed */
  title: PropTypes.string,
  /** The url string to be displayed and to serve as the link's src */
  url: PropTypes.string,
};

LinkPreview.displayName = "LinkPreview";

export default LinkPreview;
