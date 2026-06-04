```tsx
export const CustomResponsiveBehaviour: Story = () => {
  const query1 = useMediaQuery("(max-width: 1000px)");
  const query2 = useMediaQuery("(max-width: 900px)");
  const query3 = useMediaQuery("(max-width: 800px)");
  const responsiveProps = () => {
    if (query3) {
      return {
        backgroundSize: "contain",
        backgroundImage: `url("${pointSvg}")`,
        m: 1,
      };
    }
    if (query2) {
      return {
        backgroundSize: "30%",
        backgroundRepeat: "repeat",
        backgroundImage: `url("${brushSvg}")`,
      };
    }
    if (query1) {
      return {
        backgroundImage: `url("${collaborateSvg}")`,
        m: 3,
      };
    }
    return {
      backgroundImage: `url("${flexibleSvg}")`,
      m: 4,
    };
  };
  return (
    <Image {...responsiveProps()}>
      <Box
        height="700px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">
          Here is an example of some overlayed text
        </Typography>
      </Box>
    </Image>
  );
};
```