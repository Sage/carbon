# Getting Your Dev Environment Started

This guide will provide you with the information you need to be able to get started on your development journey. This document will include:

- Which text editors can you install?
- What Tools/plugins you need to install?
- Installing Node.js, Node Version Manager (NVM), NPM, NPX, and Git

### Contents

[Text Editors](#Text-Editors)

[Useful Extensions to Install](#Useful-Extensions-to-Install)

[Installing Node.js, NVM, NPM, NPX, and Git](#Installing-Nodejs-NVM-NPM-NPX-and-Git)


## Text Editors

There are a number of various different text editors that you can install. Some of the most popular text editors used on the Carbon team are:
- Visual Studio Code (VS Code)
- Sublime Text Editor
- Atom

###### Please note that the list above in not exhaustive.

### VS Code

VS Code is our preferred text editor and is available to be downloaded from [here](https://code.visualstudio.com/). We advise that you follow the installation instructions provided by Microsoft. The VS Code installation instructions can be found [here](https://code.visualstudio.com/docs/setup/mac) for Mac users and [here](https://code.visualstudio.com/docs/setup/windows) for Windows users.

### Useful Extensions to Install

You can browse and install extensions from within VS Code. Simply bring up the Extensions view by clicking on the [Extensions icon](https://code.visualstudio.com/assets/docs/editor/extension-gallery/extensions-view-icon.png) in the Activity Bar on the side of VS Code or the View: Extensions command (⇧+⌘+X) on Mac or (shift+alt+x) on Windows.

To install an extension, click the Install button. Once the installation is complete, the Install button will change to the Manage gear button.

Below we have compiled a list useful extensions to complement our development work with the Carbon library.

#### Auto Close Tag

Automatically adds the closing tags for HTML and XML.

#### Auto Rename Tag

Automatically renames HTML and XML tags.

#### CodeSnap

CodeSnap lets you take screenshots of your code and save them to a clipboard.

#### Cucumber (Gherkin) Full Support

An extension to highlight syntax, autocomplete code and format your Cucumber code.

#### Debugger for Chrome

Debugs your JavaScript code in Chrome browser.

#### Debugger for Firefox

Debugs your JavaScript code in Firefox browser.

#### ESLint

A code quality tool that checks your code for syntax errors and can automatically fix the syntax errors.

#### GitLens

GitLens is a useful tool to help you see who made the last amendments to the code and the commit message that was provided.

#### HTML CSS Support

A popular extension used for CSS support in HTML files.

#### Rainbow Brackets

This extension helps with visualising brackets in VS Code by giving each pair of brackets their own specific colour.

#### React.js with Flow Types code snippets

Provides a library of code shortcuts and code snippets for React.

#### vscode-icons

This extension provides icons for each file type in VS Code

#### vscode-styled-components

This extension helps with the readability of the code for styled-components. The tool highlights syntax and reports any syntax errors in the code.


## Installing Node.js, NVM, NPM, NPX, and Git 

### Node.js

To check if you already have a version of node.js installed, simply go to your terminal or command line and use: `node -v` as this will inform you on the version of node.js currently have installed.

You can download and install the latest version of Node from [https://nodejs.org/](https://nodejs.org/), or use [Node Version Manager](https://github.com/creationix/nvm). 

### NVM

The NVM installation can be initiated by using this cURL command into your terminal or command line.

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash` 

or use [Node Version Manager](https://github.com/creationix/nvm).

### NPM

Once you have installed node.js, you should already have npm installed. This can be checked by typing `npm -v` in your terminal or command line. If you already have a version of npm installed, you will see a console output similar to this: `Version 6.23.0`

#### Already Have NPM Installed?

If you plan to use Carbon in your project, make sure you are on `Version 6.x`. This can be checked by using `npm -v` in your terminal or command line. 

If you already have npm installed but it is an older version, upgrade your version of npm by running `npm install npm -g` in your terminal or command line.

### NPX

To install npx, simply type `npm install -g npx` in to your terminal or command line. To check that npx has installed successfully, you can check the version by using `npx -v` in your terminal or command line.

If you receive the error:

````
checkPermissions Mising write access to '/usr/local/lib/node_modules'
code EACCES
suscall ACCESS
...
````
this command should resolve the issue.

`sudo chown -R $USER /use/local/lib/node_modules`

This command will run as the system's super user and change the owner of the folder or file to the current user. Using `-R` ensures that you also get owner access to all the files container in the folder.

### Git

To find out if you already have a version of Git installed on your machine, simply run 
`git --version` in your terminal or command line. If you have Git installed, you will receive a console output similar to this: `git version 2.23.0`

If you do not have Git already installed, you can download the latest version of Git from [here](https://git-scm.com/downloads).

#### New to Git?

If you are new to Git, it can be a little overwhelming at first. Luckily there are a lot of dedicated information and training for Git. Atlassian have an easy to understand and informative article that explains the workflow of Git. This can found [here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). PluralSight also offer excellent training courses ranging from beginner to advanced users. A good place to start is with the [How Git Works](https://app.pluralsight.com/library/courses/how-git-works/table-of-contents) training course. This will start you off with the very basic principles of Git.

#### Git Alias

You need to add the following to ~/.gitconfig
````
[alias]
        pr = "!f() { git fetch -fu ${2:-origin} refs/pull/$1/head:pr/$1 && git checkout pr/$1; }; f"
        pr-clean = "!git checkout master ; git for-each-ref refs/heads/pr/* --format=\"%(refname)\" | while read ref ; do branch=${ref#refs/heads/} ; git branch -D $branch ; done"
````
This allows you to review PRs very easily. For example, if you are reviewing [https://github.com/Sage/carbon/pull/2408/](https://github.com/Sage/carbon/pull/2408/), you can use `git pr 2408` which will check out a new branch named pr/2408. This gives you the ability to review, change branches, merge and make experimental changes. The second command `git pr-clean` removes all branches that start with pr/. This is a useful for housekeeping of branches.

#### GPG Verification

We encourage our contributors to verify their commits with a GPG key. Follow these instructions to enable GPG commit signing: [https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/managing-commit-signature-verification](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/managing-commit-signature-verification)

Then add this to your profile (i.e`~/.zshrc` or `~/.bashrc`) so `gpg-agent` can prompt for your passphrase:

`export GPG_TTY=$(tty)`

Then execute this command to sign all of your commits by default:

`$ git config --global commit.gpgsign true`
