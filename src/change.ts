import { render } from "ultradom";
import { IState, TView } from "./interfaces";

let element: Element;

/**
 * It changes to the views with its componets
 * @param view  The view JSX template of the page.
 * @param state The state object property of the page
 * @param rootElement The root element
 */
export function change(view: TView, state: IState, rootElement?: Element | null): Element {
    if (!element) {
        element = rootElement || document.body;
    }
    render(view(state), element);
    return element;
}
