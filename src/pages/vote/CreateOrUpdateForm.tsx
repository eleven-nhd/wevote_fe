import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    type SelectProps,
} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import "./style.css";
import {UploadImage} from "../../core/components/ImageUpload.tsx";
import BaseSelect from "../../core/components/BaseSelect.tsx";
import {useSelectCampaign} from "../../core/select/campaignSelectOption.ts";

export const CreateOrUpdateVoteForm = () => {
    const options: SelectProps['options'] = [
        {
            value: "Bách khoa Hà nội",
            label: "Bách khoa Hà nội"
        },
        {
            value: "Beefsteak",
            label: "Beefsteak"
        },
        {
            value: "Pizza",
            label: "Pizza"
        }
    ];
  return (
      <Row gutter={16}>
          <Col span={20}>
              <Row gutter={16}>
                  <Col span={24} style={{marginBottom: 0}}>
                      <Form.Item name="name" label="Tên vote" rules={[{ required: true, message: "Tên vote bắt buộc nhập" }]}>
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
                  <Form.Item name={"featureImage"} initialValue={"no image"}>
                      <UploadImage />
                  </Form.Item>
              </div>
          </Col>
          <Col span={24}>
              <Form.Item name="tags" label="Tags" >
                  <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Nhập"
                      options={options}
                  />
              </Form.Item>
          </Col>
          <Col span={24}>
              <Form.Item name={"campaignId"} label={"Chiến dịch"}>
                  <BaseSelect fetchOptions={useSelectCampaign}/>
              </Form.Item>
          </Col>
          <Col span={24}>
              <p>Danh sách lựa chọn</p>
              <div className={"option-container p-3 my-2"}>
                  <Form.List name="options" initialValue={[{point: 1, option: "Lựa chọn 1"}]}>
                      {(fields, { add, remove }) => (
                          <>
                              {fields.map(({ key, name, ...restField }) => (
                                  <Row gutter={16} key={key} >
                                      <Col span={4}>
                                          <Form.Item
                                              {...restField}
                                              name={[name, 'point']}
                                              rules={[{ required: true, message: 'Điểm bắt buộc nhập' }]}
                                              initialValue={1}
                                          >
                                              <InputNumber style={{width: "100%"}} min={0} placeholder="Nhập" />
                                          </Form.Item>
                                      </Col>
                                      <Col span={18}>
                                          <Form.Item
                                              {...restField}
                                              name={[name, 'option']}
                                              rules={[{ required: true, message: 'Lựa chọn bắt buộc nhập' }]}
                                          >
                                              <Input style={{width: "100%"}} placeholder="Nhập" />
                                          </Form.Item>
                                      </Col>
                                      <Col span={2}>
                                          <Button danger onClick={() => remove(name)}>
                                              <DeleteOutlined />
                                          </Button>
                                      </Col>
                                  </Row>
                              ))}
                              <Form.Item>
                                  <Button type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
                                      Thêm lựa chọn
                                  </Button>
                              </Form.Item>
                          </>
                      )}
                  </Form.List>
              </div>
          </Col>
      </Row>
  )
}