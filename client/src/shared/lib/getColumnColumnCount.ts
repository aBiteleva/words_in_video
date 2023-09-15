const MAX_ROWS_COUNT = 40;

type ColumnCountType<T> = {
    data: T[],
    maxColumnCount: number
}
export const getColumnColumnCount = <T>({data, maxColumnCount=7}: ColumnCountType<T>) => (
    data?.length / MAX_ROWS_COUNT <= maxColumnCount
        ? `calc(${data?.length} / ${MAX_ROWS_COUNT})`
        : maxColumnCount
);
