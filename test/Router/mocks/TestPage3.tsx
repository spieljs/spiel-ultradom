import {h, IPage, ultraBuilder} from "../../../src";
import {ITestState} from "../interfaces";

interface IParams {
    number: number;
    word: string;
}

export const testPage3: IPage = {
    state: {
        title: "Really",
    },

    view: (state: ITestState<IParams, {text: string}>) => {
        return (
            <div>
                <h1>{state.title} {state.params.word} {state.params.number} {state.query} {state.lastState.text}</h1>
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
