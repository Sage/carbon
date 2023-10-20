# Getting Your Dev Environment Started

This guide will provide you with the information you need to be able to get started on your development journey.

## Contents

- [Text Editor](#text-editor)
- [Useful VSCode Extensions to Install](#useful-vscode-extensions-to-install)
- [Installing Node.js, NPM, and Git](#installing-nodejs-npm-and-git)

## Text Editor

[VSCode](https://code.visualstudio.com/) is our preferred text editor. We advise that you follow the installation instructions provided by Microsoft. Installation instructions can be found [here](https://code.visualstudio.com/docs/setup/mac) for Mac users and [here](https://code.visualstudio.com/docs/setup/windows) for Windows users.

## Useful VSCode Extensions to Install

You can browse and install extensions from within VS Code. Simply bring up the Extensions view by clicking on the [Extensions icon](https://code.visualstudio.com/assets/docs/editor/extension-gallery/extensions-view-icon.png) in the Activity Bar on the side of VS Code or the `View: Extensions command` (⇧+⌘+X) on Mac or (shift+alt+x) on Windows.

Below are some useful extensions that we recommend using with Carbon:

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) - automatically adds the closing tags for HTML and XML.
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) - automatically renames HTML and XML tags.
- [CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap) - lets you take screenshots of your code and save them to a clipboard.
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - basic spelling checker that works well with many file types. There is an [additional extension for getting the British English dictionary](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-british-english).
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - a code quality tool that checks your code for syntax errors and can automatically fix the syntax errors.
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - provides a list of complementary features for use with git repositories, such as in-editor file annotations identifying who changed a line of code last.
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) - linter and style checker for markdown files.
- [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx) - official extension for supporting MDX files.
- [Package Json Upgrade](https://marketplace.visualstudio.com/items?itemName=codeandstuff.package-json-upgrade) - adds in-editor file annotations to `package.json` stating if an installed package has a newly available version.
- [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) - for running Playwright tests directly within VSCode.
- [Total TypeScript](https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator) - provides human-readable hints for TypeScript errors that are difficult to decipher.
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components) - this extension helps with the readability of the code for styled-components. The tool highlights syntax and reports any syntax errors in the code.

## Installing Node.js, NPM, and Git

### Node.js & NPM

**NOTE: Carbon requires all contributors be on Node version 20 ("iron").**

The recommended way to install Node and npm is using [Node Version Manager (`nvm`)](https://github.com/nvm-sh/nvm).
Once you have installed nvm, you should run:

```sh
nvm install lts/iron
```

which will install the correct version of Node and npm. You can verify the installed versions using `node --version` and `npm --v`.

> If you are already a `nvm` user, you can also do `nvm use` which will automatically switch to the correct Node and npm versions.

### Git

To find out if you already have a version of Git installed on your machine, simply run
`git --version` in your terminal or command line. If you have Git installed, you will receive a console output similar to this: `git version 2.23.0`

If you do not have Git already installed, you can download the latest version of Git from [here](https://git-scm.com/downloads).

#### New to Git?

If you are new to Git, it can be a little overwhelming at first. Luckily there are a lot of dedicated information and training for Git. Atlassian have an easy to understand and informative article that explains [the Feature Branch workflow.](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

Pluralsight also offers excellent training courses ranging from beginner to advanced users. A good place to start is with the [How Git Works](https://app.pluralsight.com/library/courses/how-git-works/table-of-contents) training course. This will start you off with the very basic principles of Git.

#### Git Alias

You need to add the following to `~/.gitconfig`:

```shell
[alias]
        pr = "!f() { git fetch -fu ${2:-origin} refs/pull/$1/head:pr/$1 && git checkout pr/$1; }; f"
        pr-clean = "!git checkout master ; git for-each-ref refs/heads/pr/* --format=\"%(refname)\" | while read ref ; do branch=${ref#refs/heads/} ; git branch -D $branch ; done"
```

This allows you to review PRs very easily. For example, if you are reviewing [https://github.com/Sage/carbon/pull/2408/](https://github.com/Sage/carbon/pull/2408/), you can use `git pr 2408` which will check out a new branch named pr/2408. This gives you the ability to review, change branches, merge and make experimental changes. The second command `git pr-clean` removes all branches that start with pr/. This is a useful for housekeeping of branches.

#### GPG Verification

We strongly encourage our contributors to verify their commits with a GPG key. To set this up, please follow these instructions from GitHub [to enable GPG commit signing](https://docs.github.com/en/authentication/managing-commit-signature-verification).

Then add this to your profile (i.e`~/.zshrc` or `~/.bashrc`) so `gpg-agent` can prompt for your passphrase:

`export GPG_TTY=$(tty)`

Then execute this command to sign all of your commits by default:

`$ git config --global commit.gpgsign true`

Restart of gpg-agent may be required. Use the command below to kill it (it will start next time its needed):

`$ gpgconf --kill gpg-agent`
