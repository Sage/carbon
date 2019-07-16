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

 --build			      Runs the build tests
 --accessibility		Runs the accessibility tests
 --regression			  Runs the regression tests
```

### Example command

Run both build and accessibility suites:

```
./script/docker/cypress.sh --build --accessibility
```
