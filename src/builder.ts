import Navigo = require("navigo");
import {Router, TBuild} from "spiel-build";
import { render } from "ultradom";
import {change} from "./change";
import {h} from "./diff";
import { IConfigRouter, IFeatures, IState, IUltraRoutes} from "./interfaces";

export class UltraBuilder {
    public build!: TBuild;
    public router!: Navigo;
    private configRouter!: IConfigRouter;

    public setRouter(configRouter: IConfigRouter) {
        const builder = new Router(configRouter.rootPath, configRouter.useHash, configRouter.hash);
        this.build = builder.build;
        this.router = builder.router;
        this.configRouter = configRouter;
        const element = this.createRootElement(configRouter.root);

        const features: IFeatures = {
            checkQuery: this.checkQuery,
            checkState: this.checkState,
            defaultProps: configRouter.defaultProps,
        };

        if (configRouter.genericHooks) {
            this.router.hooks(configRouter.genericHooks);
        }

        if (configRouter.routes) {
            this.build(configRouter.routes, this.setRender, null , element, features);
        }

        this.checkNotFound();
        return this;
    }

    public go(path: string, state?: object | null, absolute?: boolean) {
        if (state) {
            path = `${(path.indexOf("?") !== -1) ?
                `${path}&` :
                `${path}?`}state=${encodeURIComponent(JSON.stringify(state))}`;
        }

        this.router.navigate(path, absolute);
    }

    public resolve(currentUrl?: string) {
        this.router.resolve(currentUrl);
        if (!this.router.lastRouteResolved().url) {
            this.checkDefault();
        }
    }

    private createRootElement(root?: string) {
        let rootElement;
        if (root) {
            rootElement = document.getElementById(root);
        } else {
            return document.body;
        }

        if (rootElement) {
            return rootElement;
        } else {
            const node = h("div", {});
            const elm = document.createElement("div");
            elm.setAttribute("id", root);
            document.body.appendChild(elm);
            return document.getElementById(root) || document.body;
        }
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
                      rootElement?: Element, features?: IFeatures) {
        const page = route.page;
        const state: IState = {};
        Object.assign(state, page.state);
        state.params = params;

        if (query && features) {
            state.lastState = features.checkState(query);
            state.query = features.checkQuery(query);
        }

        if (route.defaultProps) {
            state.defaultProps = route.defaultProps;
        } else if (features) {
            state.defaultProps = features.defaultProps;
        }

        change(page.view, state, rootElement);
    }

    private checkDefault() {
        if (this.configRouter.default) {
            this.go(this.configRouter.default);
        } else {
            this.go("/");
        }
    }

    private checkNotFound() {
        this.router.notFound(() => {
            if (this.configRouter.notFound && this.configRouter.notFoundPath &&
                ((window.location.hash && window.location.hash !== this.configRouter.hash
                    && this.configRouter.useHash) ||
                (window.location.pathname !== "/" && !this.configRouter.useHash))) {
                this.go(this.configRouter.notFoundPath);
            } else {
                this.checkDefault();
            }
        }, this.configRouter.notFoundHooks);
    }
}

export const ultraBuilder = new UltraBuilder();
