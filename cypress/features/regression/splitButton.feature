Feature: Split Button component
  I want to test Split Button component properties

  @positive
  Scenario Outline: I select buttonType to <buttonType>
    When I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Button background color is "<color>"
    Examples:
      | buttonType | color            | nameOfObject        |
      | primary    | rgb(0, 129, 93)  | buttonTypePrimary   |
      | secondary  | rgba(0, 0, 0, 0) | buttonTypeSecondary |

  @positive
  Scenario Outline: I select size to <size>
    When I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Split Button is set to "<size>" size and has <px> px height
    Examples:
      | size   | px | nameOfObject |
      | small  | 32 | sizeSmall    |
      | medium | 40 | sizeMedium   |
      | large  | 48 | sizeLarge    |

  @positive
  Scenario: I disable Split Button component
    When I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "disabled" object name
    Then Button is disabled

  @positive
  Scenario: I enable Split Button component
    When I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "disabledFalse" object name
    Then Button is enabled

  @positive
  Scenario Outline: I set Split Button text align to <align>
    When I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Split Button component additional buttons text align is set to "<align>" align
    Examples:
      | align | nameOfObject |
      | left  | alignLeft    |
      | right | alignRight   |

  @positive
  Scenario Outline: I set text to <text>
    When I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Button label on preview is <text>
    Examples:
      | text                    | nameOfObject         |
      | mp150ú¿¡üßä             | textOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | textSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: I set subtext to <subtext>
    When I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Button subtext on preview is <subtext>
    Examples:
      | subtext                 | nameOfObject            |
      | mp150ú¿¡üßä             | subtextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | subtextSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: I check icon positioning to <iconPosition>
    When I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Split Button iconPosition is set to "<iconPosition>" and has "warning" icon
    Examples:
      | iconPosition | nameOfObject       |
      | after        | iconPositionAfter  |
      | before       | iconPositionBefore |

  @positive
  Scenario: I expand Split Button component
    Given I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "default" object name
    When I hover mouse onto "dropdown" icon in no iFrame
    Then Split Button is expanded

  @positive
  Scenario Outline: Verify color palette for Split Button component without focus
    When I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "default" object name
    Then Split Button first element has proper background-color "<background-color>" and border "<border-color>" color and has border-width 2 px
      And Split Button second element has proper background-color "<background-color>" and border "<border-color>" color and has border-width 2 px
    Examples:
      | background-color | border-color    |
      | rgba(0, 0, 0, 0) | rgb(0, 129, 93) |

  @ignore
  # there is no possibility to trigger mouseover on first element
  Scenario: Verify color palette for first element of Split Button component with focus
    Given I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "default" object name
    When I hover mouse onto split button
    Then Split Button first element has proper background-color "rgb(0, 96, 70)" and border "rgb(0, 96, 70)" color and has border-width 2 px

  @positive
  Scenario Outline: Verify color palette for second element of Split Button component with focus
    Given I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "default" object name
    When I hover mouse onto "dropdown" icon in no iFrame
    Then Split Button second element has proper background-color "<color>" and border "<color>" color and has border-width 2 px
      And Split Button additional buttons have proper background-color "<color>" and border "<color>" color and has border-width 1 px
    Examples:
      | color          |
      | rgb(0, 96, 70) |

  @positive
  Scenario Outline: Verify hover color and golden border for <element> element of Split Button component
    Given I open default "Split Button" component in noIFrame with "splitButton" json from "commonComponents" using "default" object name
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
    Given I open "Split Button" component page
      And clear all actions in Actions Tab
    When I click "main-button" element of Split Button component in IFrame
    Then click action was called in Actions Tab

  @positive
  Scenario Outline: Verify the click function for a <element> element of Split Button component
    Given I open "Split Button" component page
      And clear all actions in Actions Tab
      And I hover mouse onto icon
    When I click "<element>" element of Split Button component in IFrame
    Then click action was called in Actions Tab
    Examples:
      | element |
      | first   |
      | second  |
      | third   |