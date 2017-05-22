import Definitions from './definitions';
import Colors from './views/pages/style/colors';
import Icons from './views/pages/style/icons';
import Component from './views/pages/component';
import SiteMapHelper from './utils/site-map-helper';

const guidesPath = '/docs/guides';
const tutorialsPath = '/docs/tutorials';

// Available options per route:
//  * component (will render that component for the route)
//  * items (a hash of sub-routes)
//  * filter (will enable a filter over the route's sub-routes)
export default new SiteMapHelper({
  "/getting-started": {
    items: {
      "setting-up-your-environment": `${guidesPath}/setting-up-your-environment.md`,
      "hello-world":                 `${guidesPath}/getting-started.md`,
      "a-basic-example-of-flux":     `${guidesPath}/a-basic-example.md`
    }
  },
  "/components/:name": {
    component: Component,
    items:     Object.keys(Definitions),
    filter:    true
  },
  "/style": {
    items: {
      colors: {
        component: Colors
      },
      icons: {
        component: Icons
      }
    }
  },
  "/guides": {
    items: {
      "flux":                   `${guidesPath}/flux.md`,
      "immutable":              `${guidesPath}/immutable.md`,
      "validations":            `${guidesPath}/validations.md`,
      "assets":                 `${guidesPath}/assets.md`,
      "decorators":             `${guidesPath}/decorators.md`,
      "handlers":               `${guidesPath}/handlers.md`,
      "retrieving-data":        `${guidesPath}/retrieving-data.md`,
      "integrating-other-code": `${guidesPath}/integrating-with-other-ui.md`,
    }
  },
  "/tutorials": {
    items: {
      "rails-part-1:-hello-world":      `${tutorialsPath}/carbon-rails/hello-world.md`,
      "rails-part-2:-introducing-data": `${tutorialsPath}/carbon-rails/introducing-data.md`,
      "rails-part-2:-updating-data":    `${tutorialsPath}/carbon-rails/updating-data.md`
    }
  },
});
