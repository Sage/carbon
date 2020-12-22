Feature: Portrait default component
	I want to test Portrait default component

	@positive
	Scenario Outline: Change Portrait alt to <alt>
		When I open default "Portrait Test" component in noIFrame with "portrait" json from "commonComponents" using "<nameOfObject>" object name
		Then Portrait alt on preview is set to <alt>
		Examples:
			| alt                          | nameOfObject        |
			| mp150ú¿¡üßä                  | altOtherLanguage    |
			| !@#$%^*()_+-=~[];:.,?{}&"'<> | altSpecialCharacter |