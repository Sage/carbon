import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { PaddingProps } from "styled-system";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import FullScreenHeading from "../../../__internal__/full-screen-heading";
import Box from "../../box";
import { StyledPage, StyledPageContent } from "./page.style";
import { filterStyledSystemPaddingProps } from "../../../style/utils";

export interface PageProps extends PaddingProps {
  /** The title for the page, normally a Heading component. */
  title?: React.ReactNode;
  /** This component supports children. */
  children: React.ReactNode;
  /** The ARIA role to be applied to the component */
  role?: string;
  /** @ignore @private */
  transitionName?: () => string;
}

const Page = ({ role, title, children, ...rest }: PageProps) => {
  const styledPageNodeRef = useRef(null);
  const { transitionName } = rest;
  return (
    <CSSTransition
      className="carbon-carousel__transition"
      timeout={{
        appear: 0,
        enter: 0,
        exit: 0,
      }}
      {...(transitionName && { classNames: transitionName() })}
      nodeRef={styledPageNodeRef}
      {...rest}
    >
      <StyledPage
        {...tagComponent("page", rest)}
        ref={styledPageNodeRef}
        role={role}
      >
        {/* Conditionally rendered the heading */}
        {title ? (
          <FullScreenHeading hasContent>{title}</FullScreenHeading>
        ) : null}
        <StyledPageContent
          data-element="carbon-page-content"
          data-role="page-content"
          p="34px 40px"
          {...filterStyledSystemPaddingProps(rest)}
        >
          <Box
            boxSizing="border-box"
            maxWidth="100%"
            minWidth="auto"
            margin="0 auto"
          >
            {children}
          </Box>
        </StyledPageContent>
      </StyledPage>
    </CSSTransition>
  );
};

Page.displayName = "Page";

export default Page;
