import { Modal, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import type {AppDispatch, RootState} from "../../../stores";
import {useEffect, useState} from "react";
import {userActions} from "../../../stores/userSlice.ts";
import {BaseTableCrud} from "../../../core/components/table";
import type {ColumnsType} from "antd/es/table";
import DateUtil from "../../../core/utils/dateUtil.ts";

export default function UserPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { list, total, loading, page, keyword, pageSize } = useSelector((s: RootState) => s.user);

    const [isModalOpen, setModalOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<any>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(userActions.getPage({page: page, keyword: keyword, size: pageSize}));
    }, [page, keyword, pageSize]);

    const columns: ColumnsType<any> = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
            hidden: true
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdDate",
            key: "createdDate",
            render: _value => DateUtil.toFormat(_value, 'DD/MM/YYYY')
        },
        {
            title: "Cập nhật gần nhất",
            dataIndex: "latestDate",
            key: "latestDate",
            render: _value => DateUtil.toFormat(_value, 'DD/MM/YYYY HH:mm')
        },
        {
            title: "Vai trò",
            key: "role",
            render: (_value: any, record: any) => <p>{record.roleId?.name}</p>
        },
    ];

    const handleSubmit = async () => {
        const values = await form.validateFields();
        if (editRecord) {
            await dispatch(userActions.updateData({ id: editRecord._id, data: values }));
        } else {
            await dispatch(userActions.createData(values));
        }
        setModalOpen(false);
        setEditRecord(null);
        form.resetFields();
    };

    return (
        <>
            <BaseTableCrud
                columns={columns}
                data={list}                total={total}
                page={page}
                keyword={keyword}
                loading={loading}
                onSearch={(kw) => dispatch(userActions.setKeyword(kw))}
                onPageChange={(p) => dispatch(userActions.setPage(p))}
                onCreate={() => setModalOpen(true)}
                onEdit={(record) => {
                    setEditRecord(record);
                    form.setFieldsValue(record);
                    setModalOpen(true);
                }}
                onDelete={(id) => dispatch(userActions.deleteData(id))}
            />

            <Modal
                title={editRecord ? "Sửa người dùng" : "Thêm người dùng"}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => {
                    setModalOpen(false);
                    setEditRecord(null);
                    form.resetFields();
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email bắt buộc nhập" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả" >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
