Feature: Split Button component classic page
  I want to change Split Button component properties

  Background: Open Split Button component page classic
    Given I open "Split Button" component page classic

  @positive
  Scenario Outline: Verify color palette for Split Button component without focus
    # commented because of BDD default scenario Given - When - Then
    # When I open "Split Button" component page
    Then Split Button first element has proper background-color "<color>" and border "<border-color>" color and has border-width 1 px
      And Split Button second element has proper background-color "<color>" and border "<border-color>" color and has border-width 1 px
    Examples:
      | color            | border-color     |
      | rgba(0, 0, 0, 0) | rgb(37, 91, 199) |

  @ignore
  # there is no possibility to trigger mouseover on first element
  Scenario Outline: Verify color palette for first element of Split Button component with focus
    When I hover mouse onto split button
    Then Split Button first element has proper background-color "<color>" and border "<color>" color and has border-width 1 px
    Examples:
      | color            |
      | rgb(30, 73, 159) |

  @positive
  Scenario Outline: Verify color palette for second element of Split Button component with focus
    When I hover mouse onto icon
    Then Split Button second element has proper background-color "<color>" and border "<color>" color and has border-width 1 px
      And Split Button additional buttons have proper background-color "<color>" and border "<color>" color and has border-width 1 px
    Examples:
      | color            |
      | rgb(30, 73, 159) |

  @positive
  Scenario: Verify the click function for a first element of Split Button component
    Given clear all actions in Actions Tab
    When I click "first" element of Split Button component
    Then click action was called in Actions Tab

  @positive
  Scenario Outline: Verify the click function for a <element> element of Split Button component
    Given clear all actions in Actions Tab
      And I hover mouse onto icon
    When I click "<element>" element of Split Button component
    Then click action was called in Actions Tab
    Examples:
      | element |
      | third   |
      | fourth  |
      | fifth   |

  @positive
  Scenario Outline: Verify hover color and blue border for <element> element of Split Button component
    Given I hover mouse onto icon
    When I click "<element>" element of Split Button component
    Then Split Button expandable "<element>" element has no golden border on focus for classic story
    Examples:
      | element |
      | third   |
      | fourth  |
      | fifth   |