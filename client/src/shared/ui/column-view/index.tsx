import {getColumnColumnCount} from "@/shared/lib/getColumnColumnCount";
import {ColumnType} from "@/shared/types";
import styles from "./styles.module.scss";
import {Fragment} from "react";

type ColumnViewProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnType<T, K>>;
}

export const ColumnView = <T, K extends keyof T>({data, columns}: ColumnViewProps<T, K>): JSX.Element => {
    const rows = data.map((row, index) => {
        return (
            <div className={styles.columnRow} key={`row-${index}`}>
                {columns.map((column, index2) => {
                        return (
                            <Fragment key={`cell-${index2}`}>
                                <div className={styles.columnItem}>
                                    <h3>{column.header}</h3>
                                    <div
                                        style={{
                                            columnCount: getColumnColumnCount({
                                                //@ts-ignore
                                                data: row[column.key],
                                                maxColumnCount: 5
                                            })
                                        }}
                                    >
                                        {/*@ts-ignore*/}
                                        {row[column.key]?.map((item, itemIndex: number) => (
                                            <div key={`item-${itemIndex}`}>
                                                {/*@ts-ignore*/}
                                                {column.customRender ? column.customRender(item) : item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {index2 !== columns.length - 1 && <hr/>}
                            </Fragment>
                        );
                    }
                )}

            </div>
        );
    });
    return (
        <div>
            {rows}
        </div>
    );
};
