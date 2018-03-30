# Zendesk Coding Challenge

Submitted by Jez Templeton

---

## Introduction

Hi! This is my submission for the Zendesk Coding Challenge.

Language being used is ES2016 (Javascript), and it's all made possible using [nodejs](https://nodejs.org). CLI framework provided by [Vorpal](https://vorpal.js.org/)

## Requirements

Node 8.10 or greater is required.

## Installation

`npm install`

## Usage

You can execute the cli.js script directly:

`./app.js`

or alternatively you can bootstrap it via npm:

`npm start`

This will bring you to a cli prompt:

`zendesk:`

## Commands

>At any time you can type `help` to get a list of possible commands.
>`exit` will exit the application.

### search

Search through the available datasets.

Syntax:
`search <dataset> <field> <query>`

Search on `<dataset>` for a `<field>` that matches `<query>`

For example:
`search users name veronica`
will search the users dataset for a user named Veronica.

### fields

List fields available for searching on a dataset, or all datasets if no dataset is provided.

Syntax:
`fields [dataset]`

For example:
`fields users`
will list all searchable fields on the users dataset.

## Testing

You can run all tests by running:

`npm run test`

You can additionally run eslint on the codebase using:

`npm run lint`
