```tsx
export const CustomColors: Story = () => {
  const [colour, setColour] = useState("#000000");
  const [bgColour, setBgColour] = useState("#A3CAF0");

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mb={1}>
        <Select
          name="foreground-color"
          id="foreground-color"
          label="Foreground Color"
          labelInline
          onChange={(e) => setColour(e.target.value)}
          value={colour}
        >
          <Option text="black" value="#000000" />
          <Option text="white" value="#FFFFFF" />
          <Option text="sagegreen" value="#007e45" />
        </Select>
        <Select
          name="background-color"
          id="background-color"
          label="Background Color"
          labelInline
          onChange={(e) => setBgColour(e.target.value)}
          value={bgColour}
        >
          <Option text="paleblue" value="#A3CAF0" />
          <Option text="palepink" value="#FD9BA3" />
          <Option text="palepurple" value="#B4AEEA" />
          <Option text="palegoldenrod" value="#ECE6AF" />
          <Option text="paleorchid" value="#EBAEDE" />
          <Option text="paledesert" value="#EBC7AE" />
          <Option text="paleturquoise" value="#AEECEB" />
          <Option text="palemint" value="#AEECD6" />
          <Option text="black" value="#000000" />
          <Option text="white" value="#FFFFFF" />
          <Option text="darkslategray" value="#2F4F4F" />
          <Option text="dimgray" value="#696969" />
          <Option text="gray" value="#808080" />
          <Option text="darkgray" value="#A9A9A9" />
          <Option text="silver" value="#C0C0C0" />
          <Option text="lightgray" value="#D3D3D3" />
          <Option text="gainsboro" value="#DCDCDC" />
          <Option text="whitesmoke" value="#F5F5F5" />
          <Option text="lightyellow" value="#FFFFE0" />
          <Option text="lemonchiffon" value="#FFFACD" />
          <Option text="lightgoldenrodyellow" value="#FAFAD2" />
          <Option text="moccasin" value="#FFE4B5" />
          <Option text="peachpuff" value="#FFDAB9" />
          <Option text="navajowhite" value="#FFDEAD" />
          <Option text="wheat" value="#F5DEB3" />
          <Option text="cornsilk" value="#FFF8DC" />
          <Option text="ivory" value="#FFFFF0" />
          <Option text="blue" value="#0000FF" />
          <Option text="mediumblue" value="#0000CD" />
          <Option text="darkblue" value="#00008B" />
          <Option text="navy" value="#000080" />
          <Option text="midnightblue" value="#191970" />
          <Option text="royalblue" value="#4169E1" />
          <Option text="steelblue" value="#4682B4" />
          <Option text="cadetblue" value="#5F9EA0" />
          <Option text="cornflowerblue" value="#6495ED" />
          <Option text="lightskyblue" value="#87CEFA" />
          <Option text="skyblue" value="#87CEEB" />
          <Option text="deepskyblue" value="#00BFFF" />
          <Option text="dodgerblue" value="#1E90FF" />
          <Option text="lightblue" value="#ADD8E6" />
          <Option text="lightsteelblue" value="#B0C4DE" />
          <Option text="slateblue" value="#708090" />
          <Option text="slateblue2" value="#6A5ACD" />
          <Option text="mediumslateblue" value="#7B68EE" />
          <Option text="blueviolet" value="#8A2BE2" />
          <Option text="mediumpurple" value="#9370DB" />
        </Select>
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="XS"
        />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="XS"
        />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait backgroundColor={bgColour} foregroundColor={colour} />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
        />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="L"
        />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="L"
        />
      </Box>

      <Typography>
        The following examples demonstrate using the design token approach
      </Typography>
      <Box mt={2} display="flex" flexDirection="row" gap={2}>
        <Portrait
          backgroundColor="var(--colorsSemanticFocus500)"
          foregroundColor="#FFFFFF"
        />
        <Portrait
          backgroundColor="#FFFFFF"
          foregroundColor="var(--colorsSemanticNegative600)"
        />

        <Portrait
          backgroundColor="var(--colorsUtilityYin090)"
          foregroundColor="var(--colorsLogo)"
        />
      </Box>
    </>
  );
};
```