import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../stores";
import {useEffect} from "react";
import {BaseTableCrud} from "../../core/components/table";
import DateUtil from "../../core/utils/dateUtil.ts";
import {transactionActions} from "../../stores/transactionSlice.ts";
import {Col, Form} from "antd";
import BaseSelect from "../../core/components/BaseSelect.tsx";
import {useSelectVote} from "../../core/select/voteSelectOption.ts";
import {socket} from "../../core/configs/socket.ts";

const TransactionPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, total, filters, loading, page, pageSize } = useSelector((s: RootState) => s.transaction);
    useEffect(() => {
        dispatch(transactionActions.getPage({page: page, filters: filters, size: pageSize}));
    }, [page, filters, pageSize]);

    // websocket
    useEffect(() => {
        socket.on('table:update', (msg: any) => {
            if (msg?.type === 'CREATE' || msg?.type === 'UPDATE') {
                dispatch(transactionActions.getPage({ page, filters, size: pageSize }));
            }
        });

        return () => {
            socket.off('table:update');
        };
    }, [dispatch, page, filters, pageSize]);

    const columns = [
        {
            dataIndex: "_id",
            key: "_id",
            hidden: true
        },
        {
            title: "VoterId",
            dataIndex: "voterId",
            key: "voterId"
        },
        {
            title: "Vote",
            dataIndex: "vote",
            render: (_value: any, record: any) => (
                record.voteId.name
            )
        },
        {
            title: "Điểm",
            dataIndex: "choose",
            key: "choose",
        },
        {
            title: "Ngày tham gia",
            dataIndex: "creationTime",
            key: "creationTime",

            render: (_value: any) => DateUtil.toFormat(_value, 'DD/MM/YYYY HH:mm')
        }
    ];

    return (
        <>
            <BaseTableCrud
                columns={columns}
                data={list}
                total={total}
                page={page}
                breadcrumbs={[
                    {
                        href: '/page/transaction',
                        title: 'Thống kê vote',
                    },
                ]}
                loading={loading}
                extraSearchFields={
                    <Col span={4}>
                        <Form.Item name={"voteId"} >
                            <BaseSelect
                                fetchOptions={useSelectVote}
                                placeholder={"Chọn vote"}
                                style={{width: "100%"}}
                            />
                        </Form.Item>
                    </Col>
                }
                onFilterChange={(kw) => dispatch(transactionActions.applyFilters(kw))}
                onResetFilter={() => dispatch(transactionActions.resetFilters())}
                onPageChange={(p) => dispatch(transactionActions.setPage(p))}
            />
        </>
    );
}
export default TransactionPage;