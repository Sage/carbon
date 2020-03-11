Feature: Split Button component
  I want to change Split Button component properties

  Background: Open Split Button component default page
    Given I open "Split Button" component page

  @positive @applitools
  Scenario Outline: I select buttonType to <buttonType>
    When I select buttonType to "<buttonType>"
    Then Button background color is "<color>"
      And Element displays correctly
    Examples:
      | buttonType | color            |
      | primary    | rgb(0, 128, 93)  |
      | secondary  | rgba(0, 0, 0, 0) |

  @positive @applitools
  Scenario Outline: I select size to <size>
    When I select size to "<size>"
    Then Split Button is set to "<size>" size and has <px> px height
      And Element displays correctly
    Examples:
      | size   | px |
      | small  | 32 |
      | medium | 40 |
      | large  | 48 |

  @positive @applitools
  Scenario: I disable Split Button component
    When I disable SplitButton component
    Then Button is disabled
      And Element displays correctly

  @positive @applitools
  Scenario: I enable Split Button component
    Given I disable SplitButton component
    When I enable SplitButton component
    Then Button is enabled
      And Element displays correctly

  @positive @applitools
  Scenario Outline: I set Split Button text align to <align>
    When I select align to "<align>"
    Then Split Button component additional buttons text align is set to "<align>" align
      And Element displays correctly
    Examples:
      | align |
      | left  |
      | right |

  @positive @applitools
  Scenario Outline: I set text to <text>
    When I set text to "<text>"
    Then Button label on preview is "<text>"
      And Element displays correctly
    Examples:
      | text                    |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <> |

  @positive @applitools
  Scenario Outline: I set subtext to <subtext>
    Given I select size to "large"
    When I set subtext to "<subtext>"
    Then Button subtext on preview is "<subtext>"
      And Element displays correctly
    Examples:
      | subtext                 |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <> |

  @positive @applitools
  Scenario Outline: I check icon positioning to <iconPosition>
    Given I check has icon checkbox
    When I select iconType to "warning"
      And I select iconPosition to "<iconPosition>"
    Then Split Button iconPosition is set to "<iconPosition>" and has "warning" icon
      And Element displays correctly
    Examples:
      | iconPosition |
      | after        |
      | before       |

  @positive @applitools
  Scenario: I expand Split Button component
    When I hover mouse onto icon
    Then Split Button is expanded
      And Element displays correctly

  @positive @applitools
  Scenario Outline: Verify color palette for Split Button component without focus
    # commented because of BDD default scenario Given - When - Then
    # When I open "Split Button" component page
    Then Split Button first element has proper background-color "<background-color>" and border "<border-color>" color and has border-width 2 px
      And Split Button second element has proper background-color "<background-color>" and border "<border-color>" color and has border-width 2 px
      And Element displays correctly
    Examples:
      | background-color | border-color    |
      | rgba(0, 0, 0, 0) | rgb(0, 128, 93) |

  @ignore
  # there is no possibility to trigger mouseover on first element
  Scenario: Verify color palette for first element of Split Button component with focus
    When I hover mouse onto split button
    Then Split Button first element has proper background-color "rgb(0, 96, 69)" and border "rgb(0, 96, 69)" color and has border-width 2 px
      And Element displays correctly

  @positive @applitools
  Scenario Outline: Verify color palette for second element of Split Button component with focus
    When I hover mouse onto icon
    Then Split Button second element has proper background-color "<color>" and border "<color>" color and has border-width 2 px
      And Split Button additional buttons have proper background-color "<color>" and border "<color>" color and has border-width 1 px
      And Element displays correctly
    Examples:
      | color          |
      | rgb(0, 96, 69) |

  @positive @applitools
  Scenario: Verify the click function for a first element of Split Button component
    Given clear all actions in Actions Tab
    When I click "first" element of Split Button component
    Then click action was called in Actions Tab
      And Element displays correctly

  @positive @applitools
  Scenario Outline: Verify the click function for a <element> element of Split Button component
    Given clear all actions in Actions Tab
      And I hover mouse onto icon
    When I click "<element>" element of Split Button component
    Then click action was called in Actions Tab
      And Element displays correctly
    Examples:
      | element |
      | third   |
      | fourth  |
      | fifth   |

  @positive @applitools
  Scenario Outline: Verify hover color and golden border for <element> element of Split Button component
    Given I hover mouse onto icon
    When I click "<element>" element of Split Button component
    Then Split Button expandable "<element>" element has golden border on focus
      And Element displays correctly
    Examples:
      | element |
      | third   |
      | fourth  |
      | fifth   |