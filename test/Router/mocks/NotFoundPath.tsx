import {h, IPage} from "../../../src";

export const notFound: IPage = {
    state: {
        message: "Page not found sorry",
    },

    view: (state: {message: string}) => {
        return (
            <div>
                <h1>{state.message}</h1>
            </div>
        );
    },
};
