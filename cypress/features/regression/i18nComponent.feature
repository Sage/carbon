Feature: I18n component
  I want to test I18n component properties

  @positive
  Scenario: Disable markdown
    When I open Basic "I18nComponent Test" component in noIFrame with "i18n" json from "commonComponents" using "markdownFalse" object name
    Then preview text is "# My __example__ translation."

  @positive
  Scenario: Enable markdown
    When I open Basic "I18nComponent Test" component in noIFrame with "i18n" json from "commonComponents" using "markdown" object name
    Then preview text is "# My example translation."

  @positive
  Scenario:  Disable inline
    When I open Basic "I18nComponent Test" component in noIFrame with "i18n" json from "commonComponents" using "inlineFalse" object name
    Then preview text is "My example translation." with "h1" tag and "my-example-translation" id

  @positive
  Scenario: Disable and enable inline
    When I open Basic "I18nComponent Test" component in noIFrame with "i18n" json from "commonComponents" using "inline" object name
    Then preview text is "# My example translation."

  @negative
  Scenario Outline: Set scope text that is missing
    When I open Basic "I18nComponent Test" component in noIFrame with "i18n" json from "commonComponents" using "<nameOfObject>" object name
    # used single quotes to pass double quotes inside
    Then preview text is '[missing "en.<text>" translation]'
    Examples:
      | text        | nameOfObject    |
      | Sample text | scopeSampleText |
      | 1234567890  | scopeNumbers    |
# no special characters required for this case
