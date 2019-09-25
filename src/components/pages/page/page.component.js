import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import FullScreenHeading from '../../dialog-full-screen/full-screen-heading';
import AppWrapper from '../../app-wrapper';
import { StyledPage, StyledPageContent } from './page.style';

const Page = ({
  title,
  children,
  ...props
}) => {
  return (
    <StyledPage { ...tagComponent('page', props) }>
      <FullScreenHeading hasContent={ title }>
        { title }
      </FullScreenHeading>
      <StyledPageContent data-element='carbon-page-content'>
        <AppWrapper>
          { children }
        </AppWrapper>
      </StyledPageContent>
    </StyledPage>
  );
};

Page.propTypes = {
  /**
   * The title for the page, normally a Heading component.
   */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),

  /**
   * This component supports children.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node
  ])
};

export default Page;
