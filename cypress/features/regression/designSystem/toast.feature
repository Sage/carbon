Feature: Toast  component
  I want to test Toast component properties

  @positive
  Scenario: CloseIcon has the border outline
    Given I open "Toast" component page "dismissible"
      And I click on "button-toast-dismissible" Toggle Preview
    When closeIcon is focused
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive
  Scenario: Confirm that when isCenter property is false Toast is left aligned
    Given I open "Toast" component page "left aligned"
    When I click on "button-left-aligned" Toggle Preview
    Then Toast is not centred

  @positive
  Scenario: Confirm that Toast is centered by default
    Given I open "Toast" component page "default story"
    When I click on "button-default" Toggle Preview
    Then Toast is centred