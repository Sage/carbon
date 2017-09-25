import React from 'react';

import ComponentShowcase from './component-showcase';
import GetStarted from './get-started';
import PageHeaderLarge from '../../common/page-header-large';
import SageLovesCarbon from './sage-loves-carbon';
import SellingPoints from './selling-points';
import Sectioniser from './sectioniser';
import Wrapper from './../../common/wrapper';

import Textbox from 'components/textbox';
import MultiProp from 'utils/validations/multi-prop';
import Presence from 'utils/validations/presence';

class Home extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div style={ { width: '50%', padding: '100px' } } >
        <Textbox
          foo='foo'
          bar='bar'
          validations={ [
            new MultiProp({
              requireAll: true,
              props: ['foo', 'bar'],
              validator: new Presence()
            })
          ] }
        />
        <Textbox
          foo='foo'
          bar='bar'
          validations={ [
            new Presence({
              requireAll: true,
              props: ['foo', 'bar']
            })
          ] }
        />
      </div>
    );
  }
}

export default Home;
