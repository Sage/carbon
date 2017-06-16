# Installing Unreleased Changes

How to install local Carbon into your application

1. Pull down the Carbon repository locally.
2. Checkout the appropriate branch which contains the changes you want to install.
3. Run `npm run-script prepublish` - This will compile the code from ES6/ES7 into ES5 for the browser to process.
4. Within your local application that uses Carbon. Change the package.json file so that carbon points to a relative path `./../carbon`.
5. Run `npm install carbon` or `npm install` to install the local version of the application.

Note: Optionally you can just run `npm install ./../carbon` within your application to install the changes locally however running `npm install` or `npm install carbon` afterwards will override these changes.
