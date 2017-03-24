# Getting Started

This guide goes step by step to getting a project running.

__Warning:__ The CLI is currently only supported on OSX, though we plan to add support for Windows and Linux soon. For the steps that ask to use the CLI we will provide alternatives.

* Go to a directory where you keep your projects:

```bash
cd ~/development
```

* Use the CLI to scaffold a Carbon/React/Flux project (or [download a zip](https://github.com/Sage/carbon-factory/raw/master/docs/carbon-app.zip)):

```bash
carbon app sampleapp
```

* Go into your new project:

```bash
cd sampleapp
```

* Install the project's modules:

```bash
npm install
```

* Run Gulp to recompile assets when file changes are made. When finished it will display a message of `assets are compiled!` - it will then continue to run and listen for any file changes, triggering a recompile when a file updates.

```bash
gulp
```

* Open a new terminal window, and return to the same directory:

```bash
cd ~/development/sampleapp
```

* Use the CLI to create a new component (or create the new file manually in `src/components/foobar/foobar.js`):

```bash
carbon component foobar
```

This will generate two files in `src/components/foobar`:

```js
// src/components/foobar/foobar.js

import React from 'react';

class Foobar extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div></div>
    );
  }

}

export default Foobar;
```

```js
// src/components/foobar/package.json

{
  "main": "./foobar.js",
  "name": "Foobar"
}
```

* Edit the `src/components/foobar/foobar.js` file for your new component to add some content to the `render` function:

```js
render() {
  return (
    <div>Foobar!</div>
  );
}
```

* Edit the `src/main.js` file in your project to import your new component and attach it to your route:

```js
import Foobar from 'components/foobar';

var routes = (
  <Route path="/" component={ Foobar } />
);
```

* In the console, start a web server from the root of your project:

```bash
python -m SimpleHTTPServer
```

* Open http://localhost:8000 in your web browser to view your application.

* Your application is now setup, why not try setting up an application using Flux following our basic example?
