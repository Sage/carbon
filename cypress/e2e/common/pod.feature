Feature: Pod component
  I want to test Pod component

  @positive
  Scenario Outline: Change Pod children to <children>
    When I open Default "Pod Test" component with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod children on preview is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Change Pod title to <title>
    When I open Default "Pod Test" component with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod title on preview is set to <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change Pod subtitle to <subtitle>
    When I open Default "Pod Test" component with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod subtitle on preview is set to <subtitle>
    Examples:
      | subtitle                     | nameOfObject             |
      | mp150ú¿¡üßä                  | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtitleSpecialCharacter |

  @positive
  Scenario Outline: Change Pod footer to <footer>
    When I open Default "Pod Test" component with "pod" json from "commonComponents" using "<nameOfObject>" object name
    Then Pod footer on preview is set to <footer>
    Examples:
      | footer                       | nameOfObject           |
      | mp150ú¿¡üßä                  | footerOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | footerSpecialCharacter |

@positive
  Scenario: Check the triggerEditOnContent checkbox
    When I open Default "Pod Test" component with "pod" json from "commonComponents" using "triggerEditOnContent" object name
    Then Pod component has triggerEditOnContent property

  @positive
  Scenario: Edit button is visible on hover
    Given I open "Pod" component page "with display edit button on hover"
    When I check that onEdit icon is not visible
      And I hover mouse onto pod
    Then The onEdit icon is visible

  @positive
  Scenario: Check the edit event
    Given I open Default "Pod Test" component with "pod" json from "commonComponents" using "onEdit" object name
    When I click onEdit icon
    Then edit action was called in Actions Tab