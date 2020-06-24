# Carbon Documentation Style Guide
## Follow these guidelines when contributing documentation to the Carbon repository

### Contents

[Introduction](#introduction)

[What We Document](#what-we-document)
* [User Facing Documentation](#user-facing-documentation)
* [Release Notes and Changelog](#release-notes-and-changelog)
* [Request For Change (RFC)](#request-for-change-rfc)
* [README files](#readme-files)
* [Setup and Getting Started Guides](#setup-and-getting-started-guides)
* [Style Guides](#style-guides)
* [Other Internal Documentation](#other-internal-documentation)
  * [New Joiners Guide](#new-joiners-guide)
  * [Carbon Roadmap](#carbon-roadmap)
  
[Language and Grammar Style](#language-and-grammar-style)
* [Jargon](#jargon)
* [Abbreviations (including Acronyms)](#abbreviations-including-acronyms)
* [Capitalisation](#capitalisation)

[Text Formatting and Organisation](#text-formatting-and-organisation)
* [Code in text](#code-in-text)
  * [Code string example](#code-string-example)
  * [Code block example](#code-block-example)
* [Bullet points and numbered lists](#bullet-points-and-numbered-lists)
* [Tables](#tables)

[Use of Links](#use-of-links)
* [Linking to other sites](#linking-to-other-sites)
* [Linking to other documents](#linking-to-other-documents)

[Use of Images](#use-of-images)


### Introduction
This Documentation style guide describes what is documented in the Carbon repository and which format this takes to enable you to contribute documentation in line with the current styles. It includes:
- where documents live within the repository;
- which format is used for which purpose;
- language and grammar style;
- linking to other documents and sites;
- use of screenshots.

The [Google developer documentation style guide](https://developers.google.com/style) contains general guidelines for writing developer documentation.

### What We Document
We record a lot of information for many purposes aimed at a variety of audiences. This is spread over several different formats appropriate for their function.

#### User Facing Documentation
[Storybook](https://storybook.js.org) is an open-source tool for developing UI components in isolation for React. We use it to build our Carbon demo site and for testing our components. Documentation about each component is written in MDX format and is surfaced through the `Docs` tab in Storybook. MDX format enables the use of JavaScript XML (JSX) in Markdown (MD) documents, including the importing and rendering of components.

Presenting the documentation in MDX format allows us to showcase many examples and states of the components along with a description of how they work, code snippets and a list of prop types used. This helps users to visualise how they can use our components to build their web pages and their intended function. For some components, designer notes, guidance, hints and tips are also included.

The [Gatsby MDX reference guide](https://www.gatsbyjs.org/docs/mdx/) contains helpful information for writing pages in MDX.

#### Release Notes and Changelog
Historically, releasing a new version of Carbon was a manual process. The release notes were written and updated by each collaborator manually in the old `CHANGELOG.md` file. The significant number of changes from `v8` to `v9` due to not releasing often enough have made it difficult for users to upgrade. As a result, we moved to use [`semantic-release`](https://github.com/semantic-release/semantic-release) to allow us to release frequently.

Depending on the type of commit to the `master` branch, each subsequent successful build now automatically publishes a new version of Carbon in accordance with [Semantic Versioning](https://semver.org), generates the changelog and the release notes. Enter a succinct commit message in the correct format described in the [`semantic-release.md`](../rfcs/text/semantic-release.md) RFC and [`semantic-release`](https://github.com/semantic-release/semantic-release) will complete the process for you.

#### Request For Change (RFC)
When you want to propose a substantial change to Carbon, such as the addition of a new component or a breaking change, you need to submit an RFC. The core Carbon Team will discuss the RFC needs to incorporate design constraints and reach a consensus before it is progressed.

There is a [template](../rfcs/template.md) to guide you when writing an RFC. You can add other sections if appropriate. Use hyphens to separate words in the file name and save it as a `.md` file in the `carbon/rfcs/text` directory. If you need to add supporting images, save them in the `carbon/rfcs/images` directory.

#### README files
We write README files in MD format to tell collaborators about what Carbon and [Cypress.io](https://www.cypress.io) are, how collaborators can get started and where they can find further information or assistance.

The [Carbon README](../README.md) contains:
- a link to a more detailed 'Getting Started' guide;
- a link to the [contributing guide](../CONTRIBUTING.md) explaining how to contribute to the project;
- license information.

The [Cypress README](../cypress/README.md) contains:
- instructions of how to install and run Cypress;
- how to access test results;
- a link to the [testing styleguide](testing-styleguide.md) where a detailed explanation of how to write Cypress tests can be found.

The [RFCs README](../rfcs/README.md) provides detailed instructions of when and how to write an RFC. 

All README files are accessible through GitHub from their respective directories.

When writing a README file, consider:
- who your audience is;
- what useful information you want in there;
- if a table of contents is required;
- the [use of links](#use-of-links);
- the [use of images](#use-of-images).

Use hyphens to separate words in the file name and save it as a `.md` file in the relevant directory. If you need to add supporting images, save them in an `/images` directory within the same directory where you wish to store the README file. 

#### Setup and Getting Started Guides
Similar to a README, these guides are written in MD or MDX format. They contain more detailed information about how collaborators set up their [development environment](dev-environment-setup.md) and [get started](getting-started.stories.mdx) with developing their application using Carbon. These documents are stored in the `/docs` directory and accessible from GitHub.

#### Style Guides
We write various style guides to provide some consistency for collaborators to the Carbon project to follow. This helps to maintain a standard way of doing things so we have a limited set of methods, tools and styles adopted throughout the repository. They often contain ordered and concise instructions so users can follow and repeat them easily. This is particularly useful for people new to the project who seek some common guidelines.

Style guides are stored in the `/docs` directory. It is a living directory so it continuously changes, with new guides added and others amended or removed. 

When writing a style guide, consider:
- who your audience is and what prior understanding they have;
- if a glossary is required;
- formatting of [code in text](#code-in-text);
- the [use of links](#use-of-links);
- the [use of images](#use-of-images).

Use hyphens to separate words in the file name and save it as a `.md` file in the relevant directory. If you need to add supporting images, save them in an `/images` directory within the same directory where you wish to store the style guide.

#### Other Internal Documentation
Although not currently located in the Carbon repository, we have other documentation which may be useful to some contributors. This is located on the Frontend Engineering Sharepoint site and is only accessible to those on the Sage network. These documents are usually written in Microsoft (MS) Office application format and contain information pertinent to the core Carbon Team. Some noteworthy documents follow.

##### New Joiners Guide
This is an MS Word document that provides an overview of the Sage Business Cloud Accounting product department and the core Carbon Team.

##### Carbon Roadmap
This mainly takes the form of an MS Word document that details at a high-level the new features and improvements we want to implement over the forthcoming year. There is also an MS Excel document version that presents these as epics over a high-level timeline.

### Language and Grammar Style
We write our documentation in a conversational tone and in an active voice that makes it easy for the reader to understand and obtain the information that they need to contribute to Carbon. When adding your own documentation, use paragraphs to break up your content for ease of reading. Keep sentences short and concise to help with this.

#### Jargon
Avoid using jargon where possible, although this can be more difficult to do in technical documentation. Where particular terms must be used that your audience may not be familiar with, consider adding a Glossary at the beginning of the document below the Contents section.

#### Abbreviations (including Acronyms) 
When you are including an abbreviation that your audience may not be familiar with, define it the first time you mention it. Spell out the abbreviation then follow it with the abbreviation in parenthesis, for example "Request For Change (RFC)". Use the abbreviation for each subsequent occurrence.

Do not separate each letter within an abbreviation with a dot (.). If an abbreviation is used as a word, such as "config", do not put a dot at the end.

#### Capitalisation
Capitalise all proper nouns, organisations, products, applications, components and services.

### Text Formatting and Organisation
#### Code in text
Put code-related text in a code font by bounding the string in backticks (`) or, if adding a code block, use triple backticks (```) above and below the block. For example:
##### Code string example
Clone the carbon repository with command `git clone git@github.com:Sage/carbon.git`
##### Code block example
Use the assertStyle method to test that all of the CSS properties in the parameters have been applied:
```
describe('FlatTableRow', () => {
  it('then the element should have proper outline when focused', () => {
      assertStyleMatch({
        outline: `2px solid ${baseTheme.colors.focus}`,
        outlineOffset: '-1px'
      }, wrapper, { modifier: ':focus' });
    });
});
```
#### Bullet points and numbered lists
When you have three or more points you want to highlight, use a list. If the order of items you want to list is important then use a numbered list, else use a bullet pointed list.

#### Tables
If you want to lay out information where each item has more than one piece of data, use a table. A glossary, for instance, can be neatly presented in a table. One benefit of using a table rather than a description list with a heading and an explanation, especially when there are many rows, is that when viewed in GitHub the rows are zebra-striped which makes reading it easier.

### Use of Links
You can use links to third-party sites and other documents in this repository in your own document to avoid duplication of information, unless the details you wish to refer to are short. Ensure the links are correct by trying them from your branch via GitHub.

#### Linking to other sites
Before adding a link to a third-party site, ensure that the site is trustworthy and the link is reliable. Link to the most relevant page containing the information you are referring to.

To include a link in your document, bound the text in which you want to contain the link in square brackets with the URL directly after it in parenthesis. For example:

  The `[Cypress documentation](https://docs.cypress.io/api/commands/focused.html#Syntax)` contains information about the function used to find which DOM element is focussed.

When formatted, it looks like this:

  The [Cypress documentation](https://docs.cypress.io/api/commands/focused.html#Syntax) contains information about the function used to find which DOM element is focussed.

#### Linking to other documents
To link to other documents in the Carbon repository, use a relative path to make the links less brittle. This enables them to continue to work when viewing the document in a branch other than, say, master. For instance, to add a link from a file located in the `carbon/docs` directory to the `CONTRIBUTING.md` guide in the top level `carbon` directory, include a link like this:

Refer to the `[CONTRIBUTING.md](../CONTRIBUTING.md)` guide when logging an issue.

Do not use an absolute path like this:

  Refer to the `[CONTRIBUTING.md](https://github.com/Sage/carbon/blob/master/CONTRIBUTING.md)` guide when logging an issue.

Anyone attempting to navigate to this link whilst on a working branch would encounter a '404 Page Not Found' error.

### Use of Images
Images and screenshots can be useful to support written content and provide further visual explanation of what the reader should expect. However, they should not replace what you are trying to convey in the text. Do not include screenshots of code blocks, text or terminal output. These should be included as text and formatted as necessary.

To include images stored elsewhere in the Carbon repository, use a relative path to the image as described in the [Linking to other documents](#linking-to-other-documents) section. If there are no images already in an `/images` directory within the directory where you wish to store them, create one to keep them stored separately from the text documents. It helps to keep the directories organised as they grow.