---
name: carbon-component-image
description: Carbon Image component props and usage examples.
---

# Image

## Import
`import Image from "carbon-sage/lib/components/image";`

## Source
- Export: `./components/image`
- Props interface: not found

## Props
No props metadata found.

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <Image m={3} height="700px" backgroundImage={`url("${flexibleSvg}")`}>
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
}
```


### As An Img

**Render**

```tsx
() => {
  return (
    <>
      <Image m={3} ml={8} alt="Example alt text" src={pointSvg} />
      <Image m={3} ml={5} size="200px" alt="Example alt text" src={brushSvg} />
      <Image m={3} size="300px" alt="Example alt text" src={collaborateSvg} />
    </>
  );
}
```


### With Hidden Prop

**Render**

```tsx
() => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Box width="20vw">
      <Button fullWidth onClick={() => setIsVisible((previous) => !previous)}>
        Toggle image visibility
      </Button>
      <Image
        width="100%"
        src={flexibleSvg}
        alt="Curvy line arrow"
        hidden={!isVisible}
      />
    </Box>
  );
}
```


### Custom Responsive Behaviour

**Render**

```tsx
() => {
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
}
```


### Decorative

**Render**

```tsx
() => {
  return <Image alt="" src={pointSvg} decorative />;
}
```


### Image With Position

**Render**

```tsx
() => (
  <Image
    m={3}
    height="700px"
    backgroundImage={`url("${flexibleSvg}")`}
    position="static"
  >
    <Box
      height="700px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4">
        Here is an example of Image with position static
      </Typography>
    </Box>
  </Image>
)
```

