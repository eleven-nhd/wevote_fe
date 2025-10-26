import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../stores";
import {useEffect, useState} from "react";
import {Form, Modal} from "antd";
import {BaseTableCrud} from "../../core/components/table";
import {campaignActions} from "../../stores/campainSlice.js";
import {CreateOrUpdateCampaignForm} from "./CreateOrUpdateForm.tsx";

const CampaignPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, total, loading, page, keyword, pageSize } = useSelector((s: RootState) => s.campaign);

    const [isModalOpen, setModalOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<any>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(campaignActions.getPage({page: page, keyword: keyword, size: pageSize}));
    }, [page, keyword, pageSize]);

    const columns = [
        { dataIndex: "_id", key: "_id", hidden: true },
        { title: "Tên chiến dịch", dataIndex: "name", key: "name" },
        { title: "Mô tả", dataIndex: "description", key: "description" }
    ];

    const handleSubmit = async () => {
        const values = await form.validateFields();
        if (editRecord) {
            await dispatch(campaignActions.updateData({ id: editRecord._id, data: values }));
        } else {
            await dispatch(campaignActions.createData(values));
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
                onSearch={(kw) => dispatch(campaignActions.setKeyword(kw))}
                onPageChange={(p) => dispatch(campaignActions.setPage(p))}
                onCreate={() => setModalOpen(true)}
                onEdit={(record) => {
                    setEditRecord(record);
                    form.setFieldsValue(record);
                    setModalOpen(true);
                }}
                onDelete={(id) => dispatch(campaignActions.deleteData(id))}
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
                    <CreateOrUpdateCampaignForm form={form}/>
                </Form>
            </Modal>
        </>
    );
}
export default CampaignPage;