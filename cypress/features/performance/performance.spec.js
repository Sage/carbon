const { visitComponentUrl } = require('../../support/helper');

describe('Performance testing', () => {
  // beforeEach(() => {
  //   visitComponentUrl(component, story, false);
  // });

  const componentJson = {
    component: 'Alert',
    story: 'default story',
  };

  it('collect and compare all Performance data', () => {
    visitComponentUrl(componentJson.component, componentJson.story, true);
    // compare data needs to be added
  });
});
