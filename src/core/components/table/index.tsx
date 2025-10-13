import {Table, Input, Space, Button, Popconfirm} from "antd";
import type { ColumnsType } from "antd/es/table";

interface Props<T> {
    columns: ColumnsType<T>;
    data: T[];
    total: number;
    page: number;
    keyword: string;
    loading: boolean;
    pageSize?: number;
    onSearch: (keyword: string) => void;
    onPageChange: (page: number) => void;
    onCreate?: () => void;
    onEdit?: (record: T) => void;
    onDelete?: (id: string) => void;
}

export function BaseTableCrud<T extends { id: string }>({
                                                                     columns,
                                                                     data,
                                                                     total,
                                                                     page,
                                                                     keyword,
                                                                     loading,
                                                                     pageSize = 10,
                                                                     onSearch,
                                                                     onPageChange,
                                                                     onCreate,
                                                                     onEdit,
                                                                     onDelete,
                                                                 }: Props<T>) {
    const actionColumn: undefined | ColumnsType<T>[number] =
        (onEdit || onDelete) && {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space>
                    {onEdit && <Button onClick={() => onEdit(record)}>Sửa</Button>}
                    {onDelete && (
                        <Popconfirm title="Xóa bản ghi này?" onConfirm={() => onDelete(record.id)}>
                            <Button danger>Xóa</Button>
                        </Popconfirm>
                    )}
                </Space>
            ),
        } as ColumnsType<T>[number];
    return (
        <div>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
                <Input.Search
                    placeholder="Tìm kiếm..."
                    allowClear
                    value={keyword}
                    onChange={(e) => onSearch(e.target.value)}
                    onSearch={onSearch}
                    style={{ width: 300 }}
                />
                {onCreate && <Button type="primary" onClick={onCreate}>Thêm mới</Button>}
            </div>
            <Table
                rowKey="id"
                columns={actionColumn ? [...columns, actionColumn] : columns}
                dataSource={data}
                loading={loading}
                pagination={{
                    current: page,
                    total,
                    pageSize,
                    onChange: (p) => onPageChange(p),
                }}
            />
        </div>
    );
}
