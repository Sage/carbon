import React from 'react';
import SimpleContent from '../../components/simple-content';
import Wrapper from '../../chrome/wrapper';

class LearnMore extends React.Component {
  render() {
    return (
        <div className='learn-more'>
          <Wrapper>
            <SimpleContent
              className='learn-more__cell'
              title='Global Scale'
              footerContent='Learn more about Sage'
              footerHref='http://www.sage.com'
            >
              At Sage we are actively designing, developing and testing the Carbon library. It is the global foundation used in delivering Sage One. As Sage One pushes out changes, Carbon is updated seeminglessly, giving you access to the latest release.
            </SimpleContent>
            <SimpleContent
              className='learn-more__cell'
              title='Constantly Improving'
              footerContent='Learn more recent updates'
            >
              At Sage we are actively designing, developing and testing the Carbon library. It is the global foundation used in delivering Sage One. As Sage One pushes out changes, Carbon is updated seeminglessly, giving you access to the latest release.
            </SimpleContent>
          </Wrapper>
        </div>
    );
  }
}

export default LearnMore;
