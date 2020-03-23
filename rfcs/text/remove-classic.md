- Start Date: 2020-03-12

# Summary

The Carbon core team intend to drop support for the Classic theme.

# Motivation

The Design Language System (DLS) has replaced most if not all of our "Classic" components.

Currently we:
- support the classic props with the modern themes.
- support the classic props with the classic theme.

This makes the simplest of changes time consuming and complex. This is evident in the most basic components like 
`Button` where we have 13 props.

# Detailed design

1. We will remove all the classic examples from storybook as soon as possible.
1. We will remove classic components/props piecemeal. Each of these will be a `BREAKING CHANGE`.
1. When no components reference `classic` we can remove the theme.

This approach will provide immediate benefit to developers of Carbon.

# Drawbacks

- Many breaking changes will significantly increase the version number. This could be interpreted as a unstable
library.

# Alternatives

## `next` version

If we were to do a pre-release (`next`). We could batch many breaking changes together. However, this would be time
consuming and would make the upgrade path for our consumers more difficult (they would have to take many breaking changes
in one upgrade).

## Dropping Classic support immediately
If we were to delete the classic theme (`src/style/themes/classic`). We would have to remove any failing tests which
would result in a drop in code coverage. This is because we have branches such as `isClassic()`. In addition, there
would be many Classic props that would appear to do nothing. This would likely see an increase in support tickets. It's
inevitable that someone would re-add support for a Classic prop.  
This change would have a large surface area and would be high risk.

## Continuing to support Classic
Continuing to support the classic theme would require further time and effort. It would continue to slow development.
Supporting the classic theme results in fragmentation when compared to other products built with the DLS.

# Adoption strategy

Our advice will be consistent after this RFC is merged. "We only support modern DLS themes. We will not provide any 
bug fixes for classic components unless under extraordinary circumstances. We will review/merge v8 bug fixes
contributed by Sage employees that target v8.x.x. However, we strongly encourage these teams to upgrade to the latest
version".

# How we teach this

This RFC will be communicated in the Sage `#carbon` slack channel. Beyond that, it will be visible in the release notes
when consumers upgrade. This RFC document will reside in the repository for reference.

# Unresolved questions
None.
