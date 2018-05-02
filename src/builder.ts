import {Router, TBuild} from "spiel-build";
import { render } from "ultradom";
import {h} from "./diff";
import { IConfigRouter, IUltraRoutes, IState } from "./interfaces";
import Navigo = require("navigo");

export class Ultrabuilder {
    public build!: TBuild;
    public router!: Navigo;
    private root!: string;

    public setRouter(configRouter: IConfigRouter) {
        const builder = new Router(configRouter.rootPath, configRouter.useHash, configRouter.hash);
        this.build = builder.build;
        this.router = builder.router;
        this.root = configRouter.root;

        if (configRouter.genericHooks) {
            this.router.hooks(configRouter.genericHooks);
        }

        if (configRouter.routes) {
            this.build(configRouter.routes, this.setRender)
        }
    }

    private createRootElement() {
        const rootElement = document.getElementById(this.root);
        const node = h("div", {});
        let element;
        if (!rootElement) {
            const elm = document.createElement("div");
            elm.setAttribute("id", this.root);
            document.body.appendChild(elm);
            element = render(node, document.getElementById(this.root));
        } else {
            element = render(node, document.getElementById(this.root));
        }

        return element;
    }

    private checkQuery(query: string) {
        if (query && query.indexOf("&state=") !== -1) {
            query = query.substr(0, query.indexOf("&state="));
        }

        return query;
    }

    private checkState(query: string) {
        let state: string | object = "";
        const index = query.indexOf("state=");

        if (index !== -1 ) {
            state = query.substr(index);
            state = decodeURIComponent(state);
            state = state.replace("state=", "");
            state = JSON.parse(state);
        }

        return state;
    }

    private setRender(route: IUltraRoutes, params: object, query: string,
        rootElement?: Element, defaultProps?: any) {
        const page = route.page;
        const state: IState = {};
        if (query) {
            state.lastState = this.checkState(query);
        }
        Object.assign(state, page.state);
        state.params = params;
        state.query = this.checkQuery(query);
        state.defaultProps = route.defaultProps || defaultProps;
        page(page.view, state, rootElement);
    }
}
