import { IGenericHooks, IHooks} from "spiel-build";

export const hooks: IHooks = {
    after: (params: {number: number}) => {
        if (params) {
            params.number = +params.number + 2;
        }
    },
    already: (params: {number: number}) => {
        if (params) {
            params.number = +params.number + 2;
        }
    },
    before: (done: (suppress?: boolean) => void, params: {number: number}) => {
        if (params) {
            params.number = +params.number + 2;
        }
        done();
    },
    leave: (params: {number: number}) => {
        if (params) {
            params.number = +params.number + 2;
        }
    },
};

export const genericHooks: IGenericHooks = {
    after: (params: {number: number}) => {
        if (params && params.number) {
            params.number = +params.number + 2;
        }
    },
    before: (done: (suppress?: boolean) => void, params: {number: number}) => {
        if (params && params.number) {
            params.number = +params.number + 2;
        }
        done();
    },
};
