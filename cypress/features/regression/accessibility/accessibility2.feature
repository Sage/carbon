Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: <component> should not have any violation in generated story
    Given I generate "<component>" component with all stories and check A11y
    Examples:
      | component                          |
      | pages                              |
      | pill                               |
      | pod                                |
      | popover-container                  |
      | portrait                           |
      | preview                            |
      | profile                            |
      | radiobutton                        |
      | row                                |
      | search                             |
      | select-filterable                  |
      | select-multiselect                 |
      | select-sizes                       |
      | select                             |
      | setting-row                        |
      | showeditpod                        |
      | sidebar                            |
      | simple-color-picker                |
      | split-button                       |
      | step-sequence                      |
      | switch                             |
      | tabs                               |
      | text-editor                        |
      | textarea                           |
      | textbox                            |
      | tile-select                        |
      | tile                               |
      | toast                              |
      | tooltip                            |
      | verticaldivider                    |