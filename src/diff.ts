import { Children, h as diff } from "ultradom";

export const h = (name: any, attributes: any, ...children: Children[]) => {
    return typeof name === "function"
        ? name(attributes, children)
        : diff(name, attributes, children);
};
