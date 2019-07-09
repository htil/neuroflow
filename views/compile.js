const pug  = require("pug");
const fs   = require("fs");
const path = require("path");

// Compile the source code
const compiledFunction = pug.compileFile(path.join(__dirname, 'index.pug'), { compileDebug: true });

// Render a set of data
fs.writeFileSync(path.join(__dirname, "..", "public", "index.html"), compiledFunction());
