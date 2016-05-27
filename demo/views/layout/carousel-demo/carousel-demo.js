import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Carousel from 'components/carousel';
import Slide from 'components/carousel/slide';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Textarea from 'components/textarea';

class CarouselDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['carousel', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'carousel');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Carousel>
        <Slide>
          Fofipdshfpispspfjsdapofhsdopajfposda
        </Slide>
        <Slide>
          Barfjdsapfhjdsapojfsdpojf
        </Slide>
        <Slide>
          Bazfdsjahipfjsdapofjsda
        </Slide>
        <Slide>
          Boofdasopfjdsopj
        </Slide>
      </Carousel>
    );
  }

  /**
   * @method code
   */
  get code() {
    return '';
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <Row>
      </Row>
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Carousel"
        readme="components/carousel"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(CarouselDemo, AppStore);
