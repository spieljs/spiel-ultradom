export interface ITestState<Params, LastState> {
    title: string;
    text?: string;
    defaultProps: string;
    query: string;
    params: Params;
    lastState: LastState;
}
