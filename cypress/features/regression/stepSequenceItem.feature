Feature: Step Sequence Item component
  I want to change Step Sequence Item component properties

  Background: Open Step Sequence Item component page
    Given I open "Step Sequence Item" component page

  @positive
  Scenario Outline: I set indicator to <indicator>
    When I set indicator to "<indicator>"
    Then indicator is set to "<indicator>"
    Examples:
      | indicator               |
      | -100                    |
      | 0                       |
      | 999                     |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: I set status to <status>
    When I select status to "<status>"
    Then text "Step Label" color is set to "<color>"
    Examples:
      | status     | color               |
      | complete   | rgb(0, 163, 118)    |
      | current    | rgba(0, 0, 0, 0.9)  |
      | incomplete | rgba(0, 0, 0, 0.55) |

  @positive
  Scenario Outline: I set hiddenCompleteLabel to <hiddenCompleteLabel>
    When I set hiddenCompleteLabel to "<hiddenCompleteLabel>"
      And I select status to "complete"
    Then hidden label is set to "<hiddenCompleteLabel>"
    Examples:
      | hiddenCompleteLabel |
      | mp150ú¿¡üßä         |

  @positive
  Scenario Outline: I set hiddenCurrentLabel to <hiddenCurrentLabel>
    When I set hiddenCurrentLabel to "<hiddenCurrentLabel>"
      And I select status to "current"
    Then hidden label is set to "<hiddenCurrentLabel>"
    Examples:
      | hiddenCurrentLabel |
      | mp150ú¿¡üßä        |

  @positive
  Scenario Outline: I set ariaLabel to <ariaLabel>
    When I set ariaLabel to "<ariaLabel>"
    Then ariaLabel is set to "<ariaLabel>"
    Examples:
      | ariaLabel   |
      | mp150ú¿¡üßä |

  @positive
  Scenario Outline: I set children to <children>
    When I set children to "<children>"
    Then children is set "<children>"
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |