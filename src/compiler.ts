import { AST } from "./ast";
import { createTokenizer, JSXTokenizer, Tokenizer } from "./tokenizer";
import { Transform } from "./transform";
const fs = require("fs");

export module JSXCompiler {
  export interface compileFileOptions {
    path: string;
  }

  export interface ICompiler {
    tokenizer: JSXTokenizer.ITokenizer;
    astParser: AST.IParse;
    transformer: Transform.Transfomer;
    tokens: JSXTokenizer.IToken[];
    ast?: AST.ASTNode;

    compile(template: string): AST.ASTNode;
    compileFile(options: compileFileOptions): AST.ASTNode;
  }

  export class Compiler implements ICompiler {
    tokenizer: JSXTokenizer.ITokenizer = createTokenizer(Tokenizer);
    astParser: AST.IParse = new AST.Parse([]);
    transformer: Transform.Transfomer = new Transform.Transfomer();
    tokens: JSXTokenizer.IToken[] = [];
    ast?: AST.ASTNode;
    jsxElement?: Transform.JSXElement;

    compile(template: string) {
      console.log("================== Compile Start ====================");
      this.tokens = this.tokenizer.run(template);
      this.ast = this.astParser.createAST(this.tokens);
      this.ast = this.transformer.extractASTParserNode(this.ast);
      this.jsxElement = this.transformer.transform2JSXElement(this.ast);
      console.log("Transform Success!");
      console.log("================== Compile Success! ====================");
      return this.ast;
    }

    compileFile(options: compileFileOptions): AST.ASTNode {
      let template = fs.readFileSync(options.path).toString();

      return this.compile(template);
    }
  }
}
