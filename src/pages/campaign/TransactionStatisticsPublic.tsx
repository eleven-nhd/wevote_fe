import {useEffect, useState} from "react";
import {Button, Col, Row, Table} from "antd";
import {useParams} from "react-router-dom";
import {CampaignsService} from "../../api/services/CampaignsService.ts";
import TransactionStatisticsChart from "./TransactionStatisticsChart.tsx";

const TransactionStatisticsPublic = () => {
    const [listVote, setListVote] = useState<any[]>([]);
    const {id} = useParams();
    useEffect(() => {
        CampaignsService.getListVoteTransaction({ campaignId: id as any }).then(res => {
            setListVote(Array.isArray(res) ? [...res] : res);
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
            <Row gutter={[16,16]} className={"p-5"}>
                <Col span={24}>
                    <h1 className={"text-center"} style={{color: "#13463d", fontWeight: 600}}>KẾT QUẢ CÔNG BỐ CHIẾN DỊCH</h1>
                </Col>

                <Col span={12}>
                    <Table
                        columns={columns}
                        dataSource={listVote}
                        rowKey={(record) => record._id || record.id}
                    />
                </Col>
                <Col span={12}>
                    <TransactionStatisticsChart data={listVote} />
                </Col>
            </Row>
        </>
    );
}
export default TransactionStatisticsPublic;