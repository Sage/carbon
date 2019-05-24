Feature: Confirm component
  I want to change Confirm component properties

  Background: Open Confirm component page
    Given I open "Confirm" component page

  @positive
  Scenario Outline: Change cancelLabel in inner context in Confirm dialog to <cancelLabel>
    When I set cancelLabel to "<cancelLabel>"
      And I click on a openButton
    Then cancel button content on preview is "<cancelLabel>"
    Examples:
      | cancelLabel             |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change confirmLabel in inner context in Confirm dialog to <confirmLabel>
    When I set confirmLabel to "<confirmLabel>"
      And I click on a openButton
    Then confirm button content on preview is "<confirmLabel>"
    Examples:
      | confirmLabel            |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |
      
  @positive
  Scenario Outline: Change title in Confirm dialog to <title>
    When I set title to "<title>"
      And I click on a openButton
    Then dialog title context on preview is "<title>"
    Examples:
      | title                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change subtitle in Confirm dialog to <subtitle>
    When I set subtitle to "<subtitle>"
      And I click on a openButton
    Then dialog subtitle context is "<subtitle>"
    Examples:
      | subtitle                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change the height of Confirm dialog
    When I set height to "<height>"
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
    When I select size to "<sizeName>"
      And I click on a openButton
    Then Confirm dialog size property on preview is "<sizePropertyInPx>"
    Examples:
      | sizeName     | sizePropertyInPx |
      | extra-small  |       300        |
      | small        |       380        |
      | medium-small |       540        |
      | medium       |       750        |
      | medium-large |       850        |
      | large        |       960        |
      | extra-large  |       1080       |

  @positive
  Scenario: Enable background UI
    When I check enableBackgroundUI checkbox
      And I click on a openButton
    Then Background UI is enabled

  @negative
  Scenario: Disable background UI
    When I check enableBackgroundUI checkbox
      And I uncheck enableBackgroundUI checkbox
      And I click on a openButton
    Then Background UI is disabled

  @positive
  Scenario: Disable escape key
    When I check disableEscKey checkbox
      And I click on a openButton
      And I hit ESC key
    Then Confirm dialog is visible

  @negative
  Scenario: Enable escape key
    When I uncheck disableEscKey checkbox
      And I click on a openButton
      And I hit ESC key
    Then Confirm dialog is not visible

  @positive
  Scenario: Close icon enabled
    When I check showCloseIcon checkbox
      And I click on a openButton
      And I click close icon
    Then Confirm dialog is not visible

  @negative
  Scenario: Close icon disabled
    When I check showCloseIcon checkbox
      And I uncheck showCloseIcon checkbox
      And I click on a openButton
    Then Close icon is not visible

  # Tests are disabled until the stickyFormFooter will be fixed
  # doesn't work on Carbon Site
  @ignore
  @positive
  Scenario: StickyFormFooter enabled
    When I check stickyFormFooter checkbox
      And I click on a openButton
    Then Confirm dialog has stickyFormFooter parameter enabled

  @ignore
  @negative
  Scenario: StickyFormFooter disabled
    When I uncheck stickyFormFooter checkbox
      And I click on a openButton
    Then Confirm dialog has no stickyFormFooter parameter

  @positive
  Scenario: Confirm dialog should dissapear after click onto cancelButton
    When I click on a openButton
      And I click on a cancelButton
    Then Confirm dialog is not visible

  @ignore @FE-1487
  @positive
  Scenario: Confirm dialog should dissapear after click onto confirmButton
    When I click on a openButton
      And I click on a confirmButton
    Then Confirm dialog is not visible