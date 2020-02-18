Feature: Create component classic page
  I want to change Create component properties for classic page

  Background: Open Create component page classic
    Given I open "Create" component page classic

  @positive
  Scenario: Verify inner content and colors of Create component
    # commented because of BDD default scenario Given - When - Then
    # When I open "Create" component page
    Then Create component has proper inner color "rgb(37, 91, 199)" and background-color "rgba(0, 0, 0, 0)" and border color "rgb(153, 173, 182)"

  @positive
  Scenario: Verify inner content and colors of Create component on hover state
    Given I click outside of the component
    When I hit Tab key 1 time
    Then Create component has proper inner color "rgb(37, 91, 199)" and background-color "rgb(255, 255, 255)" and border color "rgb(153, 173, 182)"
      And Create element has blue border on focus