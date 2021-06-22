import { AST } from "./ast";
import { JSXTokenizer } from "./tokenizer";
export declare module JSXCompiler {
    interface compileFileOptions {
        path: string;
        reserveParserNode?: Boolean;
    }
    interface ICompiler {
        tokenizer: JSXTokenizer.ITokenizer;
        astParser: AST.IParse;
        tokens: JSXTokenizer.IToken[];
        ast?: AST.ASTNode;
        compile(template: string): AST.ASTNode;
        compileFile(options: compileFileOptions): AST.ASTNode;
        extractASTParserNode(node: AST.ASTNode): AST.ASTNode;
    }
    class Compiler implements ICompiler {
        tokenizer: JSXTokenizer.ITokenizer;
        astParser: AST.IParse;
        tokens: JSXTokenizer.IToken[];
        ast?: AST.ASTNode;
        compile(template: string, reserve?: Boolean): AST.ASTNode;
        compileFile(options: compileFileOptions): AST.ASTNode;
        extractASTParserNode(node: AST.ASTNode): AST.ASTNode;
    }
}
