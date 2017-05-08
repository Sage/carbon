import generateRoutes from './generate-routes';
import generateMenu from './generate-menu';

class SiteMapHelper {
  constructor(config) {
    this.config = config;
  }

  generateRoutes = () => {
    return generateRoutes(this.config);
  }

  generateMenu = () => {
    return generateMenu();
  }
}

export default SiteMapHelper;
