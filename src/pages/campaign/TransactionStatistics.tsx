import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {BaseBreadcrumb} from "../../components/BaseBreadcrumb.tsx";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {Button, Col, Row, Table} from "antd";
import {useParams} from "react-router-dom";
import {CampaignsService} from "../../api/services/CampaignsService.ts";
import TransactionStatisticsChart from "./TransactionStatisticsChart.tsx";
import {socket} from "../../core/configs/socket.ts";

const TransactionStatistics = () => {
    const navigate = useNavigate();
    const backToCampaign = () => {
        navigate(-1);
    }
    const [listVote, setListVote] = useState<any[]>([]);
    const {id} = useParams();
    useEffect(() => {
        CampaignsService.getListVoteTransaction({ campaignId: id as any }).then(res => {
            console.debug('initial load listVote, items=', Array.isArray(res) ? res.length : res);
            setListVote(Array.isArray(res) ? [...res] : res);
        })
    }, [id]);

    // websocket
    useEffect(() => {
        if (!id) return;
        const handleListVoteUpdate = (msg: any) => {
            console.debug('socket listVote:update received', msg, 'for campaignId', id);
            const isRelevantType = msg?.type === 'CREATE' || msg?.type === 'UPDATE';
            const isForThisCampaign = !msg?.campaignId || String(msg.campaignId) === String(id);
            if (isRelevantType && isForThisCampaign) {
                console.debug('listVote:update is relevant, reloading list for campaign', id);
                CampaignsService.getListVoteTransaction({ campaignId: id as any })
                    .then(res => {
                        console.debug('reloaded listVote, items=', Array.isArray(res) ? res.length : res);
                        setListVote(Array.isArray(res) ? [...res] : res);
                    })
                    .catch(err => {
                        console.error('Failed to reload listVote after socket update', err);
                    });
            } else {
                console.debug('listVote:update not relevant to this campaign, ignoring', { isRelevantType, isForThisCampaign, id });
            }
        };

        console.debug('registering socket listener for listVote:update, campaignId=', id);
        socket.on('listVote:update', handleListVoteUpdate);

        return () => {
            console.debug('unregistering socket listener for listVote:update, campaignId=', id);
            socket.off('listVote:update', handleListVoteUpdate);
        };
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
                <Col span={24}>
                    <p className={"font-medium mb-3"}>URL: {`${import.meta.env.VITE_FRONTEND_URL}/page/campaign/statistics/public/${id}`}</p>
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
export default TransactionStatistics;