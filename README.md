<div align="center">

# Labelary

Create PDF's or PNG's from ZPL labels via the Labelary API [Labelary API](http://labelary.com/service.html) on the CLI.

[![Build Status](https://travis-ci.com/justintime50/labelary.svg?branch=master)](https://travis-ci.com/justintime50/labelary)
[![Coverage Status](https://coveralls.io/repos/github/Justintime50/labelary/badge.svg?branch=master)](https://coveralls.io/github/Justintime50/labelary?branch=master)
[![NPM](https://img.shields.io/npm/v/labelary)](https://www.npmjs.com/package/labelary)
[![Licence](https://img.shields.io/github/license/justintime50/labelary)](https://opensource.org/licenses/mit-license.php)

<img src="assets/showcase.png" alt="Showcase">

</div>

Labelary will prompt you for details on your label to be generated such as the path to your ZPL label, desired size, desired new label format, desired new label filename, etc. Once done, Labelary will take the ZPL details and build either a PDF or PNG file based on your selection.

## Install

Install Labelary globally via NPM, use from anywhere:

```bash
npm i -g labelary
```

## Usage

```bash
# Start up the Labelary prompt on the CLI
labelary
```

## Development

```bash
# Install project locally
npm i

# Lint files
npx eslint index.js

# Run tests
npm run test
```
