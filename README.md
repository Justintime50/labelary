# Labelary

Create PDF's or PNG's from ZPL labels via the [Labelary API](http://labelary.com/service.html).

[![Build Status](https://travis-ci.org/justintime50/labelary.svg?branch=master)](https://travis-ci.org/justintime50/labelary)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

When Labelary is run from a terminal, you'll be prompted for details on your label to be generated such as `size`, `format`, `filename`, etc. Once done, Labelary will take the ZPL details and build either a PDF or PNG based on your selection.

## Install

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
