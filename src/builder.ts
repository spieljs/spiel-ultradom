import {Router, TBuild} from "spiel-build";
import { IConfigRouter } from "./interfaces";
import Navigo = require("navigo");

export class Ultrabuilder {
    public build!: TBuild;
    public router!: Navigo;
    private configRouter!: IConfigRouter

    public setRouter(configRouter: IConfigRouter) {
        const builder = new Router(configRouter.rootPath, configRouter.useHash, configRouter.hash);
        this.build = builder.build;
        this.router = builder.router;
    }
}
