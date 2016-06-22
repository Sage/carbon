import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import { Carousel, Slide } from 'components/carousel';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Textarea from 'components/textarea';
import Button from 'components/button';
import Icon from 'components/icon';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

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

  get slides() {
    return this.value('slideData').map((data, index) => {
      let content = data.get('content') || 'https://cdn.auth0.com/blog/react-js/react.png'
      return (
        <Slide style={ { textAlign: 'center' } } key={ index }>
          <img width={ 200 } src={ content } />
        </Slide>
      );
    }).toJS();
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Carousel>
        { this.slides }
      </Carousel>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import { Carousel, Slide } from 'carbon/lib/components/tabs';\n\n";

    html += '<Carousel>\n';

    this.value('slideData').map((data, index) => {
      let content = data.get('content') || `Slide ${ index + 1 }`

      html += `  <Slide>`;

      html += `\n`;
      html += '    ' + content;
      html += `\n`;
      html += `  </Slide>`;
      html += `\n`;
    });

    html += '</Carousel>'

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    let tableRows = Immutable.List(),
        length = this.value('slideData').count();

    // table rows:
    tableRows = this.value('slideData').map((data, index) => {
      let deleteCell = length == 1 ?
        null : <Icon type="delete" onClick={ AppActions.appDeleteRow.bind(this, ['carousel', 'slideData', index]) } />;

      return (
        <TableRow key={ index }>

          <TableCell action={ true }>
            { deleteCell }
          </TableCell>

          <TableCell>
            <Textbox
              label={ false }
              value={ data.get('content') }
              onChange={ this.action.bind(this, ['slideData', index, 'content']) }
              placeholder='https://cdn.auth0.com/blog/react-js/react.png'
            />
          </TableCell>

        </TableRow>
      );
    });

    // table header:
    tableRows = tableRows.unshift(
      <TableRow key="header">
        <TableHeader />
        <TableHeader>Image</TableHeader>
      </TableRow>
    );

    // create row:
    tableRows = tableRows.push(
      <TableRow key={ length }>
        <TableCell />
        <TableCell>
          <Button onClick={ this.action.bind(this, ['slideData', length, 'foo']) } disabled={ length == 8 }>Add Column</Button>
        </TableCell>
        <TableCell />
      </TableRow>
    );

    return (
      <div>
        <Row>
          <Table>{ tableRows }</Table>
        </Row>
      </div>
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
