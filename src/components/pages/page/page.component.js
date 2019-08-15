import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../../utils/helpers/tags';
import FullScreenHeading from '../../dialog-full-screen/full-screen-heading';
import AppWrapper from '../../app-wrapper';
import StyledPage from './page.style';

const pageClasses = (props) => {
  return classNames('carbon-page', props.className);
};

class Page extends React.Component {
  render() {
    return(
      <StyledPage className={ pageClasses(this.props) } { ...tagComponent('page', this.props) }>
        <FullScreenHeading>
          { this.props.title }
        </FullScreenHeading>

        <div className='carbon-page__content'>
          <AppWrapper>
            { this.props.children }
          </AppWrapper>
        </div>
      </StyledPage>
    )
  }
}

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
    PropTypes.object
  ])
};

export default Page;
