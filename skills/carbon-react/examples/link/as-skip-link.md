# Link: As Skip Link

```tsx
import Link from "carbon-react/lib/components/link";

export const LinkAsSkipLinkExample = () => {
  return (
    <>
      <Link href="#main-content" isSkipLink />
      <nav aria-label="Primary navigation">
        <Link href="/products">Products</Link>{" "}
        <Link href="/support">Support</Link>
      </nav>
      <main id="main-content" tabIndex={-1}>
        <h2>Main content</h2>
        <p>The skip link moves focus directly to this content.</p>
      </main>
    </>
  );
};
```
