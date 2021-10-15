import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import FullScreenHeading from "../../../__internal__/full-screen-heading";
import AppWrapper from "../../app-wrapper";
import { StyledPage, StyledPageContent } from "./page.style";

const Page = ({ title, children, ...props }) => {
  return (
    <CSSTransition
      className="carbon-carousel__transition"
      timeout={{
        appear: 0,
        enter: 0,
        exit: 0,
      }}
      // eslint-disable-next-line react/prop-types
      classNames={props.transitionName()}
      {...props}
    >
      <StyledPage {...tagComponent("page", props)}>
        <FullScreenHeading hasContent={title}>{title}</FullScreenHeading>
        <StyledPageContent data-element="carbon-page-content">
          <AppWrapper>{children}</AppWrapper>
        </StyledPageContent>
      </StyledPage>
    </CSSTransition>
  );
};

Page.propTypes = {
  /**
   * The title for the page, normally a Heading component.
   */
  title: PropTypes.node.isRequired,

  /**
   * This component supports children.
   */
  children: PropTypes.node.isRequired,
};

export default Page;
