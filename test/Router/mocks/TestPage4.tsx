import {change, h, IPage, ultraBuilder} from "../../../src";
import {ITestState} from "../interfaces";

export const testPage4: IPage = {
    state: {
        title: "Hello brother",
    },

    view: (state: ITestState<void, void>) => {
        return (
            <div>
                <h1>{state.title}</h1>
                <h2>{state.defaultProps}</h2>
                <button
                    onclick ={() => {
                        state.title = "Yes brother";
                        change(testPage4.view, state);
                    }}
                >Change Title</button>
                <a href="/home" data-navigo>go to root</a>
            </div>
        );
    },
};
