<div align="center">

# Labelary

Create PDF's or PNG's from ZPL labels via the Labelary API [Labelary API](http://labelary.com/service.html) on the CLI.

[![Build Status](https://travis-ci.com/justintime50/labelary.svg?branch=master)](https://travis-ci.com/justintime50/labelary)
[![NPM](https://img.shields.io/npm/v/labelary)](https://www.npmjs.com/package/labelary)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

<img src="assets/showcase.png">

</div>

Labelary will prompt you for details on your label to be generated such as the path to your ZPL label, desired size, desired new label format, desired new label filename, etc. Once done, Labelary will take the ZPL details and build either a PDF or PNG file based on your selection.

## Install

Install Labelary globally via NPM, use from anywhere:

```bash
npm i -g labelary
```

## Usage

```bash
# Convert a ZPL to PDF or PNG via the CLI
labelary
```

## Development

Install dependencies in the project directory:

```bash
npm i
```

Run linting:

```bash
npx eslint index.js
npx eslint lib/*
```
