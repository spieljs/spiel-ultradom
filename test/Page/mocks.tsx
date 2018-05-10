import {change, h, IPage } from "../../src";

export const pageTest: IPage = {
    state: {
        title: "Hello",
    },

    view: (state: {title: string}) => {
        const changeTitle = () => {
            state.title = "Hello World";
            change(pageTest.view, state);
        };

        return(
            <div>
                <h1>{state.title}</h1>
                <button onclick={() => changeTitle()}></button>
            </div>
        );
    },
};
