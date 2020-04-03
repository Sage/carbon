Feature: Portrait default component
	I want to test Portrait default component

	Background: Open Portrait default component page
		Given I open "Portrait" component page

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

	# value which is rendering as src doesn't work properly for CI
	# ignored regression
	@ignore
	Scenario: Enable darkBackground checkbox for a Portrait component
		When I check darkBackground checkbox
		Then Portrait initials value is set to "DARK"

	# value which is rendering as src doesn't work properly for CI
	# ignored regression
	@ignore
	Scenario: Enable and disable darkBackground checkbox for a Portrait component
		Given I check darkBackground checkbox
		When I uncheck darkBackground checkbox
		Then Portrait initials value is set to "AZ"

	@positive
	Scenario: Set Portrait source to src
		When I select source to "src"
		Then Portrait source is set to "src"

	# src is rendering as img
	@ignore
	Scenario: Set Portrait source to gravatar
		Given I select source to "gravatar"
		When I set gravatar to "ABC"
		Then Portrait source is set to "https://www.gravatar.com/avatar/900150983cd24fb0d6963f7d28e17f72?s=60&d=blank"

	@positive
	Scenario Outline: Set Portrait src to <source>
		Given I select source to "src"
		When I set src to "<source>"
		Then Portrait src value is set to "<source>"
		Examples:
			| source                                                                                                                 |
			| https://photos.smugmug.com/Portfolio/Business-Portrait-Examples/i-qFTj2wW/0/1f8956e8/M/163-FCP%20Moriah%20Thomas-M.jpg |

	# value which is rendering as src doesn't work properly for CI
	# ignored regression
	@ignore
	Scenario Outline: Change Portrait initials to <initials>
		When I set initials to "<initials>"
		Then Portrait initials value is set to "<initials>"
		Examples:
			| initials |
			| KK       |
			| BC       |
			| DEF      |

	# src is rendering as img
	@ignore
	Scenario Outline: Set Portrait gravatar to <gravatar>
		Given I select source to "gravatar"
		When I set gravatar to "<gravatar>"
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
			| shape  |
			| circle |
			| square |

	@positive
	Scenario Outline: Set Portrait size to <size>
		When I select size to "<size>"
		Then Portrait size has "<sizeInPx>"
		Examples:
			| size | sizeInPx |
			| XS   | 24       |
			| S    | 32       |
			| M    | 40       |
			| ML   | 56       |
			| L    | 72       |
			| XL   | 104      |
			| XXL  | 128      |