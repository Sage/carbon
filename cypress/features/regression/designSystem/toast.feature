Feature: Toast Design System component
  I want to test Design System Toast component properties

  @positive
  Scenario: Verify a stacked Toast component
    Given I open "Design System Toast" component page "stacked" in no iframe
    When I click on "button-stacked" Toggle Preview
    Then Toast component is stacked

  @positive
  Scenario: Verify a stacked delayed Toast component
    Given I open "Design System Toast" component page "stacked" in no iframe
    When I click on "button-stacked" Toggle Preview
    Then Toast component is stacked

  @positive
  Scenario: CloseIcon has the border outline
    Given I open "Design System Toast" component page "dismissible" in no iframe
      And I click on "button-toast-dismissible" Toggle Preview
    When closeIcon is focused in no iframe
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive
  Scenario Outline: Change Toast variant to <variant>
    Given I open "Design System Toast" component page "variant <variant>" in no iframe
    When I click on "button-variant-<variant>" Toggle Preview
    Then Toast icon is set to "<icon>"
    Examples:
      | variant | icon     |
      | error   | error    |
      | success | tick     |
      | warning | warning  |
      | info    | info     |

  @positive
  Scenario Outline: Verify Toast <variant> color
    Given I open "Design System Toast" component page "variant <variant>" in no iframe
    When I click on "button-variant-<variant>" Toggle Preview
    Then Toast has background-color "<color>" and border "<color>" color
    Examples:
      | variant | color            |
      | error   | rgb(199, 56, 79) |
      | success | rgb(0, 176, 0)   |
      | warning | rgb(233, 100, 0) |
      | info    | rgb(0, 115, 194) |

  @positive
  Scenario: Test onDismiss on a Toast component
    Given I open "Design System Toast" component page "dismissible" in no iframe
    When I click on "button-toast-dismissible" Toggle Preview
    Then closeIcon is focused in no iframe

  @positive
  Scenario: Confirm that default Toast has no close icon
    Given I open "Design System Toast" component page "default story" in no iframe
    When I click on "button-default" Toggle Preview
    Then Toast component has no close icon

  @positive
  Scenario: Confirm that when isCenter property is false Toast is left aligned
    Given I open "Design System Toast" component page "left aligned" in no iframe
    When I click on "button-left-aligned" Toggle Preview
    Then Toast is not centred

  @positive
  Scenario: Confirm that Toast is centered by default
    Given I open "Design System Toast" component page "default story" in no iframe
    When I click on "button-default" Toggle Preview
    Then Toast is centred