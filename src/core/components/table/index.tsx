import {Table, Input, Button, Popconfirm, Dropdown} from "antd";
import type { ColumnsType } from "antd/es/table";
import {DeleteOutlined, EditOutlined, MoreOutlined} from "@ant-design/icons";
import {type JSX, useState} from "react";

export interface ActionPropItem {
    label: string
    key: string
    icon: JSX.Element
    onClick: () => void
    danger?: undefined
}

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
    onCreate: () => void;
    onEdit: (record: T) => void;
    onDelete: (id: string) => void;
    actionColumns?: (record: T) => ActionPropItem[];
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
                                                                     actionColumns,
                                                                 }: Props<T>) {

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const showPopconfirm = (id: string) => setDeleteId(id);
    const closePopconfirm = () => setDeleteId(null);

    const actionColumn: undefined | ColumnsType<T>[number] =
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => {
                let menuProps = {
                    items: [
                        {
                            label: "Sửa",
                            key: '1',
                            icon: <EditOutlined/>,
                            onClick: () => onEdit(record)
                        },
                        {
                            label: "Xóa",
                            key: '2',
                            icon: <DeleteOutlined />,
                            onClick: () => showPopconfirm(record._id),
                            danger: true
                        },
                    ]
                };
                if(actionColumns?.length != null && actionColumns.length > 0) {
                    menuProps.items.push(
                        ...actionColumns(record)
                    )
                }
                return <>
                        <Dropdown menu={menuProps}>
                            <Button icon={<MoreOutlined />}></Button>
                        </Dropdown>
                        <Popconfirm
                            title="Xóa bản ghi này?"
                            open={deleteId === record._id}
                            onCancel={closePopconfirm}
                            onConfirm={() => onDelete(record.id)}
                            cancelText={"Đóng"}
                            okText={"Đồng ý"}
                        />
                    </>
            },
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
