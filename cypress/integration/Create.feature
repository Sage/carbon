Feature: Create component
  I want to change Create component properties

  Background: Open Content component page
    Given I open "Create" component page

  @positive
  Scenario Outline: Change data in Create component
    When I set children to "<children>"
      And I set className to "<className>"
    Then Create children on preview is "<children>"
      And Create className on preview is "<className>"
    Examples:
      | children                 | className                |
      | Example subtext          | 汉字                      |
      | 1!@#$%^*()_+-=~[];:.,?{} | center                   |
      | 汉字                      | Test text                |
      | <>                       | right                    |
      | 0                        | 1!@#$%^*()_+-=~[];:.,?{} |