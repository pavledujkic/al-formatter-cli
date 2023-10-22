"use strict";

import { IndentationHandler } from "./components/indentation";
import { KeywordHandler } from "./components/keyword";
import { ReadabilityHandler } from "./components/readability";
import { VariableHandler } from "./components/variable";
import fs = require("fs");
import program = require("commander");
import glob = require("glob");

const tabSize = 4;

function AlFormatterFile(filepath: string) {
  const keywordHandler = new KeywordHandler();
  const indentationHandler = new IndentationHandler();
  const variableHandler = new VariableHandler();
  const readabilityHandler = new ReadabilityHandler();

  fs.readFile(filepath, "utf8", formatFile());

  function formatFile(): (err: NodeJS.ErrnoException, data: string) => void {
    return (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      let doc = data;

      doc = keywordHandler.casing(doc);
      doc = variableHandler.sort(doc);
      doc = readabilityHandler.spacing(doc);
      doc = indentationHandler.indent(doc, tabSize);

      if (doc != data) {
        fs.writeFile(filepath, doc, "utf8", function (err) {
          if (err) return console.log(err);
          console.log(filepath + " has been formatted.");
        });
      }
    };
  }
}

async function AlFormatterDirectory(dirpath: string) {
  const alfiles = glob.sync(dirpath + "/**/*.al");
  for (const f of alfiles) {
    AlFormatterFile(f);
  }
}

program
  .version("0.5.0")
  .description("Format AL files from the command line")
  .option(
    "--path <path>",
    "this is a directory where you want to format all *.al files inside"
  )
  .option("--file <file>", "this is an al file that you want to format")
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

if (program.path) {
  AlFormatterDirectory(program.path);
}

if (program.file) {
  AlFormatterFile(program.file);
}
