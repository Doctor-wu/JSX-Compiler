import { JSXCompiler } from "./compiler";
import { createTokenizer, Tokenizer } from "./tokenizer";
const path = require("path");
const fs = require("fs");

const compiler = new JSXCompiler.Compiler();
compileTemplates('auth');
compileTemplates('vform-item');
compileTemplates('vform');
compileTemplates('ShareImage');
compiler.compile(`<span class="number">123</span>`);
console.log(
  JSON.stringify(
    compiler.jsxElement,
    null,
    2
  )
);

function compileTemplates(fileName: string) {
  compiler.compileFile({
    path: path.resolve(__dirname, `templates/${fileName}.dxml`)
  });
  const element = compiler.jsxElement;

  fs.writeFileSync(
    path.resolve(
      __dirname,
      `./targets/${fileName}-AST.json`
    ),
    JSON.stringify(
      element,
      (key, value) => {
        if (key === "type") return value.toString();
        return value;
      },
      2
    )
  );
}
