import React from "react";
import { LinkBase, LinkBaseProps } from "./link-base.component";
import { StyledLink } from "./link.style";

interface LinkProps extends LinkBaseProps {
  variant?: "default" | "negative" | "neutral";
  isDarkBackground?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(
  (
    {
      children,
      variant = "default",
      isDarkBackground,
      className,
      ...rest
    }: LinkProps,
    ref,
  ) => {
    return (
      <StyledLink
        className={className}
        variant={variant}
        isDarkBackground={isDarkBackground}
        hasContent={Boolean(children)}
      >
        <LinkBase ref={ref} {...rest}>
          {children}
        </LinkBase>
      </StyledLink>
    );
  },
);

Link.displayName = "Link";
export default Link;
