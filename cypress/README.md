# Getting Started with Cypress

## Contents

[Installation](#installation)

[Running Tests](#running-tests)

[Continuous Integration (CI)](#continuous-integration)

- [Start Storybook](#start-storybook)
- [GitHub Actions](#github-actions)

## Installation

We use the [Cypress.io](https://www.cypress.io) testing framework for functional and regression testing. Cypress is already installed in the Carbon project. Clone and install the carbon repository to apply the installation:

1. Clone the carbon repository `git clone git@github.com:Sage/carbon.git`.
2. Install with `npm install`.

## Running Tests

Storybook must be running before Cypress tests can be run:

1. Run Storybook `npm start`.
2. Open a new terminal in the root path of the project.
3. Run Cypress using the runner with `npx cypress open` or `npm run test-cypress`, then select the required feature file. Test results can be seen directly in the Cypress Test Runner UI.
4. To run specific Cypress tests at the command line (headless browser for continuous integration) use: `npx cypress run --spec 'cypress/features/[tests-type]/[featureFileName].feature'`. Test results can be seen in the console run summary.
5. To run in the Chrome/Firefox browser add `--browser chrome` or `--browser firefox` to the above command.

## Continuous Integration (CI)

Every commit/pull request in the repository initiates a Cypress test run using GitHub Actions.

### Build Storybook (only accessibility tests)

Storybook must be built and running before cypress can run.

1. Run `npm run build-storybook` to build the static-storybook folder.
2. Run `npx sb extract` to generate the `stories.js` file.

### Start Storybook

Storybook must be running before cypress can run.

1. `npm start` - runs Storybook.
2. `wait-on http://localhost:9001` - waits until Storybook is up and running and is ready to run tests.

### GitHub Actions
1. `cypress.yml`
- `npx cypress run --browser chrome --parallel -–record --spec './cypress/features/regression/**/*.feature'` - runs the complete test suite (except `accessibility`).
- `npx cypress run --browser chrome --parallel -–record --spec './cypress/accessibility/*.test.js'` - runs the `accessibility` test suite only.

The build result can be seen in GitHub in the pull request/branch and the detailed results can be seen in the [Cypress.io dashboard](https://dashboard.cypress.io/projects/8458bb/runs) or in GitHub Actions, both linked from the pull request/branch checks.

NOTE: If the tests failed for a reason such as if there is an issue with GitHub or the Cypress dashboard and we need to re-run the run exactly as it was, select `Cancel workflow` in the `Actions` tab and then select `Re-run jobs` -> `Re-run all jobs` from the `Checks` tab.

## Debugging Cypress

Sometimes it is necessary to run cypress locally on a specific version of chrome to verify that a bug is fixed. This is difficult to do on your host system but it is possible using docker.

### Pre-requisites

Before starting please ensure you have the latest version of [docker](https://docs.docker.com/get-docker/) installed.

You will need to be able to access storybook, either from https://carbon.sage.com or from your local machine.
If you are using your local machine, please run `npm ci`. Once complete you can use `npm start` or if you have limited RAM
you can use `npm run build-storybook && npm run start:static` which will build the storybook and serve it without starting the storybook development server.

### Replicating GitHub Actions

Before you start, ensure the `container` in `docker-compose.yml` matches the version in `cypress-pr.yml`.

NB: docker commands should be run from the `cypress` directory.

The docker container that we use does not have cypress pre installed, we use the version defined in `package.json`. To install cypress in the docker container we can use
`docker-compose --profile install up` this approach means we don't need to install all of our dependencies. You should see output like this

```
$ docker-compose --profile install up

install_1  | [14:33:51]  Unzipping Cypress        72% 3s [title changed]
install_1  | [14:33:51]  Unzipping Cypress        73% 3s [title changed]
install_1  | [14:33:51]  Unzipping Cypress        74% 2s [title changed]
install_1  | [14:33:51]  Unzipping Cypress        75% 2s [title changed]
install_1  | [14:33:51]  Unzipping Cypress        76% 2s [title changed]
install_1  | [14:33:51]  Unzipping Cypress        77% 2s [title changed]
install_1  | [14:33:53]  Unzipping Cypress        100% 0s [title changed]
install_1  | [14:33:53]  Unzipped Cypress        [title changed]
install_1  | [14:33:53]  Unzipped Cypress        [completed]
install_1  | [14:33:53]  Finishing Installation  [started]
install_1  | [14:33:53]  Finished Installation   /root/.cache/Cypress/7.4.0 [title changed]
install_1  | [14:33:53]  Finished Installation   /root/.cache/Cypress/7.4.0 [completed]
cypress_install_1 exited with code 0
```

#### Cypress open

If you want to use the Cypress GUI you will need to [configure an X11 server](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/).
For Mac, you should install and configure [XQuartz](https://www.xquartz.org/). Once installed, you will need to restart your system. Once restarted you need to allow local connections. You can do this by running the command `xhost +127.0.0.1`

```
$ xhost +127.0.0.1

127.0.0.1 being added to access control list
```

Now you can launch the Cypress GUI using the command `docker-compose --profile open up`.

```
$ docker-compose --profile open up

WARNING: The CYPRESS_RECORD_KEY variable is not set. Defaulting to a blank string.
WARNING: The BUILD_ID variable is not set. Defaulting to a blank string.
Docker Compose is now in the Docker CLI, try `docker compose up`

Starting cypress_open_1 ... done
Attaching to cypress_open_1
open_1     | [19:0527/151354.252530:ERROR:bus.cc(393)] Failed to connect to the bus: Failed to connect to socket /var/run/dbus/system_bus_socket: No such file or directory
open_1     | [171:0527/151354.295317:ERROR:vaapi_wrapper.cc(566)] Could not get a valid VA display
open_1     | [19:0527/151355.771556:ERROR:bus.cc(393)] Failed to connect to the bus: Address does not contain a colon
open_1     | [19:0527/151355.819802:ERROR:bus.cc(393)] Failed to connect to the bus: Address does not contain a colon
```

> NB: `docker compose` doesn't accept `--profile` yet so please ignore the warning.

You should see the Cypress GUI, starting the run will launch the browser and you can interact with it as if it were installed on your host machine.

#### Cypress run

You can run cypress headlessly and take advantage of parallelisation using the [Cypress dashboard](https://dashboard.cypress.io/).

The `docker-compose.yml` file is configured to run 3 containers simultaniously. You can adjust this by changing the `docker-compose.yml`.
You can also change the `command` to focus the test on a specific suite e.g. ` --spec cypress/features/regression/splitButton.feature`.

If you are using `parallel` you need to use the Cypress dashboard for orchestration which requires a `CYPRESS_RECORD_KEY`. An admin should generate a new key for you and revoke it once you no longer need it. You also need to provide a `BUILD_ID`.

The docker command is `docker-compose --profile run up`.

```
$ CYPRESS_RECORD_KEY=FAKE-FAKE-FAKE-FAKE-FAKE BUILD_ID=$(uuidgen) docker-compose --profile run up
Docker Compose is now in the Docker CLI, try `docker compose up`

Creating cypress_run_1 ... done
Creating cypress_run_2 ... done
Creating cypress_run_3 ... done
Attaching to cypress_run_2, cypress_run_1, cypress_run_3
```

### Running a custom image

You can create your own docker images that specify an exact browser version, once built you can update the `image` in the `docker-compose.yml` to use it.

Go to https://chromium.cypress.io/ and find a version of Chrome for linux, e.g. `91.0.4472.77`.

Download the `build.sh` and the `Dockerfile` from a recent version of [`cypress/browsers`](https://github.com/cypress-io/cypress-docker-images/tree/master/browsers).

You need to update the `LOCAL_NAME` in the [`build.sh`](https://github.com/cypress-io/cypress-docker-images/blob/f5b9c9e5e2e3b9b3abc73ff6aee1af3ba2806ec1/browsers/node14.16.0-chrome90-ff88/build.sh).

```diff
# build.sh
set e+x

- LOCAL_NAME=cypress/browsers:node14.16.0-chrome90-ff88
+ LOCAL_NAME=cypress/browsers:node14.16.0-chrome91.0.4472.77-ff88
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
```

You will need to update the `CHROME_VERSION` environment variable in the [`Dockerfile`](https://github.com/cypress-io/cypress-docker-images/blob/f5b9c9e5e2e3b9b3abc73ff6aee1af3ba2806ec1/browsers/node14.16.0-chrome90-ff88/Dockerfile).

```diff
FROM cypress/base:14.16.0

USER root

RUN node --version

# Chrome dependencies
RUN apt-get update
RUN apt-get install -y fonts-liberation libappindicator3-1 xdg-utils

# install Chrome browser
- ENV CHROME_VERSION 90.0.4430.212
+ ENV CHROME_VERSION 91.0.4472.77
RUN wget -O /usr/src/google-chrome-stable_current_amd64.deb "http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}-1_amd64.deb" && \
  dpkg -i /usr/src/google-chrome-stable_current_amd64.deb ; \
  apt-get install -f -y && \
  rm -f /usr/src/google-chrome-stable_current_amd64.deb
RUN google-chrome --version

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

# Add zip utility - it comes in very handy
RUN apt-get update && apt-get install -y zip

# add codecs needed for video playback in firefox
# https://github.com/cypress-io/cypress-docker-images/issues/150
RUN apt-get install mplayer -y

# install Firefox browser
ARG FIREFOX_VERSION=88.0.1
RUN wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/$FIREFOX_VERSION/linux-x86_64/en-US/firefox-$FIREFOX_VERSION.tar.bz2 \
  && tar -C /opt -xjf /tmp/firefox.tar.bz2 \
  && rm /tmp/firefox.tar.bz2 \
  && ln -fs /opt/firefox/firefox /usr/bin/firefox

# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "Chrome version:  $(google-chrome --version) \n" \
  "Firefox version: $(firefox --version) \n" \
  "git version:     $(git --version) \n" \
  "whoami:          $(whoami) \n"

# a few environment variables to make NPM installs easier
# good colors for most applications
ENV TERM xterm
# avoid million NPM install messages
ENV npm_config_loglevel warn
# allow installing when the main user is root
ENV npm_config_unsafe_perm true
```

Build it by running `build.sh`.

```
$ chmod +x build.sh
$ ./build.sh

Building cypress/browsers:node14.16.0-chrome91.0.4472.77-ff88
[+] Building 53.7s (15/15) FINISHED
 => [internal] load build definition from Dockerfile                                                                                                                                       0.0s
 => => transferring dockerfile: 2.07kB                                                                                                                                                     0.0s
 => [internal] load .dockerignore                                                                                                                                                          0.0s
 => => transferring context: 2B                                                                                                                                                            0.0s
 => [internal] load metadata for docker.io/cypress/base:14.16.0                                                                                                                            1.8s
 => [auth] cypress/base:pull token for registry-1.docker.io                                                                                                                                0.0s
 => [ 1/10] FROM docker.io/cypress/base:14.16.0@sha256:5a248444b630e727508570ae5e68d64c6e1f3c28087fbb2063726e790ca59dfa                                                                    0.0s
 => CACHED [ 2/10] RUN node --version                                                                                                                                                      0.0s
 => CACHED [ 3/10] RUN apt-get update                                                                                                                                                      0.0s
 => CACHED [ 4/10] RUN apt-get install -y fonts-liberation libappindicator3-1 xdg-utils                                                                                                    0.0s
 => [ 5/10] RUN wget -O /usr/src/google-chrome-stable_current_amd64.deb "http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_91.0.4472.77-1_amd6  16.5s
 => [ 6/10] RUN google-chrome --version                                                                                                                                                    0.5s
 => [ 7/10] RUN apt-get update && apt-get install -y zip                                                                                                                                   3.9s
 => [ 8/10] RUN apt-get install mplayer -y                                                                                                                                                12.8s
 => [ 9/10] RUN wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/88.0.1/linux-x86_64/en-US/firefox-88.0.1.tar.bz2   && tar -C /  16.2s
 => [10/10] RUN echo  " node version:    $(node -v) \n"   "npm version:     $(npm -v) \n"   "yarn version:    $(yarn -v) \n"   "debian version:  $(cat /etc/debian_version) \n"   "Chrome  0.8s
 => exporting to image                                                                                                                                                                     1.2s
 => => exporting layers                                                                                                                                                                    1.2s
 => => writing image sha256:ddcf7692d73099217abc7b8cd26739a529666d71e4218b65153b79cb348a8d25                                                                                               0.0s
 => => naming to docker.io/cypress/browsers:node14.16.0-chrome91.0.4472.77-ff88                                                                                                            0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
```

You can now update the `docker-compose.yml` file to use `cypress/browsers:node14.16.0-chrome91.0.4472.77-ff88`
