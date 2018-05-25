# SPIEL ULTRADOM

Router builder for [ultradom](https://github.com/jorgebucaran/ultradom) using [Navigo](https://github.com/krasimir/navigo)

## Api documentation

* [Spiel Ultradom API](https://spieljs.github.io/spiel-ultradom)

## How use it

Create a page views object

```tsx
import { Children n } from "ultradom";
import { h, IPage } from "spiel-ultradom";

interface IShow {
    value: string;
}

export const page: IPage = {
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
```

Set the config router object

```typescript
export const configRouter: IConfigRouter = {
    default: "/home",
    defaultProps: "default",
    genericHooks,
    hash: "#!",
    notFound: true,
    notFoundPath: "/not-found",
    rootPath: "http://localhost:9876/",
    routes: [{
        page: page1,
        path: "/home",
        routes: [{
            alias: "child",
            hooks,
            page: page2,
            path: "/child/:number",
            routes: [{
                alias: "grandchild",
                page: page3,
                path: "/child2/:word",
            }],
        }, {
            defaultProps: "my own prop",
            page: page4,
            path: "/brother",
        }],
    },
    {
        page: notFound,
        path: "/not-found",
    }],
    useHash: true,
};
```

Call to ultraBuilder object

```typescript

import { ultraBuilder} from "spiel-ultradom";

...

ultraBuilder.setRouter(configRouter).resolve();

```

Change the path and pass states with `ultraBuilder.go`

```tsx
<button id="grandchild"
    onclick = {() => {
        ultraBuilder.go("/home/child/2/child2/test?query=really", {text: "good"});
    }}
>go to child 2</button>
```

Update the views with `change`

```tsx
import {change, h, IPage, ultraBuilder} from "spiel-ultradom";
import {IState} from "../interfaces";

export const page4: IPage = {
    state: {
        title: "Hello brother",
    },

    view: (state: IState<void, void>) => {
        return (
            <div>
                <h1>{state.title}</h1>
                <h2>{state.defaultProps}</h2>
                <button
                    onclick ={() => {
                        state.title = "Yes brother";
                        change(page4.view, state);
                    }}
                >Change Title</button>
                <a href="/home" data-navigo>go to root</a>
            </div>
        );
    },
};
```

Use the navigo API

```typescript
ultraBuilder.setRouter({ rootPath: "http://localhost:9876/",
                        useHash: true });

ultraBuilder.router.pause();
ultraBuilder.router.on("/child/:number", (params) => {
    const state: {params: any} = { params: {}};
    Object.assign(state, page2.state);
    state.params = params;
    change(testPage2.view, state);
});
ultraBuilder.router.resume();
ultraBuilder.resolve();
ultraBuilder.go("/child/6");
```

Create the tsconfig file in case of using typescript

```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "sourceMap": true,
        "strict": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "declaration": true,
        "outDir": "./lib",
        "rootDir": ".",
        "jsx": "react",
        "jsxFactory": "h"
    },
    "include": [
        "./src",
        "./example"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

test your code

```typescript
import { assert, expect } from "chai";
import { VNode} from "ultradom";
import { h } from "spiel-ultradom;

import {componentTest} from "./mocks";

describe("Component", () => {
    let nodes: VNode<any>;
    before(() => {
        nodes = h(componentTest.view, componentTest.state);
    });
    it("has to be created", () => {
        const text: any = nodes.children.find((node: any) => node.name === "span");
        expect(text.children[0]).has.to.be.equal("This is a component");
    });

    it("has to exist its children", () => {
        const child: any = nodes.children.find((node: any) => node.name === "div");
        const text: any = child.children.find((node: any) => node.name === "span");
        expect(text.children[0]).has.to.be.equal("And this is its child");
    });
});
```

## Run Spiel Ultradom test

`yarn test` or `npm test`

## License

Spiel Ultradom is MIT licensed. See [license](README.md)