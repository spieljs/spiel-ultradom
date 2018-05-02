import { Children } from "ultradom";
import * as ultradom from "ultradom";

export const h = (name: any, attributes: any, ...children: Children[]) => {
    return typeof name === "function"
        ? name(attributes, children)
        : ultradom.h(name, attributes, children)
}
