import { Children, h as diff } from "ultradom";

/**
 * Allow to use components in jsx
 * @param name name of component
 * @param attributes attributes of component
 * @param children children of component
 */
export const h = (name: any, attributes: any, ...children: Children[]) => {
    return typeof name === "function"
        ? name(attributes, children)
        : diff(name, attributes, children);
};
