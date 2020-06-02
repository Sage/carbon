# Carbon JavaScript Styleguide
## Follow these guidelines when contributing JavaScript to the Carbon repository

### Contents

[Introduction](#introduction)

[Airbnb's JavaScript Style Guide](#airbnbs-javascript-style-guide)

[Linting](#linting)

### Introduction
This JavaScript styleguide is provided to help you contribute to the Carbon repository in a way that other developers can understand quickly and easily. 

### Airbnb's JavaScript Style Guide
We have chosen to adhere to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), which covers everything from variable declarations, functions, and events to testing and performance tips. Our recommendation is to visit their [GitHub pages](https://github.com/airbnb/javascript) and familiarise yourself with their documentation first-hand.

### Linting
#### ESLint 
To detect errors and potential problems in our JavaScript we use ESLint. ESLint is designed to allow the creation of custom linting rules and Carbon's configuration extends the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and [ESLint-plugin-React](https://www.npmjs.com/package/eslint-plugin-react) with a few of our own custom configurations.

#### Rules
Our linting rules are defined in [.eslintrc](../.eslintrc) at the root of the project, these rules do change from time-to-time so please check this file and cross reference it against the [ESLint Rules](https://eslint.org/docs/rules/). You can run our linting rules against your code locally with:
```
npm run lint
```
