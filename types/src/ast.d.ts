import { TokenReader } from "./token-reader";
import { JSXTokenizer } from "./tokenizer";
export declare module AST {
    export type ASTNodeType = typeof ASTNodeType[keyof typeof ASTNodeType] | typeof FinalTokenType[keyof typeof FinalTokenType];
    export interface ASTNode {
        type: ASTNodeType;
        value?: string;
        children?: ASTNode[];
    }
    export interface ASTElementNode extends ASTNode {
        elementType?: "Text" | "Element" | "Comment";
        closeSelf?: Boolean | String;
    }
    export const ASTNodeType: {
        Program: symbol;
        Expr: symbol;
        TagHead: symbol;
        TagHeadStart: symbol;
        Attribute: symbol;
        TagHeadEnd: symbol;
        TagTail: symbol;
    };
    export const FinalTokenType: {
        Text: symbol;
        Comment: symbol;
        LeftBracket: symbol;
        Identifier: symbol;
        AttributeKey: symbol;
        Equator: symbol;
        AttributeValue: symbol;
        BackFlash: symbol;
        RightBracket: symbol;
    };
    type UnFinalTokenHandlerReturnType = Boolean;
    type UnFinalTokenHandler = () => UnFinalTokenHandlerReturnType;
    type UnFinalToken = "Program" | "Expr" | "TagHead" | "TagHeadStart" | "Attribute" | "TagHeadEnd" | "TagTail";
    export interface IParse extends Record<UnFinalToken, UnFinalTokenHandler> {
        tokenReader: TokenReader;
        ast: ASTElementNode;
        closeSelf: Boolean;
        createAST(tokens: JSXTokenizer.IToken[]): ASTNode;
    }
    export class Parse implements IParse {
        tokenReader: TokenReader;
        ast: ASTElementNode;
        currentNode: ASTElementNode;
        parentNode: ASTElementNode;
        currentToken: JSXTokenizer.IToken;
        closeSelf: Boolean;
        identifierStack: string[];
        constructor(tokens: JSXTokenizer.IToken[]);
        createAST(tokens: JSXTokenizer.IToken[]): ASTNode;
        createASTNode(type: ASTNodeType, children: ASTElementNode[] | undefined, value?: string): ASTElementNode;
        setCurrentToken(token: JSXTokenizer.IToken | null): void;
        toAST(): ASTNode;
        checkIdentifier(): void;
        Program(): UnFinalTokenHandlerReturnType;
        Expr(): UnFinalTokenHandlerReturnType;
        TagHead(): UnFinalTokenHandlerReturnType;
        TagHeadStart(): UnFinalTokenHandlerReturnType;
        Attribute(): UnFinalTokenHandlerReturnType;
        TagHeadEnd(): UnFinalTokenHandlerReturnType;
        TagTail(): UnFinalTokenHandlerReturnType;
    }
    export {};
}
