Feature: Toast Design System component
  I want to test Design System Toast component properties

  @positive
  Scenario: CloseIcon has the border outline
    Given I open "Design System Toast" component page "dismissible" in no iframe
      And I click on "button-toast-dismissible" Toggle Preview
    When closeIcon is focused in no iframe
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

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