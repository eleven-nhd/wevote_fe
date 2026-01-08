import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../stores";
import {useEffect, useState} from "react";
import {Form, Modal} from "antd";
import {type ActionPropItem, BaseTableCrud} from "../../core/components/table";
import {campaignActions} from "../../stores/campainSlice.js";
import {CreateOrUpdateCampaignForm} from "./CreateOrUpdateForm.tsx";
import dayjs from "dayjs";
import DateUtil from "../../core/utils/dateUtil.ts";
import {BarChartOutlined, StockOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const CampaignPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, total, filters, loading, page, pageSize } = useSelector((s: RootState) => s.campaign);
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<any>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(campaignActions.getPage({page: page, filters: filters, size: pageSize}));
    }, [page, filters, pageSize]);

    const columns = [
        {
            dataIndex: "_id",
            key: "_id",
            hidden: true
        },
        {
            title: "Tên chiến dịch",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startTime",
            key: "startTime",

            render: (_value: any) => DateUtil.toFormat(_value, 'DD/MM/YYYY')
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endTime",
            key: "endTime",

            render: (_value: any) => DateUtil.toFormat(_value, 'DD/MM/YYYY')
        }
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
                loading={loading}
                breadcrumbs={[
                    {
                        href: '/page/campaign',
                        title: 'Chiến dịch',
                    },
                ]}
                onFilterChange={(kw) => dispatch(campaignActions.applyFilters(kw))}
                onResetFilter={() => dispatch(campaignActions.resetFilters())}
                onPageChange={(p) => dispatch(campaignActions.setPage(p))}
                onCreate={() => setModalOpen(true)}
                onEdit={(record) => {
                    setEditRecord(record);
                    form.setFieldsValue({
                        ...record,
                        startTime: dayjs(record?.startTime),
                        endTime: dayjs(record?.endTime),
                    });
                    setModalOpen(true);
                }}
                onDelete={(id) => dispatch(campaignActions.deleteData(id))}
                actionColumns={(record) => [
                    {
                        label: "Danh sách vote",
                        key: "detail",
                        icon: <BarChartOutlined />,
                        onClick: () => {
                            navigate("/page/campaign/" + record._id)
                        },
                    },
                    {
                        label: "Thống kê vote",
                        key: "statistics",
                        icon: <StockOutlined />,
                        onClick: () => {
                            navigate("/page/campaign/statistics/" + record._id)
                        },
                    },
                ] as ActionPropItem[]}
            />

            <Modal
                title={editRecord ? "Sửa chiến dịch" : "Thêm chiến dịch"}
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
                    <CreateOrUpdateCampaignForm form={form}/>
                </Form>
            </Modal>
        </>
    );
}
export default CampaignPage;