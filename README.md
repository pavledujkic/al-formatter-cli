# CLI Command Line Interface for formatting AL files

## Features

- Indentation
- Keyword case style
- Sort variable definitions
- Readability Guidelines - Spacing and newlines (experimental)

## Usage

```bash
git clone https://github.com/RasmusTidselbak/al-formatter.git
cd al-formatter/cli
npm install -D
export PATH=`pwd`/node_modules/.bin:$PATH
npm run build
npm start -- --path "/home/user/project/src"
npm start -- --file "/home/user/project/src/pages/tst.al"
```
