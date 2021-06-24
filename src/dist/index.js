"use strict";
exports.__esModule = true;
var code_generator_1 = require("./code-generator");
var compiler_1 = require("./compiler");
var path = require("path");
var fs = require("fs");
var compiler = new compiler_1.JSXCompiler.Compiler();
// compileTemplates("auth");
// compileTemplates("vform-item");
// compileTemplates("vform");
compileTemplates("ShareImage");
// compiler.compile(`<span class="number">123</span>`);
// console.log(JSON.stringify(compiler.jsxElement, null, 2));
var generator = new code_generator_1.CodeGenerator.JSXGenerator();
if (compiler.jsxElement)
    generator.generate(compiler.jsxElement);
fs.writeFileSync(path.resolve(__dirname, "./targets/ShareImage.js"), generator.code);
function compileTemplatesToJS(fileName) {
    compileTemplates(fileName);
    var generator = new code_generator_1.CodeGenerator.JSXGenerator();
    if (compiler.jsxElement)
        generator.generate(compiler.jsxElement);
    fs.writeFileSync(path.resolve(__dirname, "./targets/" + fileName + ".js"), generator.code);
}
function compileTemplates(fileName) {
    compiler.compileFile({
        path: path.resolve(__dirname, "templates/" + fileName + ".dxml")
    });
    var element = compiler.jsxElement;
    return element;
}
