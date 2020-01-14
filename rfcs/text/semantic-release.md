- Start Date: 2019-11-28

# Table of contents

- [Summary](#summary)
- [Basic example](#basic-example)
- [Motivation](#motivation)
- [Detailed design](#detailed-design)
  - [Subject](#subject)
  - [Body](#body)
  - [Footer](#footer)
  - [Reverting a Release](#reverting-a-release)
  - [Release Notes](#release-notes)
  - [Maintenance Releases](#maintenance-releases)
- [Drawbacks](#drawbacks)
- [Alternatives](#alternatives)
- [Adoption strategy](#adoption-strategy)
- [How we teach this](#how-we-teach-this)
  - [Learning Git](#learning-git)
    - [Atomic Commits](#atomic-commits)
      - [Don’t push your work until you’re happy with it](#dont-push-your-work-until-youre-happy-with-it)
      - [Examples](#examples)

# Summary

We, the Carbon team, want to move to a continuous delivery approach. We have identified [`semantic-release`](https://github.com/semantic-release/semantic-release) as a suitable
choice.

# Basic example

https://semantic-release.gitbook.io/semantic-release/

# Motivation

The number of changes included between `v8` and `v9` were substantial. It has become difficult for users to upgrade due
to the number of changes. This is due to not releasing fast enough for the throughput of the team.

We want to release more frequently, so users can receive features faster and make small incremental upgrades. This will make
breaking changes less of an issue for our consumers.

# Detailed design

We will use [`semantic-release`](https://github.com/semantic-release/semantic-release) to publish our package.
- typically we will release from `master`
- every commit to `master` may trigger a release depending upon the commit message
- a merge commit will trigger **ONE** release, even if it has multiple features within
- a machine user `carbonci` will publish the release to GitHub releases and [NPM](https://www.npmjs.com/)
- `carbonci` will comment on all PR's stating the version that the changes are included in
- `carbonci` will comment on all referenced issues stating the version that the issue was fixed in

We will use the [`conventional-commits`](https://www.conventionalcommits.org/en/v1.0.0/) commit message format.
- we will use the `conventionalcommits` preset for [`@semantic-release/commit-analyzer`](https://github.com/semantic-release/commit-analyzer)
> The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with [SemVer](https://semver.org/), by describing the features, fixes, and breaking changes made in commit messages.
>
> The commit message should be structured as follows:
> ```
><type>[optional scope]: <description>
>
>[optional body]
>
>[optional footer(s)]
>```
> The commit contains the following structural elements, to communicate intent to the consumers of your library:
>
> 1. **fix:** a commit of the *type* `fix` patches a bug in your codebase (this correlates with [`PATCH`](https://semver.org/) in semantic versioning).
> 1. **feat:** a commit of the *type* `feat` introduces a new feature to the codebase (this correlates with [`MINOR`](https://semver.org/) in semantic versioning).
> 1. **BREAKING CHANGE:** a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with [`MAJOR`](https://semver.org/) in semantic versioning). A BREAKING CHANGE can be part of commits of any *type*.
> 1. *types* other than `fix:` and `feat:` are allowed, for example [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the the [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recommends `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.
> 1. footers other than `BREAKING CHANGE: <description> `may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).
>
> Additional types are not mandated by the conventional commits specification, and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE).
>
> A scope may be provided to a commit’s type, to provide additional contextual information and is contained within parenthesis, e.g., `feat(parser): add ability to parse arrays`.  
> [[Source]](https://www.conventionalcommits.org/en/v1.0.0/)

> ## Subject
> The subject contains a succinct description of the change:
>
> * use the imperative, present tense: "change" not "changed" nor "changes"
> * don't capitalize the first letter
> * no dot (.) at the end
> ## Body
> Just as in the *subject*, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.
>
> ## Footer
> The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.
>
> **Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.  
> [[Source]](https://github.com/angular/angular/blob/2089727db988c8d3336e06c10fc75049565305ad/CONTRIBUTING.md#commit)

We will use [`commitlint`](https://github.com/conventional-changelog/commitlint) and [`husky`](https://github.com/typicode/husky) to check our commits against the `conventionalcommits` guidelines.
- [`husky`](https://github.com/typicode/husky) will manage the git commit hooks defined in `package.json`
- we will write a hook that runs the commit message via [`commitlint`](https://github.com/conventional-changelog/commitlint)
- we will use the [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) config
- [`husky`](https://github.com/typicode/husky) will abort the commit if the commit message is in the wrong format

We will use [`commitizen`](https://github.com/commitizen/cz-cli) to help write commit messages
- we will use the [`cz-conventional-changelog`](https://github.com/commitizen/cz-conventional-changelog) config
- users can choose to write commit messages with the regular `git` CLI or in their IDE still
- users can launch [`commitizen`](https://github.com/commitizen/cz-cli) with `npm run commit`
- If a commit message is discarded by `husky` e.g. if we run the tests in the `pre-commit` hook and they fail; the 
developer can use `npm run commit -- --retry` to retry with the same commit message. If configured correctly, `husky` will
never reject a commit message written by `commitizen`.

We will add [`probot/semantic-pull-requests`](https://probot.github.io/apps/semantic-pull-requests/) as a GitHub check.
This will prevent PR's being merged that do not follow the correct syntax.

## Reverting a Release
> If you have introduced a breaking bug in a release you have 2 options:
> * If you have a fix immediately ready, commit and push it (or merge it via a pull request) to the release branch
> * Otherwise, [revert the commit](https://git-scm.com/docs/git-revert) that introduced the bug and push the revert commit (or merge it via a pull request) to the release branch  
> 
> In both cases **semantic-release** will publish a new release, so your package users will get the fixed/reverted version.
>
> Depending on the package manager you are using, you might be able to un-publish or deprecate a release, in order to prevent users from downloading it by accident. For example, [NPM](https://www.npmjs.com/) allows you to [un-publish](https://docs.npmjs.com/cli/unpublish) [within 72 hours](https://www.npmjs.com/policies/unpublish) after release. You may also [deprecate](https://docs.npmjs.com/cli/deprecate) a release if you would rather avoid un-publishing.
>
> In any case **do not remove the Git tag associated with the buggy version**, otherwise **semantic-release** will later try to republish that version. Publishing a version after un-publishing is not supported by most package managers.  
> [[Source]](https://semantic-release.gitbook.io/semantic-release/support/faq#how-can-i-revert-a-release)

## Release Notes

In version 4.3.0, we introduced [`renogen`](https://github.com/DDAZZA/renogen) (a Ruby gem to allow us to write release notes as a collection of changes). Prior
to this, the release notes were written and updated by each collaborator manually in the old `CHANGELOG.md` file.

[`semantic-release`](https://github.com/semantic-release/semantic-release) has a package called [`@semantic-release/changelog`](https://github.com/semantic-release/changelog). When used in conjunction with [`@semantic-release/git`](https://github.com/semantic-release/git) and
[`@semantic-release/npm`](https://github.com/semantic-release/npm) it will maintain a changelog that is committed to git and published to [NPM](https://www.npmjs.com/). We will use this to help
communicate the features included in each release. The changelog will include the `TYPE`, `SCOPE` and `DESCRIPTION` from the commit messages. It
will not include the `BODY` but it will include a link to the relevant pull request.

## Maintenance Releases
The beta version of [`semantic-release`](https://github.com/semantic-release/semantic-release) includes extensive support for publishing a maintenance
release. There is a [detailed walk through](https://github.com/semantic-release/semantic-release/blob/916c2685c57f3490fb1e50afbf72ea8dce11e188/docs/recipes/maintenance-releases.md)
outlining many scenarios.

This functionality is not available in the latest stable release, however the beta has been evolving for in excess of a year.

**NOTE:** It is not possible to protect GitHub branches using a regex. For that reason the environment variables are only included on approved branches.
If you want to publish a maintenance release, an administrator should create the new branch, enable branch protection and add the environment variables to TravisCI.


# Drawbacks
- There is a learning curve to this new process
- Version numbers will increase substantially if we don't plan our interfaces carefully to prevent breaking changes. We
don't consider this to be a drawback, but we need to be aware about breaking changes. Previously we have bundled many
breaking changes into one release.
- Changelog format will change

# Alternatives
There are alternatives to [`semantic-release`](https://github.com/semantic-release/semantic-release) for automating the
release process, such as [`np`](https://github.com/sindresorhus/np).

However, there are no other known existing solutions for parsing commit messages to determine the next release's version number. This means someone has
to be involved in the release process to determine the version number. This is not sustainable and prone to errors.

# Adoption strategy

This RFC PR includes all necessary changes. If and when this RFC is accepted and merged, it will immediately start
releasing from the following branches `['+([0-9])?(.{+([0-9]),x}).x', 'master', 'next', 'next-major', {name: 'beta', prerelease: true}, {name: 'alpha', prerelease: true}]`  
[[Source]](https://github.com/semantic-release/semantic-release/blob/916c2685c57f3490fb1e50afbf72ea8dce11e188/docs/usage/configuration.md#branches) 
[[Source]](https://github.com/semantic-release/semantic-release/blob/916c2685c57f3490fb1e50afbf72ea8dce11e188/docs/usage/workflow-configuration.md#branches-properties)

Adding [`probot/semantic-pull-requests`](https://probot.github.io/apps/semantic-pull-requests/) is a manual step and
will have to be performed by a workspace administrator.

# How we teach this

The proposed tooling is well established in the JavaScript community. For Carbon, developers
 can use `npm run commit` to launch [`commitizen`](https://github.com/commitizen/cz-cli) which will guide them through the process.
![](./commitizen.svg)

| Type           | Description                                                                                                 | Release Type |
|----------------|-------------------------------------------------------------------------------------------------------------|--------------|
| `feat:`        | A new feature                                                                                               | minor        |
| `fix:`         | A bug fix                                                                                                   | patch        |
| `docs:`        | Documentation only changes                                                                                  | :x:          |
| `style:`       | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      | :x:          |
| `refactor:`    | A code change that neither fixes a bug nor adds a feature                                                   | :x:          |
| `perf:`        | A code change that improves performance                                                                     | patch        |
| `test:`        | Adding missing tests or correcting existing tests                                                           | :x:          |
| `build:`       | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         | :x:          |
| `ci:`          | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) | :x:          |
| `chore:`       | Other changes that don't modify src or test files                                                           | :x:          |
| `revert:`      | Reverts a previous commit                                                                                   | patch        |

Any of these types can trigger a `major` release by including `BREAKING CHANGE:` in the commit footer.

The commit types are defined in [@commitizen/conventional-commit-types](https://github.com/commitizen/conventional-commit-types) and the release behaviour is defined in [@semantic-release/commit-analyzer](https://github.com/semantic-release/commit-analyzer/blob/95a21dc7b09b7bff753d3d4a00e684b69a81df8c/lib/default-release-rules.js).

Please note that `improvement:` is **not** supported, there is an [open pull request](https://github.com/commitizen/conventional-commit-types/pull/16) to remove it from [`commitizen`](https://github.com/commitizen/cz-cli).

If we use [`git revert`](https://git-scm.com/docs/git-revert), we will use the [`--no-commit`](https://git-scm.com/docs/git-revert#Documentation/git-revert.txt---no-commit) flag (to prevent auto-generation of a commit message) and then use `commitizen` to write the commit message.

eg.
> revert(decimal): remove on change handler 
>
> The on change handler was implemented incorrectly and caused major regressions.  
> We're reverting this commit in favour of PR #1.
>
> This commit reverts #abcdef  
> - feat(decimal): add on change handler
>
>BREAKING CHANGE: decimal onChange prop has been removed

## Learning Git

It's important that developers have a good working knowledge of Git. Here are some recommended resources:

- [Atlassian Tutorials](https://www.atlassian.com/git/tutorials/what-is-version-control)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [Learn Git Branching](https://learngitbranching.js.org/)
- [GitHub Labs](https://lab.github.com/)

### Atomic Commits

> an atomic commit is an operation that applies a set of distinct changes as a single operation  
> [[Source]](https://en.wikipedia.org/wiki/Atomic_commit) 

Atomic commits help us create frequent small releases. It makes code review and cherry-picking/reverting commits easier.

Writing atomic commits may mean re-writing your **local** history before making a PR. It's worth reading both
[Atlassian rewriting history](https://www.atlassian.com/git/tutorials/rewriting-history) and [Git book rewriting history](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History).

> #### Don’t push your work until you’re happy with it
> One of the cardinal rules of Git is that, since so much work is local within your clone, you have a great deal of freedom to rewrite your history **locally**. However, once you push your work, it is a different story entirely, and you should consider pushed work as final unless you have good reason to change it. In short, you should avoid pushing your work until you’re happy with it and ready to share it with the rest of the world.  
> [[Source]](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)

> So, before you run `git rebase`, always ask yourself, “Is anyone else looking at this branch?” If the answer is yes, take your hands off the keyboard and start thinking about a non-destructive way to make your changes (e.g., the `git revert` command). Otherwise, you’re safe to re-write history as much as you like.  
> [[Source]](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

**IMPORTANT**
We want to avoid [fast-forward merges](https://git-scm.com/docs/git-merge#_fast_forward_merge), because they reduce the traceability of changes. So it's important that you re-write your history locally before creating a PR.
> Pull requests are merged using [the `--no-ff` option](https://git-scm.com/docs/git-merge#_fast_forward_merge), except for [pull requests with squashed or rebased commits](https://help.github.com/en/articles/about-pull-request-merges), which are merged using the fast-forward option.
> [[Source]](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/merging-a-pull-request)

#### Examples

> JIRA Ticket 1  
> Add keyboard support to all components
> 
> Bad:  
> feat: add keyboard support to all components
>
> Good:  
> feat(decimal): add keyboard support  
> feat(textbox): add keyboard support  
> feat(textarea): add keyboard support

In this example, we have broken the work into atomic commits, each of which can be [`cherry-pick`](https://git-scm.com/docs/git-cherry-pick)ed or [`revert`](https://git-scm.com/docs/git-revert)ed
without affecting another component.

> JIRA Ticket 2  
> fix keyboard and update styling
> 
> Bad:  
> feat: add keyboard support to all components
>
> Good:  
> fix(decimal): allow user to enter decimal separator  
> feat(decimal): style the input blue  
> feat(textarea): style the input blue

In this example we have created on PR with both fixes and features. This would trigger one `minor` release when merged.

> Better:  
> PR1 fix(decimal): allow user to enter decimal separator  
> PR2 feat(decimal): style the input blue  
> PR2 feat(textarea): style the input blue

As the bug fix in decimal is unrelated to the styling of the components, we could also create two pull requests.
This would result in one `patch` release for the decimal bug fix and one `minor` release for the new styling.

When tickets are going through QA it's possible that you will need to add more commits to your PR
this should follow the same philosophy. e.g.

> fix(decimal): allow user to enter decimal separator  
> **test(decimal): add test case for decimal separator**  
> **refactor(decimal): exit from loop early**  

These commits are dependant upon the first commit and would be of no value if they were cherry picked. This is acceptable because the PR as a whole is still atomic. This will cause one merge commit which is easy to identify and revert.
If you were to rebase/squash commits it would be difficult for the QA to check that the required changes have been made
without having to do another full review.

**It's not essential for our commits to be atomic immediately and it's likely that there will be teething issues. At a minimum each PR needs to have at least one `conventional commit` with the highest level of change included**
- If there is a BREAKING CHANGE there must be a `BREAKING CHANGE` commit
- If there is a new feature there must be a `feat` or a `BREAKING CHANGE` commit
- If there is a bug fix there must be a `fix`, `feat` or a `BREAKING CHANGE` commit
