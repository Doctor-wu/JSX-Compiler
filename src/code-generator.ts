import { Transform } from "./transform";

export module CodeGenerator {
  export interface IGenerate {
    generate(tree: Transform.JSXElement): string;
  }

  export class Generator implements IGenerate {
    code: string = "";

    generate(
      this: Generator & { [props: string]: any },
      tree: Transform.JSXElement
    ): string {
      let method: Function = this[tree.identifier];
      if (method) {
        method.call(this, tree);
      }
      return this.code;
    }

    emitLineln(chars: string) {
      this.emitLine(chars);
      this.code += `
`;
    }

    emitLine(chars: string) {
      this.code += chars;
    }
  }

  export class ShareImageGenerator extends Generator {
    getTextName = (() => {
      let id = 0;
      return function () {
        return `shareText${id++}`;
      };
    })();
    getImageName = (() => {
      let id = 0;
      return function () {
        return `shareImage${id++}`;
      };
    })();
    Program(node: Transform.JSXElement) {
      node.children?.forEach((child) => this.generate(child));
    }
    ShareImage(node: Transform.JSXElement) {
      this.emitLineln("const shareCard = new ShareData();");

      node.Attributes.forEach((attr) => {
        this.emitLineln(`shareCard.${attr.key} = ${attr.value};`);
      });
      this.emitLineln("");
      node.children?.forEach((child) => this.generate(child));
    }

    Text(node: Transform.JSXElement) {
      const name = this.getTextName();
      this.emitLineln(`const ${name} = new ShareData.Text();`);

      node.Attributes.forEach((attr) => {
        if (attr.key === "layout") {
          return this.resolveLayout(attr, name);
        }
        this.emitLineln(`${name}.${attr.key} = ${attr.value};`);
      });
      this.emitLineln("");
    }

    Image(node: Transform.JSXElement) {
      const name = this.getImageName();
      this.emitLineln(`const ${name} = new ShareData.Image();`);

      node.Attributes.forEach((attr) => {
        if (attr.key === "layout") {
          return this.resolveLayout(attr, name);
        }
        this.emitLineln(`${name}.${attr.key} = ${attr.value};`);
      });
      this.emitLineln("");
    }

    resolveLayout(attr: Transform.JSXAttribute, name: string) {
      let [x, y, width, height] = String(attr.value)
        .split(" ")
        .map((item) => item.split("/"))
        .flat();
      this.emitLineln(`${name}.X = ${x};`);
      this.emitLineln(`${name}.Y = ${y};`);
      this.emitLineln(`${name}.Width = ${width};`);
      this.emitLineln(`${name}.Height = ${height};`);
    }
  }
}
