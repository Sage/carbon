Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "<component>" component page in noIFrame
    Then "<component>" component has no accessibility violations
    Examples:
      | component                        |
      | menulist                         |
      | menu                             |
      | message                          |
      | mount-in-app                     |
      | multi-action-button              |
      | navigation-bar                   |
      | pill                             |
      | pod                              |
      | portrait                         |
      | preview                          |
      | profile                          |
      | rainbow                          |
      | row                              |
      | loader                           |
      | showeditpod                      |
      | settingsrow                      |
      | split-button                     |
      | step-sequence-item               |
      | step-sequence                    |
      | table-ajax                       |
      | table                            |
      | tabs                             |
      | tile                             |
      | tooltip                          |