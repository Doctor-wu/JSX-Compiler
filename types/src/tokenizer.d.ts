export declare module JSXTokenizer {
    interface ITokenizerConstructor {
        new (): ITokenizer;
    }
    type TokenizerParamter = string;
    interface IToken {
        type: Symbol | null;
        value: string;
    }
    interface IStateExcutor {
        (char: string): IStateExcutor | undefined;
    }
    type REType = {
        [props: string]: RegExp;
    };
    interface ITokenizer {
        currentToken: IToken;
        tokens: IToken[];
        RE: REType;
        run(input: JSXTokenizer.TokenizerParamter): IToken[];
        searchBeginTagStart: IStateExcutor;
        searchJSXIdentifier: IStateExcutor;
        searchFirstCommentBar: IStateExcutor;
        searchSecondCommentBar: IStateExcutor;
        searchCommentContent: IStateExcutor;
        searchCommentEnd: IStateExcutor;
        searchJSXAttributeKey: IStateExcutor;
        foundBackFlashInAttribute: IStateExcutor;
        searchJSXAttributeValue: IStateExcutor;
        foundAttributeQuote: IStateExcutor;
        foundJSXBeginTagEnd: IStateExcutor;
        resetCurrentToken(): void;
        emit(token: IToken): void;
        pop(): IToken | undefined;
    }
    const TagStartType: unique symbol;
    const JSXIdentifierType: unique symbol;
    const JSXAttributeKey: unique symbol;
    const Equator: unique symbol;
    const JSXAttributeValue: unique symbol;
    const TagEndType: unique symbol;
    const BackFlash: unique symbol;
    const Text: unique symbol;
    const Comment: unique symbol;
}
export declare class Tokenizer implements JSXTokenizer.ITokenizer {
    tokens: JSXTokenizer.IToken[];
    currentQuote: string | undefined;
    currentToken: JSXTokenizer.IToken;
    RE: JSXTokenizer.REType;
    run(input: JSXTokenizer.TokenizerParamter): JSXTokenizer.IToken[];
    searchBeginTagStart(char: string): JSXTokenizer.IStateExcutor;
    searchJSXIdentifier(char: string): JSXTokenizer.IStateExcutor;
    searchFirstCommentBar(char: string): JSXTokenizer.IStateExcutor;
    searchSecondCommentBar(char: string): JSXTokenizer.IStateExcutor;
    searchCommentContent(char: string): JSXTokenizer.IStateExcutor;
    searchCommentEnd(char: string): JSXTokenizer.IStateExcutor;
    searchJSXAttributeKey(char: string): JSXTokenizer.IStateExcutor;
    foundBackFlashInAttribute(char: string): JSXTokenizer.IStateExcutor;
    searchJSXAttributeValue(char: string): JSXTokenizer.IStateExcutor;
    foundAttributeQuote(char: string): JSXTokenizer.IStateExcutor;
    foundJSXBeginTagEnd(char: string): JSXTokenizer.IStateExcutor;
    resetCurrentToken(): void;
    emit(token: JSXTokenizer.IToken): void;
    pop(): JSXTokenizer.IToken | undefined;
}
export declare function createTokenizer(Tokenizer: JSXTokenizer.ITokenizerConstructor): JSXTokenizer.ITokenizer;
