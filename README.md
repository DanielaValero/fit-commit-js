[![Build Status](https://travis-ci.org/DanielaValero/fit-commit-js.svg)](https://travis-ci.org/DanielaValero/fit-commit-js)
[![Dependency Status](https://david-dm.org/DanielaValero/fit-commit-js.svg)](https://david-dm.org/DanielaValero/fit-commit-js)
[![Code Climate](https://codeclimate.com/github/DanielaValero/fit-commit-js/badges/gpa.svg)](https://codeclimate.com/github/DanielaValero/fit-commit-js)

# Fit commit js

A node version of [fit-commit](https://github.com/m1foley/fit-commit) by [Mike Foley](https://github.com/m1foley)

It creates a git commit hook that will be run each time you do a commit for your repo, it will validate that the commit message follows the guidelines you've set up for your project.

# Table of contents
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Fit commit js](#fit-commit-js)
- [Table of contents](#table-of-contents)
- [Why to validate commits and reasons behind each rule](#why-to-validate-commits-and-reasons-behind-each-rule)
- [Installation and Configuration](#installation-and-configuration)
- [Available Validators](#available-validators)
- [Sample of config file](#sample-of-config-file)
- [Black list of words for the subject](#black-list-of-words-for-the-subject)
- [Guidelines to contribute](#guidelines-to-contribute)
- [Supported config files](#supported-config-files)

<!-- /TOC -->

# Why to validate commits and reasons behind each rule

We all want always to become better developers, in order to do so, we need to learn new things every day. One of the strategies to learning and using new ways to work, is to understand the reasons behind them.

In order to get more insights behind why it is important to validate commit messages, and the whys behind each of the rules in this package, check out the [wiki in github](https://github.com/DanielaValero/fit-commit-js/wiki)

# Installation and Configuration

To install it run:

``
$ npm i fit-commit-js
``

Then you need to install the commit hook in your repo by doing:

``
$./node_modules/fit-commit-js/bin/fit-commit-js.js install
``

Then create your fitcomitjsrc.{yml, yaml, json} with your settings, and place it at the root of your project.

You can also add a section in your package.json called: "fitcommitjsConfig", and add there your settings.


# Available Validators

 - **Line length**
 Validates that the line length of the subject and content of the commit message is less or equal than the number you configure for it.

 Default value: 150

 - **Empty lines**
Validates that the lines you specify are empty.

 Default value: 1 (the line after the subject)

 - **Tags**
 Validates that your commit message contains within its content a tag categorizing the type of commit.

 Default Value: ''
 ie: feature, chore, bugfix, etc.

 - **Ticket code**
Validates that the commit message contains a ticket number

 Default Value: ''

 - **Tense of the subject**
Validates that tense of the subject is an imperative verb. It checks that the first word of the subject is not within the black list of verbs listed below.

 Default Value: N/A
 Checks against black list of words

 - **WIP (Work in progress)**
Ensures that work in progress is not merged into specified branch. It ensures that the commit message does not have the next words within its content:  
*'wip', 'rw', 'todo'*

 Default Value: N/A

 - **Capitalized subject**
Ensures that the subject is a capitalized sentence.

 Default Value: N/A

 - **Subject with a period**
Ensures that the subject ends with period

 Default Value: N/A

# Sample of configs
### Yaml

```
---
validators:
  lineLength:
    enabled: true
    maxLineLength: 72
    subjectMaxLength: 50
  ticketCode:
    enabled: true
    ticketCodeText: 'FITCOMMITJS-'
    oneTicketPerCommit: false
  emptyLines:
    enabled: true
    emptyLines: 1,3
  tags:
    enabled: true
    tags: bugfix, chore, feature
    lineOfTheTag: 4
  tenseSubject:
    enabled: true
  subjectPeriod:
    enabled: true
  capitalizedSubject:
    enabled: true
  wip:
    enabled: true
    branch: master
```

### Json

```
...
  "fitcommitjsConfig" : {
    "validators" : {
      "lineLength" : {
        "enabled" : true,
        "maxLineLength" : 72,
        "subjectMaxLength" : 50
      },
      "ticketCode" : {
        "enabled" : true,
        "ticketCodeText" : "FITCOMMITJS-",
        "oneTicketPerCommit" : false
      },
      "emptyLines" : {
        "enabled" : true,
        "emptyLines" : 13
      },
      "tags" : {
        "enabled" : true,
        "tags" : "bugfix, chore, feature",
        "lineOfTheTag" : 4
      },
      "tenseSubject" : {
        "enabled" : true
      },
      "subjectPeriod" : {
        "enabled" : true
      },
      "capitalizedSubject" : {
        "enabled" : true
      },
      "wip" : {
        "enabled" : true,
        "branch" : "master"
      }
    }
  }
...
```

# Black list of words for the subject

``
  'adds', 'adding', 'added',
  'allows', 'allowing', 'allowed',
  'amends', 'amending', 'amended',
  'bumps', 'bumping', 'bumped',
  'calculates', 'calculating', 'calculated',
  'changes', 'changing', 'changed',
  'cleans', 'cleaning', 'cleaned',
  'commits', 'committing', 'committed',
  'corrects', 'correcting', 'corrected',
  'creates', 'creating', 'created',
  'darkens', 'darkening', 'darkened',
  'disables', 'disabling', 'disabled',
  'displays', 'displaying', 'displayed',
  'drys', 'drying', 'dryed',
  'ends', 'ending', 'ended',
  'enforces', 'enforcing', 'enforced',
  'enqueues', 'enqueuing', 'enqueued',
  'extracts', 'extracting', 'extracted',
  'finishes', 'finishing', 'finished',
  'fixes', 'fixing', 'fixed',
  'formats', 'formatting', 'formatted',
  'guards', 'guarding', 'guarded',
  'handles', 'handling', 'handled',
  'hides', 'hiding', 'hid',
  'increases', 'increasing', 'increased',
  'ignores', 'ignoring', 'ignored',
  'implements', 'implementing', 'implemented',
  'improves', 'improving', 'improved',
  'keeps', 'keeping', 'kept',
  'kills', 'killing', 'killed',
  'makes', 'making', 'made',
  'merges', 'merging', 'merged',
  'moves', 'moving', 'moved',
  'permits', 'permitting', 'permitted',
  'prevents', 'preventing', 'prevented',
  'pushes', 'pushing', 'pushed',
  'rebases', 'rebasing', 'rebased',
  'refactors', 'refactoring', 'refactored',
  'removes', 'removing', 'removed',
  'renames', 'renaming', 'renamed',
  'reorders', 'reordering', 'reordered',
  'requires', 'requiring', 'required',
  'restores', 'restoring', 'restored',
  'sends', 'sending', 'sent',
  'sets', 'setting',
  'separates', 'separating', 'separated',
  'shows', 'showing', 'showed',
  'skips', 'skipping', 'skipped',
  'sorts', 'sorting',
  'speeds', 'speeding', 'sped',
  'starts', 'starting', 'started',
  'supports', 'supporting', 'supported',
  'takes', 'taking', 'took',
  'tests', 'testing', 'tested',
  'truncates', 'truncating', 'truncated',
  'updates', 'updating', 'updated',
  'uses', 'using', 'used'
``

# Guidelines to contribute
 - Use the ES2015 features [supported by node](https://nodejs.org/en/docs/es6/)
 - TDD with mocha, chai and sinon
 - Functional programming with ramda
 - Use javascript guidelines from [Airbnb](https://github.com/airbnb/javascript)
 - Allow spaces inside "(),{} and []"


# Supported config files
 - .fitcommitjsrc.json
 - .fitcommitjsrc.{yml,yaml}
 - .package.json with a key: fitcommitjsConfig
