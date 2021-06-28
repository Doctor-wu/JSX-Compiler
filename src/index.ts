import { CodeGenerator } from "./code-generator";
import { JSXCompiler } from "./compiler";
const path = require("path");
const fs = require("fs");

const compiler = new JSXCompiler.Compiler();
// compileTemplates("auth");
// compileTemplates("vform-item");
// compileTemplates("vform");
// compileTemplates("ShareImage");
// compiler.compile(`<span class="number">123</span>`);
// console.log(JSON.stringify(compiler.jsxElement, null, 2));

compileTemplatesToJS("ShareImage");

function compileTemplatesToJS(fileName: string) {
  compileTemplates(fileName);
  const generator = new CodeGenerator.ShareImageGenerator();
  if (compiler.jsxElement) generator.generate(compiler.jsxElement);
  fs.writeFileSync(
    path.resolve(__dirname, `./targets/${fileName}.js`),
    generator.code
  );
}

function compileTemplates(fileName: string) {
  compiler.compileFile({
    path: path.resolve(__dirname, `templates/${fileName}.dxml`),
  });
  const element = compiler.jsxElement;
  return element;
}
