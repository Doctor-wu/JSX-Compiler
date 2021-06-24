import { CodeGenerator } from "./code-generator";
import { JSXCompiler } from "./compiler";
const path = require("path");
const fs = require("fs");

const compiler = new JSXCompiler.Compiler();
// compileTemplates("auth");
// compileTemplates("vform-item");
// compileTemplates("vform");
compileTemplates("vform");
// compiler.compile(`<span class="number">123</span>`);
// console.log(JSON.stringify(compiler.jsxElement, null, 2));

const generator = new CodeGenerator.JSXGenerator();
if (compiler.jsxElement) generator.generate(compiler.jsxElement);
fs.writeFileSync(path.resolve(__dirname, "./targets/vform.js"), generator.code);

function compileTemplates(fileName: string) {
  compiler.compileFile({
    path: path.resolve(__dirname, `templates/${fileName}.dxml`),
  });
  const element = compiler.jsxElement;
  return element;
}
