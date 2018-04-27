import { IRoutes, IHooks, IGenericHooks } from "spiel-build";

export interface IUltraRoutes extends IRoutes{
    /** 
     * Assigns default props state for this route  
     */
    defaultProps?: any;
    /**
     * Adds page childreen
     */
    routes?: Array<{[Route in keyof IRoutes] : any}>;
}

export interface IConfigRouter {
    /** The main URL of the application. without parameters
     *  then the router figures out the root URL based on your routes
     *  It is strongly recommend to set a root value
     */
    rootPath?: string;
    /** The default path which the application goes when it starts */
    default?: string;
    /** It enable not found page
     * @default false
     */
    notFound?: boolean;
    /** Path of not found page */
    notFoundPath?: string;
    /** It enable useHash
     * @default true
     */
    useHash?: boolean;
    /** Generic hooks will run in every path access
     * @see <a href="_helpers_interfaces_.igenerichooks.html">IGenericHooks</a>
     */
    genericHooks?: IGenericHooks;
    /** Hooks for not found page */
    notFoundHooks?: IHooks;
    /** It set the hash route
     * @default #
     */
    hash?: string;
    /** It assigns to state for every page default props */
    defaultProps?: any;
    /** It set default props in every path page
     * @see <a href="_helpers_interfaces_.irouters.html">IRouters</a>
     */
    routes?: Array<{[Route in keyof IUltraRoutes] : any}>;
    /**
     * Name of the aplication which will use for the root element
     * @default app
     * @since 1.0.0
     */
    root?: string;
}