# Image: Decorative

```tsx
import Image from "carbon-react/lib/components/image";

export const ImageDecorativeStoryExample = () => {
  const imageSrc =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23CCD6DB'/%3E%3Ccircle cx='100' cy='60' r='32' fill='%23007E45'/%3E%3C/svg%3E";

  return <Image alt="" src={imageSrc} decorative />;
};
```
