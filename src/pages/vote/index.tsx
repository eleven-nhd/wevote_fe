import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../stores";
import {useEffect, useState} from "react";
import {Col, Form, Modal} from "antd";
import {BaseTableCrud} from "../../core/components/table";
import {voteActions} from "../../stores/voteSlice.ts";
import {CreateOrUpdateVoteForm} from "./CreateOrUpdateForm.tsx";
import DateUtil from "../../core/utils/dateUtil.ts";
import BaseSelect from "../../core/components/BaseSelect.tsx";
import {useSelectCampaign} from "../../core/select/campaignSelectOption.ts";
import {ColumnsType} from "antd/es/table";

const VotePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, total, loading, page, filters, pageSize } = useSelector((s: RootState) => s.vote);

    const [isModalOpen, setModalOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<any>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(voteActions.getPage({page: page, filters: filters, size: pageSize}));
    }, [page, filters, pageSize]);

    const columns: ColumnsType = [
        { dataIndex: "_id", key: "_id", hidden: true },
        {
            title: "Tên vote",
            dataIndex: "name",
            key: "name" ,
            align: "center",
            width: 300
        },
        {
            title: "Chiến dịch",
            key: "campaign",
            align: "center",
            width: 300,
            render: (_value: any, record: any) => <p>{record.campaignId?.name}</p>
        },
        {
            title: "Ngày tạo",
            dataIndex: "creationTime",
            key: "creationTime",
            align: "center",
            width: 300,
            render: (_value: any) => DateUtil.toFormat(_value, 'DD/MM/YYYY HH:mm')
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
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
                loading={loading}
                breadcrumbs={[
                    {
                        href: '/page/vote',
                        title: 'Vote',
                    },
                ]}
                onFilterChange={(kw) => dispatch(voteActions.applyFilters(kw))}
                onResetFilter={() => dispatch(voteActions.resetFilters())}
                onPageChange={(p) => dispatch(voteActions.setPage(p))}
                onCreate={() => setModalOpen(true)}
                extraSearchFields={
                    <Col span={4}>
                        <Form.Item name={"campaignId"} >
                            <BaseSelect
                                fetchOptions={useSelectCampaign}
                                placeholder={"Chọn chiến dịch"}
                                style={{width: "100%"}}
                            />
                        </Form.Item>
                    </Col>
                }
                onEdit={(record) => {
                    setEditRecord(record);
                    form.setFieldsValue({
                        ...record,
                        campaignId: record.campaignId._id
                    });
                    setModalOpen(true);
                }}
                onDelete={(id) => dispatch(voteActions.deleteData(id))}
            />

            <Modal
                title={editRecord ? "Sửa vote" : "Thêm vote"}
                width={800}
                style={{top: 30}}
                open={isModalOpen}
                onOk={handleSubmit}
                cancelText={"Đóng"}
                okText={"Lưu"}
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