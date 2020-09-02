Feature: Toast Design System component
  I want to test Design System Toast component properties

  Background: Open Design System Toast component default page
    Given I open Design Systems default_story "Toast" component docs page

  @positive
  Scenario: Verify a stacked Toast component
    When I click on "button-stacked" Toggle Preview
    Then Toast component is stacked

  @positive
  Scenario: Verify a stacked delayed Toast component
    When I click on "button-stacked" Toggle Preview
    Then Toast component is stacked

  @positive
  Scenario: CloseIcon has the border outline
    Given I click on "button-toast-dismissible" Toggle Preview
    When closeIcon is focused
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px" in IFrame

  @positive
  Scenario Outline: Change Toast variant to <variant>
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
    When I click on "button-toast-dismissible" Toggle Preview
    Then closeIcon is focused

  @positive
  Scenario: Confirm that default Toast has no close icon
    When I click on "button-default" Toggle Preview
    Then Toast component has no close icon

  @positive
  Scenario: Confirm that isCenter property centers Toast
    When I click on "button-variant-centered" Toggle Preview
    Then Toast is centred

  @positive
  Scenario: Confirm that Toast is not centered by default
    When I click on "button-default" Toggle Preview
    Then Toast is not centred
