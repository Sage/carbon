#!/usr/bin/env bash
set -e

export COMPOSE_FILE=docker-compose-cypress.yml

HELP_TEXT="Options:\n\n
--build\t\t\tRuns the build tests\n
--accessibility\t\tRuns the accessibility tests\n
--visual\t\tRuns the visual tests\n
--regression\t\t\tRuns all regression tests\n
--common\t\t\tRuns the regression common tests\n
--experimental\t\t\tRuns the regression experimental tests\n
--deprecated\t\t\tRuns the regression deprecated tests\n
--validation\t\t\tRuns the regression validation tests\n
--themes\t\t\tRuns the regression themes tests\n
--test\t\t\t\tRuns the regression test directory tests\n
--allure-report\t\tGenerates allure-report for cypress tests\n
"

RUN_BUILD=false
RUN_ACCESSIBILITY=false
RUN_VISUAL=false
RUN_REGRESSION=false
RUN_REGRESSION_COMMON=false
RUN_REGRESSION_EXPERIMENTAL=false
RUN_REGRESSION_DEPRECATED=false
RUN_REGRESSION_VALIDATION=false
RUN_REGRESSION_THEMES=false
RUN_REGRESSION_TEST=false
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
        # run visual tests
        -v|--visual)
          RUN_VISUAL=true
          shift
          ;;
        # run regression tests
        # run all regression tests
        -r|--regression)
          RUN_REGRESSION=true
          shift
          ;;
        # run regression common tests
        -c|--common)
          RUN_REGRESSION_COMMON=true
          shift
          ;;
        # run regression experimental tests
        -e|--experimental)
          RUN_REGRESSION_EXPERIMENTAL=true
          shift
          ;;
        # run regression deprecated tests
        -d|--deprecated)
          RUN_REGRESSION_DEPRECATED=true
          shift
          ;;
        # run regression validation tests
        -v|--validation)
          RUN_REGRESSION_VALIDATION=true
          shift
          ;;
        # run regression themes tests
        -t|--themes)
          RUN_REGRESSION_THEMES=true
          shift
          ;;
        # run regression > test directory > tests
        -te|--test)
          RUN_REGRESSION_TEST=true
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

if $RUN_VISUAL; then
  echo 'Running visual tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run test-cypress-visual"
fi

if $RUN_REGRESSION; then
  echo 'Running all regression tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run test-cypress-regression; npm run generate-cypress-allure-report"
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

if $RUN_REGRESSION_TEST; then
  echo 'Running regression > test directory > tests'
  docker-compose exec -T cypress bash -c "wait-on http://storybook:9001 && npm run cypress-group-regression-test"
fi

if $RUN_ALLURE_REPORTS; then
  echo 'Running script to generate allure-report for cypress tests'
  docker-compose exec -T cypress bash -c "npm run generate-cypress-allure-report"
fi