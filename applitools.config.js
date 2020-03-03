
module.exports = {
  appName: 'Carbon Sage',
  matchLevel: 'Strict', // Strict, Exact, Layout and Content - https://help.applitools.com/hc/en-us/articles/360007188591-Match-Levels
  envName: 'Development',
  testName: cy.state('ctx').test.title, // Assign the current test name to Applitools test name
  batchName: cy.state('ctx').test.parent.title, // Assign the feature name to Applitools batch name
  browser: [{width: 1024, height: 768, name: 'chrome'}]
}