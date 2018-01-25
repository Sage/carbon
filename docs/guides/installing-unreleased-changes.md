# Installing Unreleased Changes

How to install local Carbon into your application

1. Pull down the Carbon repository locally.
2. Checkout the appropriate branch which contains the changes you want to install.
3. Run `npm run precompile` - This will compile the code from ES6/ES7 into ES5 for the browser to process.
4. Run `npm install $(npm pack ./../../carbon/ | tail -1)` to install the local version of the application.

Note: Relative path to carbon may be different depending on where it's being installed from.
