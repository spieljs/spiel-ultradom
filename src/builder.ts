import {Router, TBuild} from "spiel-build";
import { render } from "ultradom";
import {h} from "./diff";
import { IConfigRouter, IUltraRoutes, IState, features, features } from "./interfaces";
import Navigo = require("navigo");

export class Ultrabuilder {
    public build!: TBuild;
    public router!: Navigo;

    public setRouter(configRouter: IConfigRouter) {
        const builder = new Router(configRouter.rootPath, configRouter.useHash, configRouter.hash);
        this.build = builder.build;
        this.router = builder.router;
        const element = this.createRootElement(configRouter.root);

        const features = {
            defaultProps: configRouter.defaultProps,
            checkQuery: this.checkQuery,
            checkState: this.checkState
        };

        if (configRouter.genericHooks) {
            this.router.hooks(configRouter.genericHooks);
        }

        if (configRouter.routes) {
            this.build(configRouter.routes, this.setRender, element)
        }
    }

    private createRootElement(root: string) {
        const rootElement = document.getElementById(root);
        const node = h("div", {});
        let element;
        if (!rootElement) {
            const elm = document.createElement("div");
            elm.setAttribute("id", root);
            document.body.appendChild(elm);
            element = render(node, document.getElementById(root));
        } else {
            element = render(node, document.getElementById(root));
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
        rootElement?: Element, features?: features) {
        const page = route.page;
        const state: IState = {};
        if (query) {
            state.lastState = features.checkState(query);
        }
        Object.assign(state, page.state);
        state.params = params;
        state.query = features.checkQuery(query);
        state.defaultProps = route.defaultProps || features.defaultProps;
        page(page.view, state, rootElement);
    }
}
