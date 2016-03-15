## Getting Started

This guide goes step by step to getting a project running.

* Go to a directory where you keep your projects:

```
cd ~/development
```

* Use the CLI to scaffold a Carbon/React/Flux project (this will also install all dependencies for your project):

```
carbon app sampleapp
```

* Go into your new project:

```
cd sampleapp
```

* Install the project's modules:

```
npm install
```

* Run Gulp to recompile assets when file changes are made. When finished it will display a message of `assets are compiled!` - it will then continue to run and listen for any file changes, triggering a recompile when a file updates.

```
gulp
```

* Open a new terminal window, and return to the same directory:

```
cd ~/development/sampleapp
```

* Create a new component:

```
carbon component foobar
```

* Edit the `src/components/foobar/foobar.js` file for your new component to add some content to the `render` function:

```
render() {
  return (
    <div>Foobar!</div>
  );
}
```

* Edit the `src/main.js` file in your project to import your new component and attach it to your route:

```
import Foobar from 'components/foobar';

var routes = (
  <Route path="/" component={ Foobar } />
);
```

* In the console, start a web server from the root of your project:

```
python -m SimpleHTTPServer
```

* Open http://localhost:8000 in your web browser to view your application.

* Your application is now setup, why not try setting up an application using Flux following our [basic example](https://github.com/Sage/carbon/blob/master/docs/guides/a-basic-example.md)?
