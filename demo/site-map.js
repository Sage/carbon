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
      "setting-up-your-environment": "/docs/guides/setting-up-your-environment.md",
      "hello-world": "/docs/guides/getting-started.md",
      "a-basic-example-of-flux": "/docs/guides/a-basic-example.md"
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
      "flux": "/docs/guides/flux.md",
      "immutable": "/docs/guides/immutable.md",
      "validations": "/docs/guides/validations.md",
      "assets": "/docs/guides/assets.md",
      "decorators": "/docs/guides/decorators.md",
      "handlers": "/docs/guides/handlers.md",
      "retrieving-data": "/docs/guides/retrieving-data.md",
      "integrating-other-code": "/docs/guides/integrating-with-other-ui.md",
    }
  },
  "/tutorials": {
    items: {
      "rails-part-1:-hello-world": "/docs/tutorials/carbon-rails/hello-world.md",
      "rails-part-2:-introducing-data": "/docs/tutorials/carbon-rails/introducing-data.md",
      "rails-part-2:-updating-data": "/docs/tutorials/carbon-rails/updating-data.md"
    }
  },
});
