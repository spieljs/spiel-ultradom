import {h, IPage, ultraBuilder} from "../../../src";
import {ITestState} from "../interfaces";

export const testPage2: IPage = {
    state: {
        title: "Seriously",
    },

    view: (state: ITestState<{number: number}, void>) => {
        return (
            <div>
                <h1>{state.title} {state.params.number}</h1>
                <h2>{state.defaultProps}</h2>
                <button
                    onclick = {() => {
                        ultraBuilder.go("/home");
                    }}
                >go to root</button>
            </div>
        );
    },
};
