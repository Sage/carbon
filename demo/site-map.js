import Colors from './views/pages/style/colors';
import Icons from './views/pages/style/icons';
import SiteMapHelper from './utils/site-map-helper';

const guidesPath = '/docs/guides';
// Available options per route:
//  * component (will render that component for the route)
//  * items (a hash of sub-routes)
//  * filter (will enable a filter over the route's sub-routes)
export default new SiteMapHelper({
  '/getting-started': {
    items: {
      'setting-up-your-environment': `${guidesPath}/setting-up-your-environment.md`,
      'hello-world': `${guidesPath}/getting-started.md`
    }
  },
  '/style': {
    items: {
      colors: {
        component: Colors
      },
      icons: {
        component: Icons
      }
    }
  },
  '/guides': {
    items: {
      assets: `${guidesPath}/assets.md`,
      immutable: `${guidesPath}/immutable.md`,
      validations: `${guidesPath}/validations.md`,
      decorators: `${guidesPath}/decorators.md`,
      services: `${guidesPath}/services.md`,
      'integrating-other-code': `${guidesPath}/integrating-with-other-ui.md`,
      'testing-carbon-locally': `${guidesPath}/installing-unreleased-changes.md`,
      'releasing-carbon': `${guidesPath}/releasing.md`
    }
  }
});
