Feature: I18n component
  I want to change I18n component properties

  Background: Open I18n component page
    Given I open "I18nComponent" component page

  @positive
  Scenario: Disable markdown
    When I uncheck markdown checkbox
    Then preview text is "# My __example__ translation."

  @positive
  Scenario: Disable and enable markdown
    When I uncheck markdown checkbox
      And I check markdown checkbox
    Then preview text is "# My example translation."

  @positive
  Scenario:  Disable inline
    When I uncheck inline checkbox
    Then preview text is "My example translation." with "h1" tag and "my-example-translation-" id

  @positive
  Scenario: Disable and enable inline
    When I uncheck inline checkbox
      And I check inline checkbox
    Then preview text is "# My example translation."

  @negative
  Scenario Outline: Set scope text that is missing
    When I set scope to "<text>"
    # used single quotes to pass double quotes inside
    Then preview text is '[missing "en.<text>" translation]'
    Examples:
      | text        |
      | Sample text |
      | 1234567890  |
# no special characters required for this case
