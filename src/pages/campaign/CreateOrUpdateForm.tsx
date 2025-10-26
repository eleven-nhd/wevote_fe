import {Checkbox, Col, Form, type FormInstance, Input, Row} from "antd";
import {UploadImage} from "../../core/components/ImageUpload.tsx";
import BaseDateRange from "../../core/components/BaseDateRange.tsx";
import {getCookie} from "../../core/utils/cookieUtil.ts";

export const CreateOrUpdateCampaignForm = (props: {form: FormInstance}) => {
    const  userId = getCookie("userId");
    return (
        <Row gutter={16}>
          <Col span={20}>
              <Row gutter={16}>
                  <Col span={24} style={{marginBottom: 0}}>
                      <Form.Item name={"userId"} initialValue={userId} hidden />
                      <Form.Item name="name" label="Tên chiến dịch" rules={[{ required: true, message: "Tên chiến dịch bắt buộc nhập" }]}>
                          <Input allowClear/>
                      </Form.Item>
                  </Col>
                  <Col span={24} style={{marginBottom: 0}}>
                      <Form.Item name="description" label="Mô tả" >
                          <Input allowClear/>
                      </Form.Item>
                  </Col>
              </Row>
          </Col>
          <Col span={4}>
              <div className={"h-full flex items-center mt-3"}>
                  <Form.Item name={"featureImage"}>
                      <UploadImage />
                  </Form.Item>
              </div>
          </Col>
          <Col span={24}>
              <BaseDateRange form={props.form}/>
          </Col>
          <Col span={24}>
              <Form.Item name={"publicResult"}>
                  <Checkbox defaultChecked={true}>Công khai</Checkbox>
              </Form.Item>
          </Col>
        </Row>
  );
}