# Installing Unreleased Changes

How to install local Carbon into your application

1. Pull down the Carbon repository locally.
2. Checkout the appropriate branch which contains the changes you want to install.
3. Run `npm link` in the root of the Carbon directory.
4. Run `npm run watch` in the root of the Carbon directory.
5. Run `npm link carbon-react` in the root of the application you want to test local changes in.
6. When finished testing, run `npm unlink carbon-react` in the root of your application.

Note: You may need to add the relative path to your Carbon repo in the Parcelify options of your Webpack config, so it knows to process this directory as a Parcelify project.

You can find out more information on the [official npm documentation](https://docs.npmjs.com/cli/link).
