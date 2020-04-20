Feature: Pod component
  I want to test Pod component

  Background: Open Pod component page
    Given I open "Pod" component page

  @positive
  Scenario: Enable border checkbox for a Pod component
    Given I uncheck border checkbox
    When I check border checkbox
    Then Pod component has border

  @positive
  Scenario: Enable and disable border checkbox for a Pod component
    When I uncheck border checkbox
    Then Pod component has no border

  @positive
  Scenario Outline: Change Pod children to <children>
    When I set children to "<children>"
    Then Pod children on preview is set to "<children>"
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Set Pod padding to <padding>
    When I select padding to "<padding>"
    Then Pod padding on preview is "<px>"
    Examples:
      | padding     | px        |
      | extra-small | 6px       |
      | small       | 10px      |
      | medium      | 15px      |
      | large       | 30px 25px |
      | extra-large | 40px      |

  @positive
  Scenario Outline: Change Pod type to <podType>
    When I select podType to "<podType>"
    Then Pod on preview has background color "<color>"
    Examples:
      | podType     | color              |
      | primary     | rgb(255, 255, 255) |
      | secondary   | rgb(242, 244, 245) |
      | tertiary    | rgb(229, 234, 236) |
      | tile        | rgb(255, 255, 255) |
      | transparent | rgba(0, 0, 0, 0)   |

  @positive
  Scenario Outline: Change Pod title to <title>
    When I set title to "<title>"
    Then Pod title on preview is set to "<title>"
    Examples:
      | title                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change Pod subtitle to <subtitle>
    Given I set title to "title"
    When I set subtitle to "<subtitle>"
    Then Pod subtitle on preview is set to "<subtitle>"
    Examples:
      | subtitle                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change Pod alignTitle to <alignTitle>
    Given I set title to "title"
      And I set subtitle to "subtitle"
      And I set footer to "footer"
    When I select alignTitle to "<alignTitle>"
    Then Pod "title" on preview is "<alignTitle>"
      And Pod "subtitle" on preview is "<alignTitle>"
      And Pod "footer" on preview is "<alignTitle>"
    Examples:
      | alignTitle |
      | center     |
      | right      |
      | left       |

  @positive
  Scenario Outline: Change Pod description to <description>
    When I set description to "<description>"
    Then Pod description on preview is set to "<description>"
    Examples:
      | description             |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change Pod footer to <footer>
    When I set footer to "<footer>"
    Then Pod footer on preview is set to "<footer>"
    Examples:
      | footer                  |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Enable and disable onEdit checkbox for a Pod component
    Given I check onEdit checkbox
    When I uncheck onEdit checkbox
    Then Pod component has no onEdit property

  @positive
  Scenario: Enable onEdit checkbox for a Pod component
    When I check onEdit checkbox
    Then Edit property is visible

  @positive
  Scenario: Enable onEdit checkbox and check the edit event
    Given I check onEdit checkbox
      And clear all actions in Actions Tab
    When I click onEdit icon
    Then edit action was called in Actions Tab

  # width is properly for CI
  @positive
  Scenario: Enable onEdit checkbox and check the editContentFullWidth checkbox
    Given I check onEdit checkbox
    When I check editContentFullWidth checkbox
    Then Pod component has width "1006px"

  @positive
  Scenario: Enable onEdit checkbox and check the displayEditButtonOnHover checkbox
    Given I check onEdit checkbox
      And I set title to "title"
      And I check displayEditButtonOnHover checkbox
    When I hover mouse onto Pod content
    Then Pod component has "rgb(0, 128, 93)" background color

  @positive
  Scenario: Enable onEdit checkbox and check the triggerEditOnContent checkbox
    Given I check onEdit checkbox
    When I check triggerEditOnContent checkbox
    Then Pod component has triggerEditOnContent property

  @positive
  Scenario: Enable onEdit checkbox and check the internalEditButton checkbox
    Given I check onEdit checkbox
    When I check internalEditButton checkbox
    Then Pod component has internalEditButton property