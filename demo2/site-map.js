import Definitions from './definitions';
import Colors from './views/pages/style/colors';
import Icons from './views/pages/style/icons';
import Component from './views/pages/component';
import Textbox from 'components/textbox';
import SiteMapHelper from './utils/site-map-helper';

// Available options per route:
//  * component (will render that component for the route)
//  * items (a hash of sub-routes)
//  * filter (will enable a filter over the route's sub-routes)
export default new SiteMapHelper({
  "/getting-started": {
    component: Textbox
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
  "/components/:name": {
    component: Component,
    items: Object.keys(Definitions),
    filter: true
  }
});
