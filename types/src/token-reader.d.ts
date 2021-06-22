import { JSXTokenizer } from "./tokenizer";
export declare class TokenReader {
    tokens: JSXTokenizer.IToken[];
    pos: number;
    constructor(tokens: JSXTokenizer.IToken[]);
    loadTokens(tokens: JSXTokenizer.IToken[]): void;
    read(): JSXTokenizer.IToken | null;
    peek(): JSXTokenizer.IToken | null;
    unread(): void;
}
