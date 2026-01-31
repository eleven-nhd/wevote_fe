import {Button, Col, Form, Radio, Row} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getCookie, setCookie} from "../../core/utils/cookieUtil.ts";
import {generateUUID} from "../../core/utils/commonUtil.ts";
import {VotesService} from "../../api/services/VotesService.ts";
import {TransactionsService} from "../../api/services/TransactionsService.ts";
import {toast} from "react-toastify";
import {InfoCircleOutlined, SendOutlined} from "@ant-design/icons";
import "./style.css"
import dayjs from "dayjs";

const VoteForm = () => {
    const {voteId} = useParams();
    const [form] = Form.useForm();
    const [voteInfo, setVoteInfo] = useState<any>([]);
    const [transactionsInfo, setTransactionsInfo] = useState<any>({});
    //kiểm tra người dùng đã từng vote chưa
    useEffect(() => {
        const voterId = getCookie("voterId");
        if(!voterId) {
            setCookie("voterId", generateUUID());
        } else {
            TransactionsService.getByVoterAndVote({
                voterId: voterId,
                voteId: voteId as any
            }).then(res => {
                setTransactionsInfo(res);
            })
        }
        VotesService.getById({ id: voteId as any }).then(res => {
            setVoteInfo(res);
        })
    }, [voteId]);

    const submitVote = () => {
        TransactionsService.create({
            body: {
                ...form.getFieldsValue(),
                voterId: getCookie("voterId"),
                voteId: voteInfo?._id,
                campaignId: voteInfo?.campaignId?._id,
                creatorCampaignId: voteInfo?.creatorId
            }
        }).then(res => {
            if(res){
                toast.success(res.message ?? "Gửi bình chọn thành công");
            } else {
                toast.error("Gửi bình chọn thất bại");
            }

        }).catch(err => {
            console.log(err)
            toast.error(err?.response?.data?.message ?? "Gửi bình chọn thất bại");
        })
    }

  return (
      <Form
          form={form}
          onFinish={submitVote}
      >
          <div className={"w-full p-3 text-center"} style={{height:'100vh'}}>
              <div className={"h-full vote-form"}>
                  <h2 style={{fontSize: 24}} className={"primary-header-text"}>
                      {voteInfo?.campaignId?.name}
                  </h2>
                  <p>{voteInfo?.campaignId?.description}</p>
                  <img src={voteInfo?.featureImage} alt="avatar" height={80} width={80} style={{display: "inline"}} />
                  <p style={{fontSize: 20, marginTop: 16}} className={"font-medium primary-bold-text"}>{voteInfo?.name}</p>
                  <p>{voteInfo?.description}</p>
                  <Form.Item name={"creationTime"} initialValue={dayjs()} hidden/> //ghi nhận thời gian vote
                  {
                      transactionsInfo != null ?
                          <p><InfoCircleOutlined /> Bạn đã tham gia bình chọn với <span className={"font-medium"}>{voteInfo?.options?.filter((x: any) => x?.point === transactionsInfo.choose)[0]?.option}</span>. Nếu gửi thêm bình chọn kết quả sẽ được cập nhật lại theo lựa chọn mới nhất.</p> :
                          null
                  }
                  <div className={"mt-3 flex justify-center"}>
                      <div style={{maxWidth: 300, backgroundColor: "#DDF4E7", borderRadius: 8, padding: "10px"}} >
                          <Form.Item name={"choose"}>
                              <Radio.Group> //chọn 1 phương án
                                  <Row gutter={16}>
                                      {
                                          voteInfo?.options?.map((option: any) => (
                                              <Col span={24} className={"mt-2 text-left"}>
                                                  <Radio value={option?.point ?? 0}>
                                                      <p className={"font-medium primary-bold-text"} style={{fontSize: 16}}>{option?.option}</p>
                                                  </Radio>
                                              </Col>
                                          ))
                                      }
                                  </Row>
                              </Radio.Group>
                          </Form.Item>
                      </div>

                  </div>

                  <Button className={"mt-5"} type="primary" htmlType="submit" icon={<SendOutlined/>}>Gửi</Button>
              </div>
          </div>
      </Form>
  )
}
export default VoteForm;