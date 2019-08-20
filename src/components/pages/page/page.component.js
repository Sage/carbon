import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../../utils/helpers/tags';
import FullScreenHeading from '../../dialog-full-screen/full-screen-heading';
import AppWrapper from '../../app-wrapper';
import StyledPage from './page.style';

const Page = ({
  className,
  title,
  children,
  ...props
}) => {
  return (
    <StyledPage
      className={ classNames('carbon-page', className) }
      { ...tagComponent('page', props) }
    >
      <FullScreenHeading hasContent={ title }>
        { title }
      </FullScreenHeading>
      <div className='carbon-page__content'>
        <AppWrapper>
          { children }
        </AppWrapper>
      </div>
    </StyledPage>
  );
};

Page.propTypes = {
  /**
   * A custom class name for the component.
   */
  className: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

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
