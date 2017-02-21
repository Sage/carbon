import Definitions from './definitions';
import Colors from './views/pages/style/colors';
import Icons from './views/pages/style/icons';
import Component from './views/pages/component';
import SiteMapHelper from './utils/site-map-helper';

// Available options per route:
//  * component (will render that component for the route)
//  * items (a hash of sub-routes)
//  * filter (will enable a filter over the route's sub-routes)
export default new SiteMapHelper({
  "/getting-started": {
    items: {
      "setting-up-your-environment": "https://github.com/Sage/carbon/blob/master/docs/guides/setting-up-your-environment.md",
      "getting-started": "https://github.com/Sage/carbon/blob/master/docs/guides/getting-started.md",
      "a-basic-example-of-flux": "https://github.com/Sage/carbon/blob/master/docs/guides/flux.md"
    }
  },
  "/components/:name": {
    component: Component,
    items: Object.keys(Definitions),
    filter: true
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
      "flux": "https://github.com/Sage/carbon/blob/master/docs/guides/flux.md",
      "immutable": "https://github.com/Sage/carbon/blob/master/docs/guides/immutable.md",
      "validations": "https://github.com/Sage/carbon/blob/master/docs/guides/validations.md",
      "assets": "https://github.com/Sage/carbon/blob/master/docs/guides/assets.md",
      "decorators": "https://github.com/Sage/carbon/blob/master/docs/guides/decorators.md",
      "handlers": "https://github.com/Sage/carbon/blob/master/docs/guides/handlers.md",
      "retrieving-data": "https://github.com/Sage/carbon/blob/master/docs/guides/retrieving-data.md",
      "integrating-other-code": "https://github.com/Sage/carbon/blob/master/docs/guides/integrating-with-other-ui.md",
    }
  },
  "/tutorials": {
    items: {
      "rails-part-1:-hello-world": "https://github.com/Sage/carbon/blob/master/docs/tutorials/carbon-rails/hello-world.md",
      "rails-part-2:-introducing-data": "https://github.com/Sage/carbon/blob/master/docs/tutorials/carbon-rails/introducing-data.md",
      "rails-part-2:-updating-data": "https://github.com/Sage/carbon/blob/master/docs/tutorials/carbon-rails/updating-data.md"
    }
  },
});
