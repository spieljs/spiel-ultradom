import {h, IPage, ultraBuilder } from "../../../src";
import {ITestState} from "../interfaces";

export const testPage1: IPage = {
    state: {
        title: "Hello world",
    },

    view: (state: ITestState<void, void>) => {
        return (
            <div>
                <h1>{state.title}</h1>
                <h2>{state.defaultProps}</h2>
                <button id ="child"
                    onclick = {() => {
                        ultraBuilder.go("/home/child/5");
                    }}
                >go to child</button>
                <button id="grandchild"
                    onclick = {() => {
                        ultraBuilder.go("/home/child/2/child2/test?query=really", {text: "good"});
                    }}
                >go to child 2</button>
                <button id="brother"
                    onclick = {() => {
                        ultraBuilder.go("/home/brother");
                    }}
                >go to child brother</button>
                <button id="page-component"
                    onclick = {() => {
                        ultraBuilder.go("/child");
                    }}
                >go to child with component</button>
            </div>
        );
    },
};
