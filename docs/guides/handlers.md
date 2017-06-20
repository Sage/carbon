# Handlers

Carbon provides a handler pattern which can be used for optional content as well as for providing extension points within an application.

Let's run through an example to demonstrate its usefulness as well as how it works.

Imagine we are given a component which provides the header and footer of our application:

```js
// ./app.js

import React from 'react';

class App extends React.Component {
  // define the default footer links
  get footerLinks() {
    return [
      <a key="1">link 1</a>,
      <a key="2">link 2</a>,
      <a key="3">link 3</a>
    ];
  }

  // function to render the footer menu
  get renderFooterLinks() {
    return this.footerLinks.map((link, index) => {
      return <li key={ index }>{ link }</li>;
    });
  }

  // renders the header and footer, and any children we pass to it
  render() {
    return (
      <div>
        <div className="header">
          My App!
        </div>

        { this.props.children }

        <div className="footer">
          <ul>
            { this.renderFooterLinks }
          </ul>
        </div>
      </div>
    );
  };
}

export default App;
```

We could render the application like this:

```js
// ./main.js

import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon-react/lib/utils/router';
import App from './app';
import MyView from './views/dummy';

// render the routes using the App to render the header/footer, then render our
// views as child components
let routes = (
  <Route component={ App }>
    <Route path="/" component={ MyView } />
  </Route>
);

startRouter(routes);
```

This will setup a basic app using the `App` component for the header and footer. However, what if we want to modify the footer links?

Let's create a handler registry for the footer links:

```js
// ./footer-links-registry.js

import BaseRegistry from 'carbon-react/lib/utils/handlers/base-registry';

class FooterLinksRegistry extends BaseRegistry {
}

export default new FooterLinksRegistry;
```

We have extended our registry from the base registry, and then exported it ensuring that it has been initialized.

Now let's update the `App` component to use this registry:

```js
// ./app.js

import React from 'react';
// we import the new registry
import FooterLinksRegistry from './footer-links-registry';

class App extends React.Component {
  get footerLinks() {
    return [
      <a key="1">link 1</a>,
      <a key="2">link 2</a>,
      <a key="3">link 3</a>
    ];
  }

  // as well as importing the new registry, this function is the only thing we
  // have modified, we obtain any relevant handlers, and call them with the default links
  get renderFooterLinks() {
    let links = this.footerLinks;

    FooterLinksRegistry.obtain().forEach((registry) => {
      links = registry.call(links)
    });

    return links.map((link, index) => {
      return <li key={ index }>{ link }</li>;
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          My App!
        </div>

        { this.props.children }

        <div className="footer">
          <ul>
            { this.renderFooterLinks }
          </ul>
        </div>
      </div>
    );
  };
}

export default App;
```

So far, the app should still work. There are no registered handlers, but by default it should just return the original param passed to the `call` method. However, the app is now setup with an extension point for the footer links, allowing developers to customise the menu as needed.

Let's now create a handler and register it to our `FooterLinksRegistry`:

```js
// ./footer-links-handler.js

import React from 'react';
import FooterLinksRegistry from './footer-links-registry';

class FooterLinksHandler {
  // The 'check' method is what determines whether to use this handler. We could pass
  // additional params to this through 'obtain' and perform more complex checks.
  // This is most useful when we have multiple handlers registered on the same
  // registry, but in this example we only have one so will always return 'true'.
  check = () => {
    return true;
  }

  // The `call` method returns the custom data. In this case we are modifying the
  // default footer links and returning our own set.
  call = (links) => {
    // insert new link after the first link
    links.splice(1, 0, <a key="custom1">first custom link!</a>)
    // add another link to the end of the array
    links.push(<a key="custom2">second custom link!</a>)

    return links;
  }
}

// export our handler by initializing it and registering it with the appropriate
// registry (in this case, the FooterLinksRegistry)
export default FooterLinksRegistry.register("myFooterLinks", new FooterLinksHandler);
```

The app should *still* work, however the links will not have been updated. This is because although we have created our custom handler, we have not imported it into our app. So let's update our routes file to import it:

```js
// ./main.js

import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon-react/lib/utils/router';
import App from './app';
import MyView from './my-view';

// import our handler
import FooterLinksHandler from './footer-links-handler';

let routes = (
  <Route component={ App }>
    <Route path="/" component={ MyView } />
  </Route>
);

startRouter(routes);
```

Simply by importing it, it should register and enable our handler, updating the links in the footer.

The way in which this works means that we could have many handlers, and many different configurations of the same application - configured depending on which handlers the developers choose to import and/or register.
