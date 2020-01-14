#!/usr/bin/env bash
set -e

export COMPOSE_FILE=docker-compose-cypress.yml

HELP_TEXT="Options:\n\n
--build\t\t\tRuns the build tests\n
--accessibility\t\tRuns the accessibility tests\n
--regression\t\t\tRuns the regression tests
--regression-common\t\t\tRuns the regression common tests
--regression-experimental\t\t\tRuns the regression experimental tests
--regression-deprecated\t\t\tRuns the regression deprecated tests
--regression-validation\t\t\tRuns the regression validation tests
--regression-themes\t\t\tRuns the regression themes tests
--allure-report\t\t\tGenerates allure-report for cypress tests
"

RUN_BUILD=false
RUN_ACCESSIBILITY=false
RUN_REGRESSION=false
RUN_REGRESSION_COMMON=false
RUN_REGRESSION_EXPERIMENTAL=false
RUN_REGRESSION_DEPRECATED=false
RUN_REGRESSION_VALIDATION=false
RUN_REGRESSION_THEMES=false
RUN_ALLURE_REPORTS=false

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
        # run regression common tests
        -rc|--regression-common)
          RUN_REGRESSION_COMMON=true
          shift
          ;;
       # run regression experimental tests
       -re|--regression-experimental)
          RUN_REGRESSION_EXPERIMENTAL=true
          shift
          ;;
       # run regression deprecated tests
        -rd|--regression-deprecated)
          RUN_REGRESSION_DEPRECATED=true
          shift
          ;;
       # run regression validation tests
        -rv|--regression-validation)
          RUN_REGRESSION_VALIDATION=true
          shift
          ;;
       # run regression themes tests
        -rt|--regression-themes)
          RUN_REGRESSION_THEMES=true
          shift
          ;;
       # run script to generate allure-report for cypress tests
        -ar|--allure-report)
          RUN_ALLURE_REPORTS=true
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

if $RUN_REGRESSION_COMMON; then
  echo 'Running regression common tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run cypress-group-regression-common"
fi

if $RUN_REGRESSION_EXPERIMENTAL; then
  echo 'Running regression experimental tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run cypress-group-regression-experimental"
fi

if $RUN_REGRESSION_DEPRECATED; then
  echo 'Running regression deprecated tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run cypress-group-regression-deprecated"
fi

if $RUN_REGRESSION_VALIDATION; then
  echo 'Running regression validation tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run cypress-group-regression-validations"
fi

if $RUN_REGRESSION_THEMES; then
  echo 'Running regression themes tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run cypress-group-regression-themes"
fi

if $RUN_ALLURE_REPORTS; then
  echo 'Running script to generate allure-report for cypress tests'
  docker-compose exec -T cypress bash -c "npm run generate-cypress-allure-report"
fi