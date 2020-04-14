Feature: Row component
  I want to change Row component properties

  Background: Open Row component page
    Given I open "Row" component page

  @positive
  Scenario: Enable columnDivide
    When I uncheck columnDivide checkbox
      And I check columnDivide checkbox
    Then columnDivide is set

  @positive
  Scenario: Disable columnDivide
    When I uncheck columnDivide checkbox
    Then columnDivide is not set

  @positive
  Scenario Outline: Set columnAlign to <gutter>
    When I select gutter to "<gutter>"
    Then gutter on preview is "<gutter>"
    Examples:
      | gutter       |
      | extra-small  |
      | small        |
      | medium-small |
      | medium       |
      | medium-large |
      | large        |
      | extra-large  |

  @positive
  Scenario Outline: Set columnAlign to <direction>
    When I select columnAlign to "<direction>"
    Then columnAlign on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario Outline: Set columnOffset to <columnOffset>
    When I set columnOffset to "<columnOffset>"
    Then columnOffset on preview is "<columnOffset>"
    Examples:
      | columnOffset |
      | -100         |
      | -1           |
      | 0            |
      | 1            |
      | 100          |

  @negative
  Scenario Outline: Set columnOffset out of scope to <columnOffset>
    When I set columnOffset to "<columnOffset>"
    Then columnOffset on preview is "<columnOffset>"
    Examples:
      | columnOffset            |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Set columnSpan to <columnSpan>
    When I set columnSpan to "<columnSpan>"
    Then columnSpan on preview is "<columnSpan>"
    Examples:
      | columnSpan |
      | -100       |
      | -1         |
      | 0          |
      | 1          |
      | 100        |

  @positive
  Scenario Outline: Set columnSpan out of scope to <columnSpan>
    When I set columnSpan to "<columnSpan>"
    Then columnSpan on preview is "<columnSpan>"
    Examples:
      | columnSpan              |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |


  @positive
  Scenario Outline: Set children to <children>
    When I set children to "<children>"
    Then column text is "<children>"
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |