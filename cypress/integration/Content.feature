Feature: Content component
  I want to change Content component properties

  Background: Open Content component page
    Given I open "Content" component page

  @positive
  Scenario Outline: Change data in Content dialog
    When I set children to "<children>"
      And I set title to "<title>"
      And I set as property to "<property>"
      And I set align property to "<alignProperty>"
    Then Content children on preview is "<children>"
      And Content title context children on preview is "<title>"
      And Content as property is set to "<property>"
      And Content align property is set to "<alignProperty>"
    Examples:
      | children                 | alignProperty             | property    	| title                    |
      | Example subtext          | right                     | primary      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 1!@#$%^*()_+-=~[];:.,?{} | center                    | secondary    | <>                       |
      | 汉字                      | left                      | primary      | 汉字                     |
      | <>                       | right                     | secondary    | Example title            |
      | 0                        | center                    | primary      | null                     |

  @positive
  Scenario: BodyFullWidth enabled
    When I check bodyFullWidth checkbox
    Then Content preview has bodyFullWidth parameter enabled

  @negative
  Scenario: BodyFullWidth disabled
    When I uncheck bodyFullWidth checkbox
    Then Content preview has no bodyFullWidth parameter

  @positive
  Scenario Outline: Inline enabled and change title width
    When I check inline checkbox
      And I set titleWidth parameter to "<width>"
    Then Content preview has inline parameter enabled
      And Content preview height is "<width>"
    Examples:
      | width  |
      | 0      |
      | 100    |
      | -10    |
      | 15     |

  @negative
  Scenario: Inline disabled
    When I uncheck inline checkbox
    Then Content preview has no inline parameter