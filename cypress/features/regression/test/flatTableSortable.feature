Feature: FlatTable sortable component
  I want to check FlatTable sortable component properties

  Background: Open FlatTable sortable component page
    Given I open sortable Test "Flat Table" component page in Iframe

  # will remove when Applitools will be implemented
  @positive
  Scenario Outline: Flat table header has <colorTheme> color
    When I select colorTheme to "<colorTheme>"
    Then Flat table header has "<color>" color
    Examples:
      | colorTheme        | color              |
      | dark              | rgb(51, 91, 109)   |
      | transparent-base  | rgb(242, 244, 245) |
      | light             | rgb(204, 214, 218) |
      | transparent-white | rgb(255, 255, 255) |

  @positive
  Scenario Outline: <headerName> flat table header has focus
    When I focus "<position>" header cell
    Then "<position>" header has focus
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted descending after press Enter 1 time
    When I press "Enter" on "<position>" header 1 time
    Then "<position>" column is sorted in "desc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted descending after press Space 1 time
    When I press "Space" on "<position>" header 1 time
    Then "<position>" column is sorted in "desc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted ascending after press Enter 2 time
    When I press "Enter" on "<position>" header 2 time
    Then "<position>" column is sorted in "asc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted ascending after press Space 2 time
    When I press "Space" on "<position>" header 2 time
    Then "<position>" column is sorted in "asc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |
