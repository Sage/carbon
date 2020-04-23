Feature: Preview default component
  I want to test Preview component

  Background: Open Preview component default page
    Given I open "Preview" component page

  @positive
  Scenario: Enable loading checkbox for a Preview component
    Given I uncheck loading checkbox
    When I check loading checkbox
    Then Preview component is loading

  @positive
  Scenario: Enable and disable loading checkbox for a Preview component
    When I uncheck loading checkbox
    Then Preview component is not loading

  @positive
  Scenario Outline: Change Preview children to <children>
    Given I set children to "<children>"
    When I uncheck loading checkbox
    Then Preview children is set to "<children>"
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Set width to <width>
    When I set width to "<width>"
      And I check loading checkbox
    Then Preview width is set to "<width>"
    Examples:
      | width |
      | 0px   |
      | 1px   |
      | 100px |

  @positive
  Scenario Outline: Set height to <height>
    When I set height to "<height>"
      And I check loading checkbox
    Then Preview height is set to "<height>"
    Examples:
      | height |
      | 0px    |
      | 1px    |
      | 100px  |

  @positive
  Scenario Outline: Set lines to <lines>
    When I set lines to "<lines>"
    Then Preview has "<lines>" lines
    Examples:
      | lines |
      | 0     |
      | 1     |
      | 100   |

  @positive
  Scenario Outline: Set width to out of scope to <width>
    When I set width to "<width>"
    Then Preview width is not set to "<width>"
    Examples:
      | width                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Set height to out of scope to <height>
    When I set height to "<height>"
    Then Preview height is not set to "<height>"
    Examples:
      | height                  |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Set lines to out of scope to <lines>
    When I set lines to "<lines>"
    Then Preview lines is not set to "<lines>"
    Examples:
      | lines                   |
      | mpú¿¡üßä                |
      | !@#$%^*()_+-=~[];:.,?{} |