Then('Element displays correctly', () => {
  if ( Cypress.env('CYPRESS_APPLITOOLS') ) {
    cy.eyesCheckWindow({
      target: 'region',
      selector: '#storybook-preview-iframe'
    });
  }
});

Then('Element displays correctly in iframe', () => {
  if ( Cypress.env('CYPRESS_APPLITOOLS') ) {
    cy.eyesCheckWindow({
      target: 'region',
      selector: '#story-root'
    });
  }
});

const ensure_element_style = `
  let frame = document.querySelector('#storybook-preview-iframe');
  let innerDoc = frame.contentDocument || frame.contentWindow.document;
  // let elem = innerDoc.evaluate('/html/body/div[5]/div/div[2]/div', innerDoc).iterateNext();
  let elem = innerDoc.querySelector('div[role][role="dialog"]');


  //Pulled from your code
  let innerWin = frame.contentWindow; 
  let midPointY = innerWin.innerHeight / 2;
  let midPointX = innerWin.innerWidth / 2;
  let height = elem.offsetHeight / 2; 
  let width = elem.offsetWidth / 2; 

  if (20 > (midPointY -= height) && (midPointY = 20), 20 > (midPointX -= width) && (midPointX = 20)) {
  //pulled directly from the listener event on your page
  }
  elem.style.top = midPointY + 'px';
  elem.style.left = midPointX + 'px'; 
`

Then('Element displays correctly in full screen', () => {
  if (Cypress.env('CYPRESS_APPLITOOLS')) {
      cy.get('.css-18i2ql3 > .css-9c2gku > .css-ha8kg').click()
      cy.eyesCheckWindow({
        scriptHooks: {
          beforeCaptureScreenshot: ensure_element_style
        }
      })
      cy.get('.css-18i2ql3 > .css-9c2gku > .css-ha8kg').click()
  }
});
