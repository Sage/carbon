import React from "react";
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
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

interface ImageShape {
  /** The url string to be passed to image src */
  url: string;
  /** The string to be passed to image alt */
  alt?: string;
}

export interface LinkPreviewProps extends TagProps {
  /** Used to set the root element to either an anchor link or div container */
  as?: "a" | "div";
  /** The description to be displayed */
  description?: string;
  /** The config for the image to be displayed */
  image?: ImageShape;
  /** Flag to trigger the loading animation */
  isLoading?: boolean;
  /** The callback to handle the deleting of a Preview, to hide the close button do not set this prop */
  onClose?: (url?: string) => void;
  /** The title to be displayed */
  title?: string;
  /** The url string to be displayed and to serve as the link's src */
  url?: string;
}

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
}: LinkPreviewProps) => {
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

  const linkProps = canRenderAsLink
    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <StyledLinkPreview
      as={loadingState ? "div" : as}
      tabIndex={loadingState || as === "div" ? -1 : 0}
      {...linkProps}
      {...rest}
      {...tagComponent("link-preview", rest)}
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
            onClick={() => onClose(url)}
          >
            <Icon type="close" />
          </IconButton>
        </StyledCloseIconWrapper>
      )}
    </StyledLinkPreview>
  );
};

LinkPreview.displayName = "LinkPreview";

export default LinkPreview;
