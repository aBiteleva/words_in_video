export type ColumnType<T, K extends keyof T> = {
    key: K;
    header: string;
    customRender?: (data: any) => JSX.Element;
}
