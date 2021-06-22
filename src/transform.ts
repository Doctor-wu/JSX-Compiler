import { AST } from "./ast";
export module Transform {
  const extractASTParserNodeSet: {
    [prop: string]: boolean;
  } = {};
  [
    AST.ASTNodeType.TagHead,
    AST.ASTNodeType.TagTail,
    AST.ASTNodeType.TagHeadStart,
    AST.ASTNodeType.TagHeadEnd,
  ].forEach((key) => {
    extractASTParserNodeSet[key.toString()] = true;
  });

  export interface ITransformer {
    extractASTParserNode(node: AST.ASTNode): AST.ASTNode;
    createJSXElement(
      identifier: string,
      Attributes: JSXAttribute[],
      children: JSXElement[],
      ast: AST.ASTElementNode
    ): JSXElement;
  }

  export interface JSXElement
    extends Omit<AST.ASTElementNode, keyof AST.ASTNode> {
    identifier: string;
    Attributes: JSXAttribute[];
    children?: JSXElement[];
    value?: string;
  }

  export interface JSXAttribute {
    key: string;
    value: string | boolean;
  }

  export class Transfomer {
    createJSXElement(
      identifier: string,
      Attributes: JSXAttribute[],
      children: JSXElement[],
      ast: AST.ASTElementNode
    ): JSXElement {
      let node: JSXElement = {
        identifier,
        Attributes,
        children,
        elementType: ast.elementType,
        closeSelf: ast.closeSelf,
      };

      return node;
    }

    transform2JSXElement(node: AST.ASTNode): JSXElement {
      let identifier = "Program",
        Attributes: JSXAttribute[] = [],
        children: JSXElement[] = [];
      let root = this.createJSXElement(identifier, Attributes, children, node);

      function buildJSXElement(
        this: ITransformer,
        node: AST.ASTNode,
        parent: JSXElement
      ) {
        if (node.type === AST.ASTNodeType.Expr) {
          let identifier: string,
            Attributes: JSXAttribute[] = [],
            children: JSXElement[] = [],
            element: JSXElement;

          node.children?.forEach((child) => {
            if (child.type === AST.FinalTokenType.Identifier) {
              identifier = child.value!;
              return;
            }
            if (child.type === AST.ASTNodeType.Attribute) {
              let attr: JSXAttribute = {
                key: "",
                value: "",
              };
              child.children?.forEach((item) => {
                if (item.type === AST.FinalTokenType.AttributeKey) {
                  attr.key = item.value!;
                  return;
                }

                if (item.type === AST.FinalTokenType.AttributeValue) {
                  attr.value = item.value || true;
                  return;
                }
              });
              Attributes.push(attr);
              return;
            }
            if (child.type === AST.FinalTokenType.Comment) {
              children.push({
                identifier: "[[Comment]]",
                Attributes: [],
                value: child.value,
              });
              return;
            }
            if (child.type === AST.FinalTokenType.Text) {
              children.push({
                identifier: "[[Text]]",
                Attributes: [],
                value: child.value,
              });
              return;
            }
            if (child.type === AST.ASTNodeType.Expr) {
              element =
                element ||
                this.createJSXElement(identifier, Attributes, children, node);
              buildJSXElement.call(this, child, element);
            }
          });

          if (!parent.children) throw TypeError("parent should have children");
          parent.children.push(
            this.createJSXElement(identifier!, Attributes, children, node)
          );
        }
      }

      node.children?.forEach((item) => buildJSXElement.call(this, item, root));
      return root;
    }

    extractASTParserNode(node: AST.ASTNode): AST.ASTNode {
      let extractedNode = Object.assign({}, node);

      function extract(child: AST.ASTNode): AST.ASTNode[] {
        if (extractASTParserNodeSet[child.type.toString()]) {
          if (!child.children) return [child];
          return child.children.map((item) => extract(item)).flat();
        }
        if (!child.children) return [child];
        child.children = child.children.map((item) => extract(item)).flat();
        return [child];
      }
      if (!node.children) return node;
      extractedNode.children = node.children
        .map((item) => extract(item))
        .flat();

      return extractedNode;
    }
  }
}
