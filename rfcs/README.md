# Carbon RFCs

Many changes, including bug fixes and documentation improvements, can be
implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are "substantial", and we ask that these be put
through a bit of a design process and produce a consensus among the Carbon
core team.

The "RFC" (request for comments) process is intended to provide a
consistent and controlled path for new features to enter the project.

[Active RFC List](https://github.com/Sage/carbon/pulls?q=is%3Apr+is%3Aopen+label%3A%22RFC%22)

Carbon is still **actively developing** this process, and it will still change as
more features are implemented and the community settles on specific approaches
to feature development.

## When to follow this process

You should consider using this process if you intend to make "substantial"
changes to Carbon or its documentation. Some examples that would benefit
from an RFC are:

   - A new component
   - The removal of a component that has been shipped
   - Breaking changes to the interface/props of a component
   - The addition of runtime exceptions
   - Changes to the way Carbon is imported
   - Changes to the way Carbon is built

The RFC process is a great opportunity to get more eyeballs on your proposal
before it becomes a part of a released version of Carbon. Quite often, even
proposals that seem "obvious" can be significantly improved once a wider
group of interested people have a chance to weigh in.

The RFC process can also be helpful to encourage discussions about a proposed
feature as it is being designed, and incorporate important constraints into
the design while it's easier to change, before the design has been fully
implemented.

Some changes do not require an RFC:

  - Rephrasing, reorganising or refactoring Carbon internals
  - Addition or removal of warnings
  - Additions or modifications that don't change the external Carbon interface
  - Additions only likely to be _noticed by_ other implementors-of-Carbon,
  invisible to users-of-Carbon.

## What the process is

In short, to get a major feature added to Carbon, one usually first gets
the RFC merged into the repo as a markdown file. At that point the RFC
is 'active' and may be implemented with the goal of eventual inclusion
into Carbon.

* Fork the repo – http://github.com/sage/carbon
* * If you have access, you may clone the repo and submit a PR from a branch.
* Copy `rfcs/template.md` to `rfcs/text/my-feature.md` (where 'my-feature' is descriptive).
* Fill in the RFC. Put care into the details: **RFCs that do not
present convincing motivation, demonstrate understanding of the
impact of the design, or are disingenuous about the drawbacks or
alternatives, tend to be poorly-received**.
* Submit a pull request. The RFC will receive design
feedback from the larger community, and the author should be prepared
to revise it in response.
* Build consensus and integrate feedback. RFCs that have broad support
are much more likely to make progress than those that don't receive any
comments.
* Eventually, the team will decide whether the RFC is a candidate
for inclusion in Carbon.
* RFCs that are candidates for inclusion in Carbon will enter a "final comment
period" lasting 3 calendar days. The beginning of this period will be signaled with a
comment and tag on the RFC's pull request.
* An RFC can be modified based upon feedback from the team and community.
Significant modifications may trigger a new "final comment period".
* An RFC may be rejected by the team after public discussion has settled
and comments have been made summarising the rationale for rejection. A member of
the team should then close the RFC's associated pull request.
* An RFC may be accepted at the close of its final comment period. A team
member will merge the RFC's associated pull request, at which point the RFC will
become 'active'.

## The RFC life-cycle

Once an RFC becomes active, then authors may implement it and submit the
feature as a pull request to the Carbon repo. Becoming 'active' is not a rubber
stamp, and in particular still does not mean the feature will ultimately
be merged; it does mean that the Carbon core team has agreed to it in principle
and are amenable to merging it.

Furthermore, the fact that a given RFC has been accepted and is
'active' implies nothing about what priority is assigned to its
implementation, nor whether anybody is currently working on it.

Modifications to active RFCs can be done in followup PRs. We strive
to write each RFC in a manner that will reflect the final design of
the feature; but the nature of the process means that we cannot expect
every merged RFC to actually reflect what the end result will be at
the time of the next major release; therefore we try to keep each RFC
document somewhat in sync with the language feature as planned,
tracking such changes via followup pull requests to the document.

## Implementing an RFC

The author of an RFC is not obligated to implement it. Of course, the
RFC author (like any other developer) is welcome to post an
implementation for review after the RFC has been accepted.

If you are interested in working on the implementation for an 'active'
RFC, but cannot determine if someone else is already working on it,
feel free to ask (e.g. by leaving a comment on the associated issue).

## Reviewing RFCs

Every two weeks the Carbon core team will attempt to review some set of open RFC pull requests.

Every accepted feature should have a Carbon core team champion, who will represent the feature and its progress.

**Carbon's RFC process owes its inspiration to the [React RFC process], [Yarn RFC process], [Rust RFC process], and [Ember RFC process]**.

[React RFC process]: https://github.com/reactjs/rfcs
[Yarn RFC process]: https://github.com/yarnpkg/rfcs
[Rust RFC process]: https://github.com/rust-lang/rfcs
[Ember RFC process]: https://github.com/emberjs/rfcs
