import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import FullScreenHeading from '../../dialog-full-screen/full-screen-heading';
import AppWrapper from '../../app-wrapper';

const pageClasses = (props) => {
  return classNames('carbon-page', props.className);
};

const Page = props => (
  <article className={ pageClasses(props) } { ...tagComponent('page', props) }>
    <FullScreenHeading>
      { props.title }
    </FullScreenHeading>

    <div className='carbon-page__content'>
      <AppWrapper>
        { props.children }
      </AppWrapper>
    </div>
  </article>
);

Page.propTypes = {
  className: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

export default Page;
