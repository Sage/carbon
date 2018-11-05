import Definitions from './definitions';
import PatternDefinitions from './pattern-definitions';
import Colors from './views/pages/style/colors';
import Icons from './views/pages/style/icons';
import Component from './views/pages/component';
import SiteMapHelper from './utils/site-map-helper';

const newsPath = '/docs/news';
const guidesPath = '/docs/guides';
const tutorialsPath = '/docs/tutorials';

// Available options per route:
//  * component (will render that component for the route)
//  * items (a hash of sub-routes)
//  * filter (will enable a filter over the route's sub-routes)
export default new SiteMapHelper({
  '/news': {
    items: {
      'sage-design-system': `${newsPath}/sage-design-system.md`
    }
  },
  '/getting-started': {
    items: {
      'setting-up-your-environment': `${guidesPath}/setting-up-your-environment.md`,
      'hello-world': `${guidesPath}/getting-started.md`
    }
  },
  '/components/:name': {
    component: Component,
    items: Object.keys(Definitions),
    filter: true
  },
  '/patterns/:name': {
    component: Component,
    items: Object.keys(PatternDefinitions)
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
      flux: `${guidesPath}/flux.md`,
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
