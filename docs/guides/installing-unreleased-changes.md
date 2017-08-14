# Installing Unreleased Changes

How to install local Carbon into your application

**NB we've recently changed `carbon` to `carbon-react` for open sourcing it on NPM, we recommend you double check paths, such as those used to point at local versions in package.json**

1. Pull down the Carbon repository locally.
2. Checkout the appropriate branch which contains the changes you want to install.
3. Run `npm run-script prepublish` - This will compile the code from ES6/ES7 into ES5 for the browser to process.
4. Within your local application that uses Carbon. Change the package.json file so that carbon points to a relative path `./../carbon`.
5. Run `npm install carbon-react` or `npm install` to install the local version of the application.

Note: Optionally you can just run `npm install ./../carbon` within your application to install the changes locally however running `npm install` or `npm install carbon-react` afterwards will override these changes.
