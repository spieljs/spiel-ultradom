import { assert, expect } from "chai";
import { render, VNode } from "ultradom";
import { h } from "../../src";

import {pageTest} from "./mocks";

describe("Page", () => {
    let nodes: VNode<any>;
    before(() => {
        const node = h("div", {});
        const elm = document.createElement("div");
        elm.setAttribute("id", "app");
        document.body.appendChild(elm);
        const app = document.getElementById("app");

        if (app) {
            render(node, app);
        }

        nodes = h(pageTest.view, pageTest.state);
    });

    it("has to be created", () => {
        const title: any = nodes.children.find((node: any) => node.name === "h1");
        expect(title.children[0]).has.to.be.equal("Hello");
    });

    it("has to change the title", () => {
        const button: any = nodes.children.find((node: any) => node.name === "button");
        button.attributes.onclick();
        nodes = h(pageTest.view, pageTest.state);
        const title: any = nodes.children.find((node: any) => node.name === "h1");
        expect(title.children[0]).has.to.be.equal("Hello World");
    });
});
