Feature: Toast component
  I want to check that all examples of Toast component render correctly

  @positive
  @applitools
  Scenario Outline: Check that Toast component <story> rendered correctly
    Given I open Design Systems default_story "Toast" component docs page
    When I click on "<story>" Toggle Preview
    Then Element displays correctly
    Examples:
      | story                    |
      | button-variant-centered  |
      | button-default           |
      | button-toast-dismissible |
      | button-stacked           |
      | button-stacked-delayed   |
      | button-variant-error     |
      | button-variant-info      |
      | button-variant-success   |
      | button-variant-warning   |