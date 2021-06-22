# JSX-Compiler
A JSX-Compiler

## 使用有限状态机进行分词

## 使用递归下降算法和上下文无关文法进行语法分析生成AST

## JSX文法
// 表达式
Expr -> TagHead Expr TagTail
        | TagHead
        | TagHead TagTail
        | [text]
        | Expr Expr

// 开始标签
TagHead -> TagHeadStart Attribute TagHeadEnd
            | TagHeadStart TagHeadEnd

// 开始标签-开头
TagHeadStart -> [LeftBracket] [Identifier]

// 属性
Attribute -> [AttributeKey] [Equator] [AttributeValue]
             | [AttributeKey]
             | [AttributeKey] [Equator] [AttributeValue] Attribute
             | [AttributeKey] Attribute

// 开始标签-结尾
TagHeadEnd -> [BackFlash] [RightBracket]
              | [RightBracket]


// 结束标签
TagTail -> [LeftBracket] [BackFlash] [Identifier] [RightBracket]