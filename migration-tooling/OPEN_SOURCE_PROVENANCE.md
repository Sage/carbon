# Open-source provenance

The migration package uses these declared and root-lock-resolved dependencies:

- `jscodeshift`: declared `^17.4.0`, resolved `17.4.0`, license `MIT`
- `semver`: declared `^7.5.4`, resolved `7.7.4`, license `ISC`
- `recast`: resolved `0.23.11`, license `MIT`

Recast is the transform engine used by jscodeshift to parse and print customer
JavaScript and TypeScript. Declared ranges are authoritative in the migration
package metadata; resolved versions and licenses are authoritative in the root
`package-lock.json`. Maintainer validation binds this evidence to both sources
and fails when it becomes stale.

No upstream transformation source was copied into the package. Phase 0
architecture research used Material UI, Next.js, Storybook, React, Angular,
and Cargo as design precedents only. Dependency or copied-source changes
require a new security, license, notice, maintenance, Node compatibility,
package-size, and performance review.
