import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import FullScreenHeading from "../../../__internal__/full-screen-heading";
import Box from "../../box";
import { StyledPage, StyledPageContent } from "./page.style";

export interface PageProps {
  /** The title for the page, normally a Heading component. */
  title: React.ReactNode;
  /** This component supports children. */
  children: React.ReactNode;
  /** @ignore @private */
  transitionName?: string;
}

const Page = ({ title, children, ...rest }: PageProps) => {
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
      classNames={transitionName}
      nodeRef={styledPageNodeRef}
      {...rest}
    >
      <StyledPage {...tagComponent("page", rest)} ref={styledPageNodeRef}>
        <FullScreenHeading hasContent={!!title}>{title}</FullScreenHeading>
        <StyledPageContent data-element="carbon-page-content">
          <Box
            boxSizing="border-box"
            maxWidth="100%"
            minWidth="auto"
            margin="0 auto"
            padding="4px 0px"
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
