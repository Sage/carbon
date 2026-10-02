import React from "react";
import {
  StyledLinkPreview,
  StyledWrapper,
  StyledContentWrapper,
  StyledTitleWrapper,
  StyledTitle,
  StyledDescription,
  StyledUrl,
  StyledThumbnailWrapper,
  StyledThumbnailImage,
} from "./link-preview.style";
import Preview from "../preview";
import Button from "../button/__next__";
import Icon from "../icon";
import Divider from "../divider";
import Placeholder from "./__internal__/placeholder.component";
import Link from "../link";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import useLocale from "../../hooks/__internal__/useLocale";

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
  /** The callback for the close button. The button is rendered when this is set alongside `as="div"`. */
  onClose?: (url?: string) => void;
  /** The title to be displayed */
  title?: string;
  /** The url string to be displayed and to serve as the link's src */
  url?: string;
  /** Set the component's size. */
  size?: "small" | "medium" | "large";
}

const SCHEME_SEPARATOR = "://";

export const LinkPreview = ({
  as,
  description,
  image,
  isLoading,
  onClose,
  title,
  url,
  size = "medium",
  ...rest
}: LinkPreviewProps) => {
  const locale = useLocale();
  const loadingState = isLoading || !url;
  const canRenderAsLink = !loadingState && as !== "div";

  const imageProps = () => {
    return {
      src: image?.url,
      alt: image?.alt || "",
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

  const linkProps = { href: url, target: "_blank", rel: "noopener noreferrer" };

  const linkSize: "medium" | "large" = size === "small" ? "medium" : size;
  const closeButtonSize = size === "large" ? "medium" : "small";

  const internalIsLoading = isLoading || !url;
  const showPlaceholderImage = internalIsLoading || !imageProps().src;

  // TODO: check when Preview is aligned with Fusion
  const preview = (
    <>
      <Preview
        loading
        my="var(--global-space-comp-s)"
        height={size === "small" ? "16px" : "20px"}
        width="100%"
      />
      <Preview
        loading
        my="var(--global-space-comp-s)"
        height="10px"
        lines={size === "small" ? 2 : 3}
      />
    </>
  );

  const content = (
    <>
      <StyledContentWrapper>
        <StyledTitleWrapper $size={size}>
          {title && <StyledTitle $size={size}>{title}</StyledTitle>}
          {onClose && as === "div" && (
            <Button
              aria-label={locale.linkPreview?.closeButtonAriaLabel?.()}
              onClick={() => onClose(url)}
              variantType="subtle"
              size={closeButtonSize}
            >
              <Icon type="cross" />
            </Button>
          )}
        </StyledTitleWrapper>
        {description && (
          <StyledDescription $size={size}>{description}</StyledDescription>
        )}
      </StyledContentWrapper>
      {as === "div" ? (
        <Link linkSize={linkSize} variant="subtle" {...linkProps}>
          {displayUrl()}
        </Link>
      ) : (
        <StyledUrl $size={size}>{displayUrl()}</StyledUrl>
      )}
    </>
  );

  return (
    <StyledLinkPreview
      as={loadingState ? "div" : as}
      {...(as === "div" && { role: "article" })}
      {...(canRenderAsLink && { ...linkProps })}
      {...rest}
      {...tagComponent("link-preview", rest)}
    >
      <StyledThumbnailWrapper>
        {showPlaceholderImage ? (
          <Placeholder />
        ) : (
          <StyledThumbnailImage
            {...(!image?.alt && { "aria-hidden": "true" })}
            {...imageProps()}
          />
        )}
      </StyledThumbnailWrapper>
      <Divider m={0} type="horizontal" />
      <StyledWrapper $size={size} $isLoading={internalIsLoading}>
        {internalIsLoading ? preview : content}
      </StyledWrapper>
    </StyledLinkPreview>
  );
};

LinkPreview.displayName = "LinkPreview";

export default LinkPreview;
