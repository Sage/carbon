Feature: Profile component
  I want to change Profile component properties

  Background: Open Profile component page
    Given I open "Profile" component page

  @positive
  Scenario Outline: Set email to <email>
    When I set email to "<email>"
    Then email is set to "<email>"
    Examples:
      | email              |
      | example@email.com  |
      | johnsmith@sage.com |

  @positive
  Scenario Outline: Get avatar via email
    When I set email to "<email>"
    Then email is set to "<email>"
      And avatar is taken from "<avatar>"
    Examples:
      | email                | avatar                                                                        |
      | andrew.tait@sage.com | https://www.gravatar.com/avatar/ec55ecf2e1c7e7e56a904b50245c24a4?s=40&d=blank |

  @negative
  Scenario Outline: Set email out of scope to <email>
    When I set email to "<email>"
    Then email is set to "<email>"
    Examples:
      | email                   |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <> |

  @positive
  Scenario Outline: Set initials to <initials>
    When I set initials to "<initials>"
    Then initials is set to "<result>"
    Examples:
      | initials | result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
      | A        | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABW0lEQVRYR+2Vv0sDQRCFX5q95q7Qa9RWRAQtA/6obJIiUTBaiH+gpEgiaFIkjZ0IlgomGkuTFMHGNLlG2YUNFpsQ9gVy4Gx53Nx9983Mu0y70/1Bik9GAMnuiEFSIMSgGGQNsPUyg2KQNcDW/58ZHCdjVG8aGA6/cFEqYmN9jZVn6hdmsPP+gdt60zz06CCLw/1sugDvGi18j0ZQSiFJEpyfFRCogIZciEENdl2uYW93B3G8akyeFvPY3tpMB6Bub7N1b2YvjlfMLEZhiJNCbvmAdjk0iW3rw+MTnl9ecXVZMqDMoVvc6w9QqdWRzx1PWuq65gtJA7psuawuBdCCfPYGzvcHStGZSBm02efa2L+bzWQiBaizT8/btGWw2chkojegNaR/adPiZJbheWfSG1Dbab91Zway/YgoCr3/LN6A8xpg7xNAMcgaYOtlBsUga4CtlxkUg6wBtv4Xo3kVGOD+5tAAAAAASUVORK5CYII=                                                                 |
      | BC       | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABi0lEQVRYR+2VO0/CUBSAD0s7WJwRR5+bg5oYf4AOoInoYPyBxkExURh095HwB0BxFEoCmtguZdGcJqe5vS2l4Qg25nRqenvb737nlWu22t+Q4SsngMzoiEGmQBCDYpBrgLtfclAMcg1w9/+fHLyt30PzpR0RslgswPFRCUzDjKx5Qw+uruvw3rFDa4flfVhbWUolN7VBBOx0bTg7rUDesvyPt17f4KZ2B/N5K/RcXTMNA04qZSguFPw9dNCkg6nkLEAVRLVC4Oury3BQ2ktlatRLbEC0elmtwdbmBuzubAOF1XHciNVJSNmAZIsM6sCTQP1aiB3XhfOLqp9fFEodeKaAcVWsV+SfAupVTPnW738ElZopQAwfQeI99sPB4DNUNDMNsW6Qfo69DfMRAfHC5pyZKk4qlFF9sGv3wLLmgoafZJnVZgjO84ahaYE/fHxuwMNTIzRl1NE3lUkSV8VxY46M0AG+HDeQpI++cTma2uC4D01rXQC5ZsWgGOQa4O6XHBSDXAPc/ZKDXIM/VD+HGICPqA0AAAAASUVORK5CYII= |
      | DEF      | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABLUlEQVRYR2O8cfPOf4ZBDBhHHUhh7IyGIIUByDAagqMhSGkIUKp/NA2OhiClIUCp/qGZBjdv3cVw49YdrJ7383FnUFdVxpDDp0daSoIhONCb4dev3wzLVqxj+PT5C1azrS1NGawsTFHksIYgyLJnz18wREUEMfDy8MA1HDtxmuHo8dMMfLw8GHK49CDb9vnLF7ADpSQlGHy93YiKfZIcCDIR5PA167YwiIgIgUOFnY0dbNGgcSDIMbCQRI7uQeVAbFE1qBz489dPhrXrt4KjFhbNQ8KB2HK+hpoKPEPAQh5bLkZWh5x7SM4kIM2DPgQHfRoc1Ll4UJeDg6omoWVdTHFVR1QlSSdFQ7O5RafAIcqa0RAkKpjwKBoNwdEQpDQEKNU/mgZHQ5DSEKBUPwCSacAYlWZThQAAAABJRU5ErkJggg==                                                                                                                             |

  @negative
  Scenario Outline: Set out of scope initials to <initials>
    When I set initials to "<initials>"
    Then initials is set to "<result>"
    Examples:
      | initials | result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
      | 1234     | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAB0UlEQVRYR+2VPUsDQRCGJ01SeGchKWJEFET8BQE/ei0SBaOF+APFQiNoUmilhVGIFqJgEmNpTBEsvGtyjTInc+xt9nbP7AVE9srdm513n3l3JtVsdb7gD38pI1CzOoagJkAwBA1BXQK68caDhqAuAd34/+HBgTeA45OaD2NnuwiZdCYExnFdODiswKfj+uuTtgX7e2WwLSv0H53z1u0F61ulDVhaXIgErSTIJp/J54YEdt97cFSpQjY75e/hh5fp9z9gt1yC/HTOXyNxjuMG4s9qF9Bsd0AmUiqQxGEC2/6hwRPEJCiSJUZxKG6zuO7H1W8bcHf/IBSNpOk/HmWkQFYcJr+8qgOusQKJyvzcLKwuF4KzRZbAi/DxGBC1TocpS0w/qg5ib04CZWTYso9EkEf9G4Gtl1c4rZ5LvRVV9tglHlUgWQM9K3rxJOz6phH52tnciZZY9FJljZpe8dpKIeThsQgkcXx7kQkkmo9Pz8K+ifuJEYzT00RiRe0ncYIqcTJfivpoogLj+AgT0stmp5HqYsoS0xgbeN5QdXA82daEP+ZE+xjAz2T+vEw6HZosIgvE9qDK7OPaNwJ1yRqChqAuAd1440FDUJeAbrzxoC7Bb2Srxhg/WPQwAAAAAElFTkSuQmCC                                                                 |
      | ABCD     | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACAElEQVRYR+2Wz0tCQRDHx4tetEN4MAMz+g1FhxL6ceqiBy3IOkR/YHQog9KDXrpFUAb9gLQMKsi8SJBe9FLMg3nsW3dXYx+hsB53d/Z95zPfmdVTKld+oI9/HiNQszqGoCZAMAQNQV0CuvHGg4agLgHd+MH2YPWzBkeZLASDw7CznQSf1+cA0mg24eAwA9+NZgeo9dUYrK3EhADp3la7be8PBfywv5eGgN/viFESPMsVoPRUAZ/XC7vpFIRHQkKBuL6ZjNt7FDc7PelYxwO0NxoO2UmzifKJSQVSUHQsAq9v77AwP9dBhM7wAkkIkmKpkLitVAJmpiZ6sqdUYPn5BfKFc4tc8eYO+I/h7SqBF5dXcF28tclTWcejkQ6qKqVSgZgtCkDv1etflhcT8Q1H5n8hyAvuCR+A+N8MZbu8tGiVtdVuwfFJzjIw6zWZQKR/ms0DW0pMWFSFbkKFBDHb+4dHh39Ea7IuFnWkawJltHiqKg+KxpNrAkUzii2DaDyIuphPyDUPqjJlOxtFqZqE9mg8udLFqg+yJaWPqs7LGgUHv2wOYgw/Hx1NIrqU7zKWMO7hU8eXmO5h7YBnyd8f1RqwrwxrK+lLQjTwItGbSELp43gRkpS9xaJnjr9D5m12fbD/zXQbov+xbwjqUjYEDUFdArrxxoOGoC4B3fi+9+AvKJ8OJ5U6mBgAAAAASUVORK5CYII= |

  @positive
  Scenario Outline: Get initials from name <name>
    When I set name to "<name>"
      And I set initials to empty
    Then initials is set to "<result>"
    Examples:
      | name                 | result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
      | Adam                 | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABW0lEQVRYR+2Vv0sDQRCFX5q95q7Qa9RWRAQtA/6obJIiUTBaiH+gpEgiaFIkjZ0IlgomGkuTFMHGNLlG2YUNFpsQ9gVy4Gx53Nx9983Mu0y70/1Bik9GAMnuiEFSIMSgGGQNsPUyg2KQNcDW/58ZHCdjVG8aGA6/cFEqYmN9jZVn6hdmsPP+gdt60zz06CCLw/1sugDvGi18j0ZQSiFJEpyfFRCogIZciEENdl2uYW93B3G8akyeFvPY3tpMB6Bub7N1b2YvjlfMLEZhiJNCbvmAdjk0iW3rw+MTnl9ecXVZMqDMoVvc6w9QqdWRzx1PWuq65gtJA7psuawuBdCCfPYGzvcHStGZSBm02efa2L+bzWQiBaizT8/btGWw2chkojegNaR/adPiZJbheWfSG1Dbab91Zway/YgoCr3/LN6A8xpg7xNAMcgaYOtlBsUga4CtlxkUg6wBtv4Xo3kVGOD+5tAAAAAASUVORK5CYII=                                                                                                                                                                                                                                             |
      | Oscar Wilde          | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACC0lEQVRYR+2Wy0tCQRTGjxvd6N4Moqg0IRFKoce+FlqQtYj+wGhRBqULbZEutMAHmIGPlExIba0b3RRz4Vzmjvc61lwwYdw5xzPznd935oyWaq3xDf/4Y5ECBd2RBAUBgiQoCYoSEM2XPSgJihIQzZ//Hux0e3AdjcFwNFJhLLqccHoSApvVpqwNR0O4uY1Dvz+Ai/MIOOx2DTjcI7Dth72d4BjU+3gS3lttOIuEwbXg1MQnEiSJ1XoDNtxrcBQ6UBJpwcfhQ/Csryrr2eccZJ5yQK/hSRhjCyPx/mAAl1dRcDjsmqIx11DgpKpIMhtH4SvLS2oxNN3PTg9sVusYJR5dXYG8JLpyYgmhizaTGG0/Egps+SFfLIFv06uxmdDNF0q69pK9dAXykhA/oUiKwb7Ty6u9NSGVzii/SaWziqVYgFFRdBPqCmQPNhoVrCAi5i6WgP3doEqJ7IWiCsUXDS2kiy7onSMkEAXhxWAPxO9oK9s6bL7pAvUspel3ul+QSD6q/YWWkjFE+nYap0ztQUKAplKvNzU9h+Oo/FpRRCceUsrMxBE2NcG/3GLcHHM97jVofbTHbi3GfT4vlMsVMBreps9B3BBtNJp7vDhL0bSXhN540stBvzp6L8uvBLJPGybzNua1CC/OnYNGc28W6/P/d2sW1KTFZlKXPShKUxKUBEUJiObLHhQl+ANBJSwnCUTMZwAAAABJRU5ErkJggg== |
      | Thomas Jeffrey Hanks | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABCklEQVRYR2O8cfPOf4ZBDBhHHUhh7IyGIIUByDAagqMhSGkIUKp/NA2OhiClIUCp/qGZBj9/+cKwbMU6hk+fv+ANAA01FQZfbzewmmMnTjNcvnKdISoiiIGXh4cBZoaUpARcDbJhP3/9ZFi7fitYKDjQm4GdjR2rXUSFICHLRh1IKCGPhuBoGsSTiwmVBNJSEqO5eGiUg5u37mJ49vzF4CyosdUKhIomutYkoNC7cesOg5+PO4O6qjI4ygfcgaC69+jx02DHsLOxMYQE+TCA6l0YoKsDCdU0tJQnqrFASwcQMnvUgYRCiJD8aAgSCiFC8qMhSCiECMmPhiChECIkPxqChEKIkPygD0EA7DvGGB/j3b8AAAAASUVORK5CYII=                                                                                                                                                                                                                                                                                                                                                         |

  @positive
  Scenario Outline: Check large checkbox
    When I check large checkbox
    Then profile is set to large

  @positive
  Scenario Outline: Set name to <name>
    When I set name to "<name>"
    Then name is set to "<name>"
    Examples:
      | name                    |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
# @ignore because of FE-1447
# | <> |