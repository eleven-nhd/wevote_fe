import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {BaseBreadcrumb} from "../../components/BaseBreadcrumb.tsx";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {Button, Col, Row, Table} from "antd";
import {useParams} from "react-router-dom";
import {CampaignsService} from "../../api/services/CampaignsService.ts";
import TransactionStatisticsChart from "./TransactionStatisticsChart.tsx";

const TransactionStatistics = () => {
    const navigate = useNavigate();
    const backToCampaign = () => {
        navigate(-1);
    }
    const [listVote, setListVote] = useState<any[]>([]);
    const {id} = useParams();
    useEffect(() => {
        CampaignsService.getListVoteTransaction({ campaignId: id as any }).then(res => {
            setListVote(res)
        })
    }, [id]);

    const columns = [
        {
            dataIndex: "_id",
            key: "_id",
            hidden: true
        },
        {
            title: "Vote",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Số lượt vote",
            dataIndex: "totalTransaction",
            key: "totalTransaction"
        },
        {
            title: "Tổng điểm",
            dataIndex: "totalChoose",
            key: "totalChoose"
        },
    ];


    return (
        <>
            <BaseBreadcrumb
                items={[
                    {
                        href: '/page/campaign',
                        title: 'Chiến dịch',
                    },
                    {
                        title: 'Thống kê vote',
                    },
                ]}
                extraButton={
                    <Button icon={<ArrowLeftOutlined />} onClick={backToCampaign}>Quay lại</Button>
                }
            />
            <Row gutter={16}>
                <Col span={12}>
                    <Table
                        columns={columns}
                        dataSource={listVote}
                    />
                </Col>
                <Col span={12}>
                    <TransactionStatisticsChart data={listVote} />
                </Col>
            </Row>
        </>
    );
}
export default TransactionStatistics;