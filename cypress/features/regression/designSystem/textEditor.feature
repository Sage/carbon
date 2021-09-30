Feature: Text Editor component
  I want to test Text Editor component

  Background: Open Text Editor component page
    Given I open "Text Editor" component page "default story"

  @positive
  Scenario: Verify that counter works properly
    When I type "Testing is awesome" in Text Editor
    Then Text Editor counter shows "2982" characters left

  @positive
  Scenario Outline: Verify <buttonType> button works correctly in Text Editor Toolbar
    Given I click onto "<buttonType>" in Text Editor Toolbar
    When I type "Testing is awesome" in Text Editor
    Then text has "<buttonType>" css property
      And button "<buttonType>" is clicked and active
    Examples:
      | buttonType |
      | bold       |
      | italic     |

  @positive
  Scenario Outline: Verify <buttonType> button works correctly in Text Editor Toolbar
    Given I click onto "<buttonType>" in Text Editor Toolbar
    When I type "Testing{Enter}is{Enter}awesome" in Text Editor
    Then text is rendered in "<buttonType>" type
      And button "<buttonType>" is clicked and active
    Examples:
      | buttonType  |
      | bullet-list |
      | number-list |

  @positive
  Scenario: Verify Tab keyboard accessibility for Text Editor
    Given I focus the Text Editor
    When I press Tab onto focused element
    Then button "bold" is focused

  @positive
  Scenario Outline: Verify that Right Arrow keyboard key after pressing <times> times focus the <buttonType> button in Toolbar
    Given I focus the Text Editor
      And I press Tab onto focused element
    When I press keyboard "rightarrow" key times <times>
    Then button "<buttonType>" is focused
    Examples:
      | buttonType  | times |
      | bold        | 0     |
      | italic      | 1     |
      | bullet-list | 2     |
      | number-list | 3     |

  @positive
  Scenario Outline: Verify that Left Arrow keyboard key after pressing <times> times focus the <buttonType> button in Toolbar
    Given I focus the Text Editor
      And I press Tab onto focused element
    When I press keyboard "leftarrow" key times <times>
    Then button "<buttonType>" is focused
    Examples:
      | buttonType  | times |
      | bold        | 4     |
      | italic      | 3     |
      | bullet-list | 2     |
      | number-list | 1     |

  @positive
  Scenario Outline: Verify that Enter keyboard key selects proper <buttonType> button in Toolbar after pressing
    Given I focus the Text Editor
      And I press Tab onto focused element
      And I press keyboard "rightarrow" key times <times>
      And I wait 250
    When I press "Enter" onto focused element
    Then button "<buttonType>" is clicked and active
    Examples:
      | buttonType  | times |
      | bold        | 0     |
      | italic      | 1     |
      | bullet-list | 2     |
      | number-list | 3     |

  @positive
  Scenario Outline: Verify that Space keyboard key selects proper <buttonType> button in Toolbar after pressing
    Given I focus the Text Editor
      And I press Tab onto focused element
      And I press keyboard "rightarrow" key times <times>
      And I wait 250
    When I press "Space" onto focused element
    Then button "<buttonType>" is clicked and active
    Examples:
      | buttonType  | times |
      | bold        | 0     |
      | italic      | 1     |
      | bullet-list | 2     |
      | number-list | 3     |

  @positive
  Scenario: Verify when input link - it is shown as formatted link and not as text
    When I type "https://carbon.sage.com" in Text Editor
    Then Text Editor shows the link "https://carbon.sage.com" inside the input