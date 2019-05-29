Feature: Portrait component
  I want to test Portrait component

  Background: Open Portrait component page
  # typo in the word Portrait due to the typo in component name
    Given I open "Portait" component page

  @positive
  Scenario Outline: Change Portrait alt to <alt>
    When I set alt to "<alt>"
    Then Portrait alt on preview is set to "<alt>"
    Examples:
      | alt                     |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario: Enable darkBackground checkbox for a Portrait component
    When I check darkBackground checkbox
    Then Portrait component has darkBackground property

  @positive
  Scenario: Enable and disable darkBackground checkbox for a Portrait component
    When I check darkBackground checkbox
      And I uncheck darkBackground checkbox
    Then Portrait component has no darkBackground property

  @positive
  Scenario: Set Portrait source to src
    When I select source to "src"
    Then Portrait source is set to "src"

  @positive
  Scenario: Set Portrait source to gravatar
    When I select source to "gravatar"
      And I set gravatar to "ABC"
    Then Portrait source is set to "https://www.gravatar.com/avatar/900150983cd24fb0d6963f7d28e17f72?s=60&d=blank"  

  @positive
  Scenario Outline: Set Portrait src to <source>
    When I select source to "src"
      And I set src to "<source>"
    Then Portrait src value is set to "<source>"
    Examples:
      | source                  |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       | 

  @positive
  Scenario Outline: Change Portrait initials to <initials>
    When I set initials to "<initials>"
    Then Portrait initials value is set to "<result>"
    Examples:
      | initials | result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
      | A        | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAACtklEQVRoQ+2X3UuTYRjGL5fvbO5Im7qJOygsKl1j9EVllsPUwD4nNWltBWXYH6Q0qBYuUNkoZLE+lsYIo4g0mG1WJ6G41taB2cB9UeyFgaMY28FzHzw+O9l78Iz7/V2/e9f2VkUWv/7BJnpVCWDObQvDnAuGMCwMc5aAWGnOhP6DIwwLw5wlIFaaM6GitMRKi5XmLAGx0pwJFS1NvtIL4UW8Cs7KyXccPQyjYS/pUpEDPxz3YiUakyEbNBpcu3qJX+B4IgHX2CQkpYQtCgXW11O4Yr2IZp2WDJrUcGA6iLmPIexq3QFJkpBfb0PbHvT1dPEHnMlkMOp8gFQ6jXP9vTKw55FPfh8esqNGWUMCTWY4tBCB//k0VKqtGL7pgEKhwJ27Y1hb+41u83GYjAa+gN3jXkSjMRzYb0RX5zEZ7vXsO7x5+x6NDRo4bDTlRWI4Hv8Jl3tChrxut0KzrV6+Xl39Bec9t3xtG7RAp21ibpkEODATxNx8CDpdE2xWSxHUpGcK35aWycqLOfDGsuo9dRL72ov/aITDn+F7GiArL+bAhbLKt/HtIQeUSmWR4Ww2hxHnfaRSaXSbO2EytjNda+bAhbJS16qg17f8F2ZpeQXJZJKkvJgCbyyrcrWxLi+mwIWyqq+rw+WBsyWZvY+f4Ec8AUPbbvT1mMvNp+JzzIAz2SxGnS75u3mi4wgOHTSVvLkP8yG8nAkyLy9mwKFPEfifTcsPCbdu2KFW15YEzj9IjDhdyOVyTMuLGXChrHa2bsf5M6fLWj2f/wXCkS9My4sJcKGspOpqWC70Q9/SXBZw9HsME54p5H+7bYMD0Gkby/pcJYeYAFdyA9RnBTB14tTzhGHqxKnnCcPUiVPPE4apE6eeJwxTJ049TximTpx6njBMnTj1PGGYOnHqecIwdeLU8zad4b8fwKQcFrgz5AAAAABJRU5ErkJggg==                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
      | BC       | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAEjUlEQVRoQ+1Y/U9TZxR+SuktUECKbQGHDhFBBoqTb1DGls2vjSYT2XTqdBnJsmT7Yf/JvjKTuZhsGTMGGCEaNsMmWePQVJlgi6ACVokZ0tLNUOgXbZf3zbxSaKWUe9ldfd+feu8977nPc55zz3tOZcO3RgJ4hpaMEY5xtZnCMS4wmMJM4RiLAEvpGBN0ER2mMFM4xiLAUjrGBGVFi6U0S+kYiwBL6RgT9P9VpV0uN5RKDjKZTDAdVpTShktXYBocWgRGEa9AakoyklOSkZebg/zNuYiLi1sS9JTdDtPgMCatU7BZbZiZdULBKaBZmw6dVoOtRYXIytQt6edpBisi/EuPAdf7zUsCUKel4uCBBqStWRPS1u/3w9h3Hb2Xr8Ln84f1R5QuKy3BzupKxMfLl3xvKANBCKvVaWg+8Q7v3+v1Ytoxg9sjo7hi/ANej5cqdORQ4yKgxPZsWyf+nJik+zN0WrxYUgytVgOtRo25OT+stikMDd+ByXwTPr8fb+r3IW/TRukQno/EfPMWfrrwK7119HAjsjIzgoD2GH7Htb4B+p3WVJWhsqIU8jDpb7XZ8ODBBLaXFEdFlmwSReH5aNxuDz7/6ht6a89r9dhW/AL/eOKhFd+faUMgEEDZjm14+aWdUROJdKPohD1uDz77l7D+9d0oyM/jsbV2nIPFMg6VSoXm44fBKblIcUdtJzphk3kIP3f3IDFBieb3jiIhQcmD/eLkabhcLlRW7EBdbVXUJJazUTTCs04nyPdLKi8CAegb9iA353kem8Mxg5OnvqXXb+x9FYWF+cvBHbWtIITJGatKSuRBuD0eeDxeer1500bU7apGujotCORdy320dZyn99490kSr82osgQjLQc7axysQAJzOWThdblp9s9dlob6uBpnzmoaRMQs6OrvolhPHDkGrSV8NvuJWacf0DHqN1zBwY5AeNU2NeqzPXkeJ/f3oEU6dbqG/9ft3o6DgSTETk7kgCi9sPBYCbu/swtiYhZ7B5CwmixxFn375NebmfKitLkdNVbmYPHnfq0K4f8CM7osGyOVx+OTjD/hh4LuWVjyctGJtuhrHj70dtuEQMhKrQtjY14/fDL30aProw/d5/LfvjKLz/AV6XV9Xi/LSEiG5hfQlOmHS+7acaadK5mxYj6bGhiAgre3nYLk/DoWCw/69ryA/LzcsadJWkmK3q7YioukrlCPRCJNvk/S+ly4baTdFqvVbB/XYkP1cEA67/S/8cPZHWtHJKiragq1FW5Ch0fCdl81mxw3zEPoHTHR4WNixLSctBCFMyCiVTzooIAAyvD9eZJQjKUumoFCLVPOu7ou4d2886HFSUiJIL+7z+eh9JcfRfnx+e7ocssRWEMKhXkr6Y3I2Z+h0qCjdjuQU1VOxkapNVBwds2DSasP0tIPac5yCjpZkXCQDRriZOlLiKyIc6UuisSOtKZmjU1NTpPMXTzRE/us9klVYrMAwwmJFVip+mcJSUUIsHExhsSIrFb9MYakoIRYOprBYkZWKX6awVJQQCwdTWKzISsUvU1gqSoiF45lT+B/fMH4ro0/97wAAAABJRU5ErkJggg== |
      | DEF      | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADZElEQVRoQ+2a+U8TQRTHv0tbWhPK1QvkCPeRSoKES2xASqiCIiIqqGBA0fgHaYw/iESN4hUMISiHEok/EBM8IYCComIQoSWxCGI5zK5ZoLTb3YRC3HXmx/bNzPu+z5v3ZpKlBoeGl/EfDYoIljhtQljigEEIE8ISiwBJaYkBdZFDCBPCEosASWmJASVFi6Q0SWmJRYCktMSAkirNm9Ldz3rwtn/ALXilUgm9VgOdVgODQYfoqEhQFMWZJI13H8BqmxaUREfKDsCg1zG2Ix9G8aijS9C8yIhwlBQXctryCu7s6sbLV32CNosI2469lnwEBQa4ta+/3gjrlE3QWlXHyxEaYmBsh96PoLmlTdA8Ouh0sLiGYMEB/v6oqT7mtM7cr3lMTlkx8X0SvS9eY37+N+RyGQrNedhhTHLZkxVsTE5AQX6uRwEKhRw+Pj4ugmtPVULt58ctiKLg66vYuODAAH+cPV3FuZDdbsfDti58+jIGmUyGmuoKBAcFOtmzglOMSdhnMQsitp7w+bpqqNVqwXPXGwomzCeYXtixsID6hpv4YZ9BRHgYKo+WSlswQ2NoGM2t7YzQstJixMVErYiWHGFW2YVLV0Cf75ysdOzOyZS+4BuN9zE+PoH4uGgcKimSvuDW9ifo7x9k2lNd7UkXwfQPXP16Z2oKCvaYnM7+2rZEtx25wn0Vpqt/fGy0x4Lm1aLF7tTW0YU3fQOgW9m5M6uVnT3DdBVXKn3dOpZiTEauKZtTsCc1eaZsZGakbb3gW3eaMPZ1HLExUThcWuzVlC6ymKHapnIrShMcxHnpYSdsCuGLl69idnYOWRlpTrQkWaU/jn7GvaYWJqAH91uQmBDnVcL/1MVjcWkJDdduwzY9zTwmqirLV66HtGpJEab7bufjpxh8N8yIpC//7GuHRSx6wQ6HA1NWG75NTKLneS9mZn4y7SbPtAsZ6akuhUVUgmnv6ZfQ2rG4uITl5dWPgDTaYBQVmhEaondbRVnBdFAo6u9LiGucqChbWWdtH96yM+zOMZVKCZ1GA60uGCF6PZIS412CsnaeN97Dmy7YIwYR/snbh0WoaWM3LSJY5BEgKS1ygLzuE8K8IRK5ASEscoC87hPCvCESuQEhLHKAvO4TwrwhErkBISxygLzuE8K8IRK5wR9Jf5ErQ+a2OwAAAABJRU5ErkJggg==                                                                                                                                                                                                                                                                                                                                                                                                             |

  @positive
  Scenario Outline: Set Portrait gravatar to <gravatar>
    When I select source to "gravatar"
      And I set gravatar to "<gravatar>"
    Then Portrait gravatar value is set to "<result>"
    Examples:
      | gravatar | result                                                                        |
      | A        | https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661?s=60&d=blank |
      | BC       | https://www.gravatar.com/avatar/5360af35bde9ebd8f01f492dc059593c?s=60&d=blank |
      | DEF      | https://www.gravatar.com/avatar/4ed9407630eb1000c0f6b63842defa7d?s=60&d=blank |

  @positive
  Scenario Outline: Set Portrait shape to <shape>
    When I select shape to "<shape>"
    Then Portrait shape value is set to "<shape>"
    Examples:
      | shape    |
      | standard |
      | circle   |
      | leaf     |

  @positive
  Scenario Outline: Set Portrait size to <size>
    When I select size to "<size>"
    Then Portrait size value is set to "<size>"
    Examples:
      | size        |
      | extra-small |
      | small       |
      | medium-small|
      | medium      |
      | medium-large|
      | large       |
      | extra-large |  