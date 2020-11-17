Feature: Performance tests
  I want to check that all components have no performance regression

  @ignore
  @performance
  Scenario Outline: Component <component> default story
    When I open "<component>" component page "default story" in no iframe
    Then Collect performance data
    Examples:
      | component  |
      | AppWrapper |
      | Alert      |