import {Button, Col, Form, Radio, Row} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getCookie, setCookie} from "../../core/utils/cookieUtil.ts";
import {generateUUID} from "../../core/utils/commonUtil.ts";
import {VotesService} from "../../api/services/VotesService.ts";

const VoteForm = () => {
    const {voteId} = useParams();
    const [form] = Form.useForm();
    const [voteInfo, setVoteInfo] = useState<any>([]);
    useEffect(() => {
        const voterId = getCookie("voterId");
        if(!voterId) {
            setCookie("voterId", generateUUID());
        }
        VotesService.getById({ id: voteId as any }).then(res => {
            setVoteInfo(res);
        })
    }, [voteId]);
    const submitVote = () => {
        console.log(form.getFieldsValue());
    }

  return (
      <Form
          form={form}
          onFinish={submitVote}
      >
          <h2>{voteInfo?.campaignId?.name}</h2>
          <p>{voteInfo?.campaignId?.description}</p>
          <p>{voteInfo?.name}</p>
          <p>{voteInfo?.description}</p>
          <Form.Item name={"choose"}>
              <Radio.Group>
                  <Row gutter={16}>
                      {
                          voteInfo?.options?.map((option: any, index: number) => (
                              <Col span={24}>
                                  <Radio value={index}>{option?.option}</Radio>
                              </Col>
                          ))
                      }
                  </Row>
              </Radio.Group>
          </Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
  )
}
export default VoteForm;