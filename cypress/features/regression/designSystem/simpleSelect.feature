Feature: Design System Select component
  I want to change Design System Select component properties

  @positive
  Scenario Outline: Open Select list using <key>
    Given I open "Design System Select" component page "controlled" in no iframe
    When I click onto controlled select using "<key>" key
    Then "simple" Select list is opened
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Open Select list by mouse click on text input
    Given I open "Design System Select" component page "controlled" in no iframe
    When I click on Select input
    Then "simple" Select list is opened

  @positive
  Scenario: Close Select list using Tab keyboard
    Given I open "Design System Select" component page "controlled" in no iframe
      And I focus select input
    When I press Tab onto focused element
    Then "simple" Select list is closed

  @positive
  Scenario: Close Select list by clicking out of component
    Given I open "Design System Select" component page "controlled" in no iframe
      And I click on dropdown button
    When I click onto root in Test directory in no iFrame
    Then "simple" Select list is closed

  @positive
  Scenario: Choose option from Select list by mouse clicking
    Given I open "Design System Select" component page "controlled" in no iframe
      And I click on Select input
    When I select value "Amber"
    Then Design system Select input has "Amber" value
      And "simple" Select list is closed

  @positive
  Scenario Outline: Choose <selectedValue> option from Select list by typing <selectableValue> value in input
    Given I open "Design System Select" component page "controlled" in no iframe
      And I click on Select input
    When I type "<selectableValue>" into input
    Then Design system Select input has "<selectedValue>" value
      And "<position>" option on the list is highlighted
    Examples:
      | selectableValue | selectedValue | position |
      | Amb             | Amber         | first    |
      | Bla             | Black         | second   |

  @positive
  Scenario Outline: Open select list using arrow key
    Given I open "Design System Select" component page "controlled" in no iframe
      And I focus select input
    When I click onto controlled select using "<key>" key
    Then "simple" Select list is opened
    Examples:
      | key       | position | value  |
      | downarrow | first    | Amber  |
      | uparrow   | eleventh | Yellow |

  @positive
  Scenario: Lazy loading is visible after open the Simple Select
    Given I open "Design System Select" component page "with_is_loading_prop" in no iframe
    When I click on Select input with lazy loading in no iframe
    Then Lazy loading is visible

  @positive
  Scenario: Lazy loading is visible after open and scroll to the botton of the Simple Select
    Given I open "Design System Select" component page "with infinite scroll" in no iframe
      And I click on dropdown button
      And Lazy loading is visible
      And I wait 2500
    When I scroll to the "bottom" of Select List
    Then Lazy loading is visible
      And Select list "Lazy Loaded A1" option is visible

  @positive
  Scenario: Check that using an object as a value displays the correct options
    Given I open "Design System Select" component page "with object as value" in no iframe
    When I click on dropdown button
    Then visible options on Select list are "Amber", "Black", "Blue"

  @positive
  Scenario: Check that options can be selected and displayed correctly when using an object as a value
    Given I open "Design System Select" component page "with object as value" in no iframe
     And I click on dropdown button
    When I click on "first" option on Select list
    Then Select input has "Amber" value
