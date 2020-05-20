
const applitoolsSettings = {
  appName: 'Carbon Sage',
  // Strict, Exact, Layout and Content - https://help.applitools.com/hc/en-us/articles/360007188591-Match-Levels
  matchLevel: 'Strict',
  envName: 'Development',
  saveNewTests: true,
  concurrency: 10,
  browser: [
    { width: 2560, height: 1440, name: 'chrome' },
    { width: 2560, height: 1440, name: 'firefox' },
    { width: 2560, height: 1440, name: 'safari' }
  ]
};
export default applitoolsSettings;
