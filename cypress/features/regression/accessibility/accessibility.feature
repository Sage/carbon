Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: <component> should not have any violation in generated story
    Given I generate "<component>" component with all stories and check A11y
    Examples:
      | component                          |
      | accordion                          |
      | action-popover                     |
      | advanced-color-picker              |
      | alert                              |
      | anchornavigation                   |
      | appwrapper                         |
      | badge                              |
      | batch-selection                    |
      | box                                |
      | button-bar                         |
      | button-toggle-group-validations    |
      | button-toggle-group                |
      | button-toggle                      |
      | button                             |
      | card                               |
      | carousel                           |
      | checkbox-validations               |
      | checkbox                           |
      | confirm                            |
      | content                            |
      | date-range                         |
      | date-input                         |
      | decimal-input                      |
      | definition-list                    |
      | detail                             |
      | dialog-full-screen                 |
      | dialog                             |
      | draggable                          |
      | drawer                             |
      | duellingpicklist                   |