Feature: Pod component
  I want to test Pod component

  @positive
  Scenario: Enable border checkbox for a Pod component
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "border" object name
    Then Pod component has border

  @positive
  Scenario: Disable border checkbox for a Pod component
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "borderFalse" object name
    Then Pod component has no border

  @positive
  Scenario Outline: Change Pod children to <children>
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod children on preview is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Set Pod padding to <padding>
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod padding on preview is "<px>"
    Examples:
      | padding     | px        | nameOfObject      |
      | extra-small | 6px       | paddingExtraSmall |
      | small       | 10px      | paddingSmall      |
      | medium      | 15px      | paddingMedium     |
      | large       | 30px 25px | paddingLarge      |
      | extra-large | 40px      | paddingExtraLarge |

  @positive
  Scenario Outline: Change Pod type to <podType>
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod on preview has background color "<color>"
    Examples:
      | podType     | color              | nameOfObject       |
      | primary     | rgb(255, 255, 255) | podTypePrimary     |
      | secondary   | rgb(242, 245, 246) | podTypeSecondary   |
      | tertiary    | rgb(230, 235, 237) | podTypeTetiary     |
      | tile        | rgb(255, 255, 255) | podTypeTile        |
      | transparent | rgba(0, 0, 0, 0)   | podTypeTransparent |

  @positive
  Scenario Outline: Change Pod title to <title>
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod title on preview is set to <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change Pod subtitle to <subtitle>
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod subtitle on preview is set to <subtitle>
    Examples:
      | subtitle                     | nameOfObject             |
      | mp150ú¿¡üßä                  | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtitleSpecialCharacter |

  @positive
  Scenario Outline: Change Pod alignTitle to <alignTitle>
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod "title" on preview is "<alignTitle>"
      And Pod "subtitle" on preview is "<alignTitle>"
      And Pod "footer" on preview is "<alignTitle>"
    Examples:
      | alignTitle | nameOfObject          |
      | center     | alignTitleAlignCenter |
      | right      | alignTitleAlignRight  |
      | left       | alignTitleAlignLeft   |

  @positive
  Scenario Outline: Change Pod description to <description>
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod description on preview is set to <description>
    Examples:
      | description                  | nameOfObject                |
      | mp150ú¿¡üßä                  | descriptionOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | descriptionSpecialCharacter |

  @positive
  Scenario Outline: Change Pod footer to <footer>
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod footer on preview is set to <footer>
    Examples:
      | footer                       | nameOfObject           |
      | mp150ú¿¡üßä                  | footerOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | footerSpecialCharacter |

  @positive
  Scenario: Disable onEdit checkbox for a Pod component
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "onEditFlase" object name
    Then Pod component has no onEdit property

  @positive
  Scenario: Enable onEdit checkbox for a Pod component
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "onEdit" object name
    Then Edit property is visible

  @positive
  Scenario: Check the editContentFullWidth checkbox
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "editContentFullWidth" object name
    Then Pod component has width "1226px"

  @positive
  Scenario: Check the displayEditButtonOnHover checkbox
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "displayEditButtonOnHover" object name
    When I hover mouse onto Pod content
    Then Pod component has "rgb(0, 129, 93)" background color

  @positive
  Scenario: Check the triggerEditOnContent checkbox
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "triggerEditOnContent" object name
    Then Pod component has triggerEditOnContent property

  @positive
  Scenario: Check the internalEditButton checkbox
    When I open default "Pod" component in noIFrame with "pod" json from "commonComponents" using "internalEditButton" object name
    Then Pod component has internalEditButton property

  @positive
  Scenario: Check the edit event
    Given I open "Pod" component page "default"
      And I check onEdit checkbox
      And clear all actions in Actions Tab
    When I click onEdit icon in Iframe
    Then edit action was called in Actions Tab