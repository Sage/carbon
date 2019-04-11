Feature: Confirm component
  I want to change Confirm component properties

  Background: Open Confirm component page
    Given I open "Confirm" component page

  @positive
  Scenario Outline: Change data in inner context in Confirm dialog
    When I set children to "<children>"
      And I set cancelButton to "<cancelButton>"
      And I set confirmButton to "<confirmButton>"
      And I click on a openButton
    Then dialog inner context children on preview is "<children><cancelButton><confirmButton>"
    Examples:
      | children                 | cancelButton             | confirmButton            |
      | áéíóú¿¡üñ                | ÄÖÜßäöü                  | <>                       |
      | 1!@#$%^*()_+-=~[];:.,?{} | <>                       | ÄÖÜßäöü                  |
      | ÄÖÜßäöüß                 | áéíóú¿¡üñ                | 1!@#$%^*()_+-=~[];:.,?{} |
      | <>                       | 1!@#$%^*()_+-=~[];:.,?{} | áéíóú¿¡üñ                |

  @positive
  Scenario Outline: Change title in Confirm dialog
    When I set title to "<title>"
      And I click on a openButton
    Then dialog title context children on preview is "<title>"
    Examples:
      | title                    |
      | <>                       |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | áéíóú¿¡üñ                |
      | ÄÖÜßäöü                  |

  @positive
  Scenario Outline: Change subtitle in Confirm dialog
    When I set subtitle to "<subtitle>"
      And I click on a openButton
    Then dialog subtitle context is "<subtitle>"
    Examples:
      | subtitle                 |
      | <>                       |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | áéíóú¿¡üñ                |
      | ÄÖÜßäöü                  |

  @positive
  Scenario Outline: Change the height of Confirm dialog
    When I set input height to "<height>"
      And I click on a openButton
    Then Confirm dialog input height is "<height>"
    Examples:
      | height |
      | 0      |
      | 100    |
      | 10     |
      | 15     |
      | 1500   |
      | 2      |
      | 999    |

  @positive
  Scenario Outline: Change the size of Confirm dialog
    When I set component size to "<size>"
      And I click on a openButton
    Then Confirm dialog size property on preview is "<size>"
    Examples:
      | size               | 
      | small              | 
      | medium-small       | 
      | extra-small        | 
      | medium             |
      | medium-large       | 
      | large              | 
      | extra-large        |

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