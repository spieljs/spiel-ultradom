import {Children} from "ultradom";
import {h, IPage, ultraBuilder } from "../../../src";
import {ITestState} from "../interfaces";

interface IShow {
    value?: string;
    onGo: () => void;
}

export const testPage5: IPage = {
    state: {
        text: "This is a component",
    },

    view: (state: ITestState<void, void>) => {
        return(
            <Show value={state.text} onGo={() => ultraBuilder.go("/")}>
                <span>And this is its child</span>
            </Show>
        );
    },
};

function Show({value, onGo}: IShow, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id="child">{children}</div>
            <button id="go-parent" onclick={() => ultraBuilder.go("/")}></button>
        </div>
    );
}
