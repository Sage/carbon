Feature: Confirm component
  I want to change Confirm component properties

  Background: Open Confirm component page
    Given I open "Confirm" component page

  @positive
  Scenario Outline: Change data in Confirm dialog
    When I set children to "<children>"
      And I set title to "<title>"
      And I set cancelButton to "<cancelButton>"
      And I set confirmButton to "<confirmButton>"
      And I set subtitle to "<subtitle>"
      And I click on a openButton
    Then dialog inner context children on preview is "<children><cancelButton><confirmButton>"
      And dialog title context children on preview is "<title>"
      And dialog subtitle context is "<subtitle>"
    Examples:
      | children                 | confirmButton            | cancelButton             | subtitle                  | title                    |
      | Example subtext          | Yes                      | No                       | null                      | <>                       |
      | 1!@#$%^*()_+-=~[];:.,?{} | Tak                      | <>                       | 汉字                       | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                      | 1!@#$%^*()_+-=~[];:.,?{} | Nie                      | \'                        | 汉字                      |
      | <>                       | 汉字                      | 1!@#$%^*()_+-=~[];:.,?{} | Example subtitle          | Example title            |
      | 0                        | null                     | cancelButton             | 000                       | null                     |


  @positive
  Scenario Outline: Change the height / size of Confirm dialog
    When I set input height to "<height>"
      And I set component size to "<size>"
      And I click on a openButton
    Then Confirm dialog input height is "<height>"
      And Confirm dialog size property on preview is "<size>"
    Examples:
      | height | size               | 
      | 0      | small              | 
      | 100    | medium-small       | 
      | 10     | extra-small        | 
      | 15     | medium             |
      | 1500   | medium-large       | 
      | 2      | large              | 
      | 999    | extra-large        |

  @positive
  Scenario: Enable background UI
    When I check enableBackgroundUI
      And I click on a openButton
    Then Background UI is enabled

  @negative
  Scenario: Disable background UI
    When I uncheck enableBackgroundUI
      And I click on a openButton
    Then Background UI is disabled

  @positive
  Scenario: Disable escape key
    When I check disableEscKey
      And I click on a openButton
      And I hit ESC key on Confirm dialog
    Then Confirm dialog is visible

  @negative
  Scenario: Enable escape key
    When I uncheck disableEscKey
      And I click on a openButton
      And I hit ESC key on Confirm dialog
    Then Confirm dialog is not visible

  @positive
  Scenario: Close icon enabled
    When I check closeIconCheckbox
      And I click on a openButton
      And I click close icon
    Then Confirm dialog is not visible

  @negative
  Scenario: Close icon disabled
    When I uncheck closeIconCheckbox
      And I click on a openButton
    Then Close icon is not visible

  @positive
  Scenario: StickyFormFooter enabled
    When I check stickyFormFooter
      And I click on a openButton
    Then Confirm dialog has stickyFormFooter parameter enabled

  @negative
  Scenario: StickyFormFooter disabled
    When I uncheck stickyFormFooter
      And I click on a openButton
    Then Confirm dialog has no stickyFormFooter parameter