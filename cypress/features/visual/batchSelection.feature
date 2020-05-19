Feature: Batch selection component
  I want to check that all examples of Batch selection component render correctly

  @positive
  @applitools
  Scenario Outline: Check that Batch selection component <story> story rendered correctly
    When I open design systems <story> "Batch selection" component in no iframe
    Then Element displays correctly
    Examples:
      | story    |
      | basic    |
      | dark     |
      | white    |
      | disabled |
      | light    |

