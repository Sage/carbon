import React from 'react';
import LearnMoreContent from './../../components/learn-more-content';

class LearnMore extends React.Component {
  render() {
    return (
      <div className='carbon-homepage__learn-more'>
        <LearnMoreContent
          className='carbon-hompage__learn-more-content'
          title='Global Scale'
          footerContent='Learn more about Sage'
          footerHref='http://www.sage.com'
        >
          At Sage we are actively designing, developing and testing the Carbon library. It is the global foundation used in delivering Sage One. As Sage One pushes out changes, Carbon is updated seeminglessly, giving you access to the latest release.
        </LearnMoreContent>
        <LearnMoreContent
          className='carbon-hompage__learn-more-content'
          title='Constantly Improving'
          footerContent='Learn more recent updates'
        >
          At Sage we are actively designing, developing and testing the Carbon library. It is the global foundation used in delivering Sage One. As Sage One pushes out changes, Carbon is updated seeminglessly, giving you access to the latest release.
        </LearnMoreContent>
      </div>
    );
  }
}

export default LearnMore;
