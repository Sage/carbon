Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: <component> should not have any violation in generated story
    Given I generate "<component>" component with all stories and check A11y
    Examples:
      | component                          |
      | fieldset-address-fieldset-examples |
      | fieldset                           |
      | flat-table-expandable              |
      | flat-table-color-themes            |
      | flat-table                         |
      | form                               |
      | grid                               |
      | groupedcharacter                   |
      | heading                            |
      | help                               |
      | hr                                 |
      | icon-button                        |
      | icon                               |
      | image                              |
      | inline-inputs                      |
      | link-preview                       |
      | link                               |
      | loader-bar                         |
      | loader                             |
      | menu                               |
      | message                            |
      | mount-in-app                       |
      | multi-action-button                |
      | test-multi-step-wizard             |
      | navigation-bar                     |
      | note                               |
      | number-input                       |
      | numeral-date                       |
      | pager                              |