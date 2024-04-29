import React, { useState } from 'react';

export type Column<T> = {
    dataIndex?: keyof T;
    title: string;
    render?: (value: any,record: any) => React.ReactNode;
    sortable?: boolean;
    align?: "start" | "center" | "end"
};

type Props<T> = {
    columns: Column<T>[];
    data: T[];
};

function Table<T>({ columns, data }: Props<T>) {

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [sortedColumn, setSortedColumn] = useState<string | null>(null);

    const handleSort = (column: Column<T>) => {
        if (column.sortable) {
            if (sortedColumn === column.dataIndex) {
                // 如果已经按照该列排序，则切换排序顺序
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            } else {
                // 如果按照其他列排序，则将排序列设置为当前列，并按升序排序
                setSortOrder('asc');
                setSortedColumn(column.dataIndex as string);
            }
        }
    };

    // 对数据进行排序
    const sortedData = sortedColumn
        ? data.slice().sort((a: any, b: any) => {
            const valueA = a[sortedColumn];
            const valueB = b[sortedColumn];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                if (valueA < valueB) {
                    return sortOrder === 'asc' ? -1 : 1;
                }

                if (valueA > valueB) {
                    return sortOrder === 'asc' ? 1 : -1;
                }
            }

            return 0;
        })
        : data;



    return (
        <div className="overflow-x-auto">
            <div style={{display:data.length===0?'':'none'}} className={`${data.length===0?'skeleton':''} w-full h-32 bg-[#a9a9a91a]`}></div>
            <table className="table" style={{display:data.length===0?'none':''}}>
                <thead>
                    <tr style={{ borderBottom: "1px #0000002a solid" }}>
                        {columns.map((column) => (
                            <th
                                key={String(column.dataIndex)}
                                onClick={() => handleSort(column)}
                                style={{ cursor: column.sortable ? 'pointer' : 'default', paddingBottom: 4 }}
                            >
                                <div style={{ display: "flex", justifyContent: column.align ?? "center", width: '100%' }}>
                                    {column.title}
                                    {column.sortable && sortedColumn === column.dataIndex && (
                                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item: any, index) => (
                        <tr key={index} style={{ borderBottom: sortedData.length === index + 1 ? "0px" : "1px #0000001a solid" }}>
                            {columns.map((column: any) => (
                                <td key={String(column.dataIndex)} >
                                    <div style={{ display: "flex", justifyContent: column.align ?? "center", width: '100%' }}>
                                        {column.render ? column.render(item[column.dataIndex]??'',item) : item[column.dataIndex]}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;