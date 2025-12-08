import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../stores";
import {useEffect, useState} from "react";
import {Form, Modal} from "antd";
import {BaseTableCrud} from "../../core/components/table";
import {voteActions} from "../../stores/voteSlice.ts";
import {CreateOrUpdateVoteForm} from "./CreateOrUpdateForm.tsx";

const VotePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, total, loading, page, keyword, pageSize } = useSelector((s: RootState) => s.vote);

    const [isModalOpen, setModalOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<any>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(voteActions.getPage({page: page, keyword: keyword, size: pageSize}));
    }, [page, keyword, pageSize]);

    const columns = [
        { dataIndex: "_id", key: "_id", hidden: true },
        { title: "Tên vote", dataIndex: "name", key: "name" },
        { title: "Mô tả", dataIndex: "description", key: "description" }
    ];

    const handleSubmit = async () => {
        const values = await form.validateFields();
        if (editRecord) {
            await dispatch(voteActions.updateData({ id: editRecord._id, data: values }));
        } else {
            await dispatch(voteActions.createData(values));
        }
        setModalOpen(false);
        setEditRecord(null);
        form.resetFields();
    };

    return (
        <>
            <BaseTableCrud
                columns={columns}
                data={list}
                total={total}
                page={page}
                keyword={keyword}
                loading={loading}
                onSearch={(kw) => dispatch(voteActions.setKeyword(kw))}
                onPageChange={(p) => dispatch(voteActions.setPage(p))}
                onCreate={() => setModalOpen(true)}
                onEdit={(record) => {
                    setEditRecord(record);
                    form.setFieldsValue(record);
                    setModalOpen(true);
                }}
                onDelete={(id) => dispatch(voteActions.deleteData(id))}
            />

            <Modal
                title={editRecord ? "Sửa vote" : "Thêm vote"}
                width={800}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => {
                    setModalOpen(false);
                    setEditRecord(null);
                    form.resetFields();
                }}
            >
                <Form form={form} layout="vertical">
                    <CreateOrUpdateVoteForm />
                </Form>
            </Modal>
        </>
    );
}
export default VotePage;