"use strict";
exports.__esModule = true;
var compiler_1 = require("./compiler");
var path = require("path");
var fs = require("fs");
var compiler = new compiler_1.JSXCompiler.Compiler();
// compileTemplates('auth');
compileTemplates('vform-item');
// compileTemplates('vform');
// compileTemplates('ShareImage');
// compiler.compile(`<span class="number">123</span>`);
// console.log(
//   JSON.stringify(
//     compiler.tokens,
//     null,
//     2
//   )
// );
function compileTemplates(fileName) {
    compiler.compileFile({
        path: path.resolve(__dirname, "templates/" + fileName + ".dxml")
    });
    var element = compiler.jsxElement;
    fs.writeFileSync(path.resolve(__dirname, "./targets/" + fileName + "-AST.json"), JSON.stringify(element, function (key, value) {
        if (key === "type")
            return value.toString();
        return value;
    }, 2));
}
