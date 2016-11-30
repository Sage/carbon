import React from 'react';

import ComplexHeading from '../../components/complex-heading';
import ContentGrid from '../../components/content-grid';
import ContentGridItem from '../../components/content-grid/content-grid-item';
import IconPanel from '../../components/icon-panel';
import Wrapper from '../../chrome/wrapper';

/**
 * A set of icons representing selling points of Carbon
 *
 * @param {object} props
 * @return {SellingPoints}
 */
export default props => (
  <div className='selling-points'>
    <Wrapper>
      <ComplexHeading
        heading='Ready, set, '
        headingSuffix='code!'
        text='Beside having beautiful UI that is easy to use, you’ll find there’s so much more to using Carbon on your next project.'
        align='center'
      />
      <ContentGrid>
        <ContentGridItem>
          <IconPanel
            icon='point'
            heading='Easy, fast, powerful'
            text='Over 50 components and 340 configurations bring your killer app to life.'
          />
        </ContentGridItem>
        <ContentGridItem>
          <IconPanel
            icon='flexible'
            heading='Beautifully flexible'
            text='Carbon is beautiful out-of-the-box, down to colours, icons, and style.'
          />
        </ContentGridItem>
        <ContentGridItem>
          <IconPanel
            icon='brush'
            heading='Designed for UX'
            text='Meet your users’ needs with a simple, elegant, delightful experience'
          />
        </ContentGridItem>
        <ContentGridItem>
          <IconPanel
            icon='hammer'
            heading='Build smarter'
            text='Hundreds of thousands of users worldwide help Carbon evolve.'
          />
        </ContentGridItem>
        <ContentGridItem>
          <IconPanel
            icon='plug'
            heading='Powered by you'
            text='Carbon powers your app. Contribute your code, so you power Carbon too.'
          />
        </ContentGridItem>
        <ContentGridItem>
          <IconPanel
            icon='collaborate'
            heading='Seamlessly collaborative'
            text='With Carbon’s UI Kit, designers and developers speak the same language.'
          />
        </ContentGridItem>
      </ContentGrid>
    </Wrapper>
  </div>
);
