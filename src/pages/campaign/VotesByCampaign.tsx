import {Button, Col, Input, QRCode, Row} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CampaignsService} from "../../api/services/CampaignsService.ts";
import FormItem from "antd/es/form/FormItem";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {BaseBreadcrumb} from "../../components/BaseBreadcrumb.tsx";

const ListVoteByCampaign = () => {
    const navigate = useNavigate();
    const backToCampaign = () => {
      navigate(-1);
    }
    const [listVote, setListVote] = useState<any[]>([]);
    const {id} = useParams();
    useEffect(() => {
        CampaignsService.getListVote({ campaignId: id as any }).then(res => {
            setListVote(res)
        })
    }, [id]);

    return (
      <div className={"p-3"}>
          <BaseBreadcrumb
              items={[
                  {
                      href: '/page/campaign',
                      title: 'Chiến dịch',
                  },
                  {
                      title: 'Danh sách vote',
                  },
              ]}
              extraButton={
                  <Button icon={<ArrowLeftOutlined />} onClick={backToCampaign}>Quay lại</Button>
              }
          />

          <Row gutter={32}>
              {
                  listVote?.map((item: any) => (
                      <Col span={12}>
                          <Row gutter={16}>
                              <Col span={6} style={{display: "flex", alignItems: "center", justifyContent: "start"}}>
                                  <QRCode value={`${import.meta.env.VITE_FRONTENT_URL}/page/campaign/${id}/${item._id}`} />
                              </Col>
                              <Col span={18}>
                                  <FormItem label={"Tên"} layout="vertical">
                                      <Input value={item?.name} readOnly style={{width: "100%"}}/>
                                  </FormItem>
                                  <FormItem label={"Mô tả"} layout="vertical">
                                      <Input.TextArea value={item?.description} readOnly rows={3} style={{width: "100%"}}/>
                                  </FormItem>
                              </Col>
                          </Row>
                          <FormItem label={"Url"} >
                              <Input value={`${import.meta.env.VITE_FRONTENT_URL}/page/campaign/${id}/${item._id}`} readOnly style={{width: "100%"}}/>
                          </FormItem>
                      </Col>
                  ))
              }
          </Row>
      </div>
    )
}

export default ListVoteByCampaign