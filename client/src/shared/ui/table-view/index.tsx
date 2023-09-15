import {ColumnView} from "@/shared/ui/column-view";
import {ColumnType} from "@/shared/types";

type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnType<T, K>>;
}

export const TableView = <T, K extends keyof T>({data, columns}: TableProps<T, K>): JSX.Element => {
    return (
        <div>
            <ColumnView data={data} columns={columns}/>
        </div>
    );
};
