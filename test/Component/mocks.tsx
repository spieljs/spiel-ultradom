import { VNode, Children } from "ultradom";
import { IPage, h } from "../../src";

interface IShow {
    value: string;
}

export const componentTest: IPage = {
    state: {
        text: "This is a component",
    },

    view: (state: {test: string}) => {
        return (
            <Show value={state.test}>
                <span>And this its child</span>
            </Show>
        );
    }
}

function Show({value}: IShow, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id="child">{children}</div>
        </div>
    );
}
