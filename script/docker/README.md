# Docker

NB: All commands should be run from the top level directory of the repository.

## Build Image

```
./script/docker/setup.sh
```

## Start Docker Compose

```
./script/docker/start.sh
```

## Run Cypress Tests

### Help switch

```
./script/docker/cypress.sh --help
```

```
Options:
 --build                        Runs the build tests
 --accessibility                Runs the accessibility tests
 --regression                   Runs all regression tests
 --common                       Runs the regression common tests
 --experimental                 Runs the regression experimental tests
 --deprecated                   Runs the regression deprecated tests
 --validation                   Runs the regression validation tests
 --themes                       Runs the regression themes tests
 --test                         Runs the regression test directory tests
 --allure-report                Generates allure-report for cypress tests
```

### Example command

Run both build and accessibility suites:

```
./script/docker/cypress.sh --build --accessibility
```