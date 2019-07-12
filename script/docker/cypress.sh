#!/usr/bin/env bash
set -e

export COMPOSE_FILE=docker-compose-cypress.yml

HELP_TEXT="Options:\n\n
--build\t\t\tRuns the build tests\n
--accessibility\t\tRuns the accessibility tests\n
--regression\t\t\tRuns the regression tests
"

RUN_BUILD=false
RUN_ACCESSIBILITY=false
RUN_REGRESSION=false

while test $# -gt 0; do
    case "$1" in
        # shows help information
        -h|--help)
          echo -e $HELP_TEXT
          exit
          ;;
        # run build tests
        -b|--build)
          RUN_BUILD=true
          shift
          ;;
        # run accessibility tests
        -a|--accessibility)
          RUN_ACCESSIBILITY=true
          shift
          ;;
        # run regression tests
        -r|--regression)
          RUN_REGRESSION=true
          shift
          ;;
        *)
          break
          ;;
    esac
done

if $RUN_BUILD; then
  echo 'Running build tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run test-cypress-build"
fi

if $RUN_ACCESSIBILITY; then
  echo 'Running accessibility tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run test-cypress-accessibility"
fi

if $RUN_REGRESSION; then
  echo 'Running regression tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run test-cypress-regression"
fi
