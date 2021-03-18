Feature: Split Button component
  I want to test Split Button component properties

  @positive
  Scenario Outline: I set text to <text>
    When I open default "Split Button Test" component in noIFrame with "splitButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Button label on preview is <text>
    Examples:
      | text                         | nameOfObject         |
      | mp150ú¿¡üßä                  | textOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | textSpecialCharacter |

  @positive
  Scenario Outline: I set subtext to <subtext>
    When I open default "Split Button Test" component in noIFrame with "splitButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Button subtext on preview is <subtext>
    Examples:
      | subtext                      | nameOfObject            |
      | mp150ú¿¡üßä                  | subtextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtextSpecialCharacter |

  @positive
  Scenario: I expand Split Button component
    Given I open default "Split Button Test" component in noIFrame with "splitButton" json from "commonComponents" using "default" object name
    When I hover mouse onto "dropdown" icon in no iFrame
    Then Split Button is expanded

  @ignore
  # there is no possibility to trigger mouseover on first element
  Scenario: Verify color palette for first element of Split Button component with focus
    Given I open default "Split Button Test" component in noIFrame with "splitButton" json from "commonComponents" using "default" object name
    When I hover mouse onto split button
    Then Split Button first element has proper background-color "rgb(0, 96, 70)" and border "rgb(0, 96, 70)" color and has border-width 2 px

  @positive
  Scenario Outline: Verify color palette for second element of Split Button component with focus
    Given I open default "Split Button Test" component in noIFrame with "splitButton" json from "commonComponents" using "default" object name
    When I hover mouse onto "dropdown" icon in no iFrame
    Then Split Button second element has proper background-color "<color>" and border "<color>" color and has border-width 2 px
      And Split Button additional buttons have proper background-color "<color>" and border "<color>" color and has border-width 1 px
    Examples:
      | color          |
      | rgb(0, 96, 70) |

  @positive
  Scenario Outline: Verify hover color and golden border for <element> element of Split Button component
    Given I open default "Split Button Test" component in noIFrame with "splitButton" json from "commonComponents" using "default" object name
      And I hover mouse onto "dropdown" icon in no iFrame
    When I click "<element>" element of Split Button component
    Then Split Button expandable "<element>" element has golden border on focus
    Examples:
      | element |
      | first   |
      | second  |
      | third   |

  @positive
  Scenario: Verify the click function for a main element of Split Button component
    Given I open "Split Button Test" component page "default"
      And clear all actions in Actions Tab
    When I click "main-button" element of Split Button component in IFrame
    Then click action was called in Actions Tab

  @positive
  Scenario Outline: Verify the click function for a <element> element of Split Button component
    Given I open "Split Button Test" component page "default"
      And clear all actions in Actions Tab
      And I hover mouse onto icon
    When I click "<element>" element of Split Button component in IFrame
    Then click action was called in Actions Tab
    Examples:
      | element |
      | first   |
      | second  |
      | third   |

  @positive
  Scenario: Invoking Split Button component in a hidden container
    Given I open "Split Button" component page "in overflow hidden container" in no iframe
      And I expand accordionRow using "Enter" key
    When I hover mouse onto "dropdown" icon in no iFrame
    Then Split Button is expanded