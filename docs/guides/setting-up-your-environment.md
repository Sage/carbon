# Setting Up Your Environment

## Preparing Your Environment

To use [React](http://facebook.github.io/react/) and [Carbon](https://github.com/sage/carbon) with your local environment, you will need the following installed:

* [Node.js](https://nodejs.org/)
* [Babel CLI](https://babeljs.io/)
* [Carbon CLI](https://github.com/sage/carbon-factory) (optional)

### Installing Node.js

If you are new to Node and npm, we have written a [short introduction](https://github.com/Sage/carbon/blob/master/docs/guides/an-introduction-to-node-and-npm.md).

Download and install Node from [https://nodejs.org/](https://nodejs.org/), or install and use [Node Version Manager](https://github.com/creationix/nvm).

*Note:* If you already have Node installed, make sure you're using the latest stable version - [you can download it here](https://nodejs.org)

#### Check npm version

Make sure you are on Version 6.x by running `npm -v`. To upgrade your version of npm run `npm install npm -g`

#### Check permissions

If you are getting permission issues when you install modules using npm, you may need to change the permission of your npm directory. Follow the instructions on [npm's website](https://docs.npmjs.com/getting-started/fixing-npm-permissions). You should not need to use `sudo` to install modules.

### Installing Babel CLI

You need to install Babel CLI globally.

* You should be able to use [Babel](https://babeljs.io/) using npm. Note: we currently support Babel edge (~> 6.0):

```bash
npm install -g babel-cli
```
