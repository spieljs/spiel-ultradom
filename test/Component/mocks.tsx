import { Children, VNode } from "ultradom";
import { h, IPage } from "../../src";

interface IShow {
    value: string;
}

export const componentTest: IPage = {
    state: {
        text: "This is a component",
    },

    view: (state: {text: string}) => {
        return (
            <Show value={state.text}>
                <span>And this is its child</span>
            </Show>
        );
    },
};

function Show({value}: IShow, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id="child">{children}</div>
        </div>
    );
}
