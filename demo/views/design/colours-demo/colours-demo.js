import React from 'react';
import Row from 'components/row';
import Pod from 'components/pod';

class ColoursDemo extends React.Component {

  colourSample = (colourName) => {
    return (
      <div className='colour-sample'>
        <div className={ `colour-sample__blob colour-sample__blob--${ colourName }` } />
        <div className='colour-sample__name'>
          { colourName }
        </div>
      </div>
    );
  }

  render() {
    return (
      <Pod className="ui-example" title='Colours'>
        <Row>
          { this.colourSample('white') } 
          { this.colourSample('black') } 
          { this.colourSample('grey') } 
          { this.colourSample('grey-dark-blue') } 
          { this.colourSample('grey-dark-blue-90') } 
          { this.colourSample('grey-dark-blue-80') } 
          { this.colourSample('grey-dark-blue-70') } 
          { this.colourSample('grey-dark-blue-60') } 
        </Row>
        <Row>
          { this.colourSample('grey-dark-blue-50') } 
          { this.colourSample('grey-dark-blue-40') } 
          { this.colourSample('grey-dark-blue-30') } 
          { this.colourSample('grey-dark-blue-20') } 
          { this.colourSample('grey-dark-blue-10') } 
          { this.colourSample('grey-dark-blue-5') } 
          { this.colourSample('grey-dark') } 
          { this.colourSample('grey-mid') } 
        </Row>
        <Row>
          { this.colourSample('grey-light') } 
          { this.colourSample('grey-background') } 
          { this.colourSample('grey-header') } 
          { this.colourSample('green') } 
          { this.colourSample('green-mid') } 
          { this.colourSample('green-bright') } 
          { this.colourSample('green-bright-dull') } 
          { this.colourSample('green-apple') } 
        </Row>
        <Row>
          { this.colourSample('green-apple-05') } 
          { this.colourSample('green-apple-20') } 
          { this.colourSample('orange') } 
          { this.colourSample('orange-bright') } 
          { this.colourSample('orange-bright-05') } 
          { this.colourSample('orange-bright-20') } 
          { this.colourSample('orange-mid') } 
          { this.colourSample('blue') } 
        </Row>
        <Row>
          { this.colourSample('blue-dark') } 
          { this.colourSample('blue-bright') } 
          { this.colourSample('blue-navy') } 
          { this.colourSample('blue-sky') } 
          { this.colourSample('blue-sky-05') } 
          { this.colourSample('blue-sky-20') } 
          { this.colourSample('blue-light') } 
          { this.colourSample('red') } 
        </Row>
        <Row>
          { this.colourSample('red-05') } 
          { this.colourSample('red-20') } 
          { this.colourSample('yellow') } 
          { this.colourSample('yellow-05') } 
          { this.colourSample('yellow-20') } 
          { this.colourSample('magenta') } 
          { this.colourSample('magenta-dull') } 
          { this.colourSample('purple') } 
        </Row>
        <Row>
          { this.colourSample('purple-05') } 
          { this.colourSample('purple-20') } 
        </Row>

        <h4>Common Styles</h4>
        <Row>
          { this.colourSample('border-color') } 
          { this.colourSample('table-border-color') } 
          { this.colourSample('background-alt') } 
          { this.colourSample('pod-footer') } 
          { this.colourSample('row-alt-color') } 
          { this.colourSample('row-hover-color') } 
          { this.colourSample('row-hover-input-border') } 
        </Row>

        <h4>Icon Sets</h4>
        <h5>Warning</h5>
        <Row>
          { this.colourSample('warning') } 
          { this.colourSample('warning-text-background') } 
          { this.colourSample('warning-border') } 
          { this.colourSample('warning-hover') } 
        </Row>
        <h5>Error</h5>
        <Row>
          { this.colourSample('error') } 
          { this.colourSample('error-text-background') } 
          { this.colourSample('error-border') } 
          { this.colourSample('error-hover') } 
        </Row>
        <h5>Info</h5>
        <Row>
          { this.colourSample('info') } 
          { this.colourSample('info-text-background') } 
          { this.colourSample('info-border') } 
          { this.colourSample('info-hover') } 
        </Row>
        <h5>New</h5>
        <Row>
          { this.colourSample('new') } 
          { this.colourSample('new-text-background') } 
          { this.colourSample('new-border') } 
          { this.colourSample('new-hover') } 
        </Row>
        <h5>Success</h5>
        <Row>
          { this.colourSample('success') } 
          { this.colourSample('success-text-background') } 
          { this.colourSample('success-border') } 
          { this.colourSample('success-hover') } 
        </Row>
        <h5>Help</h5>
        <Row>
          { this.colourSample('help') } 
          { this.colourSample('help-text-background') } 
          { this.colourSample('help-border') } 
          { this.colourSample('help-hover') } 
        </Row>
      </Pod>
    );
  }
}

export default ColoursDemo;
