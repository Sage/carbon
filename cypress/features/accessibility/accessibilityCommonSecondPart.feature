Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> without activation button
    Given I open "<component>" component page
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component                        |
      | menulist                         |
      | menu                             |
      | message                          |
      | mount-in-app                     |
      | multi-action-button              |
      | navigation-bar                   |
      | pager                            |
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
      | toast                            |
      | tooltip                          |