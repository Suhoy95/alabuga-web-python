import React from "react";
import { Modal, Button, Form, Input, InputNumber, Radio } from 'antd';
import reqwest from "reqwest";
import XCSRFHeaders from "./reqwest-headers";

const CreateForm = ({ visible, loading, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const cancelFunc = () => {
    form.resetFields();
    onCancel();
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };


  return (
    <Modal
      visible={visible}
      title="Добавить новый вид товара"
      onOk={onOk}
      onCancel={cancelFunc}
      footer={[
        <Button key="back" onClick={cancelFunc}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" disabled={loading} loading={loading} onClick={onOk}>
          Создать
        </Button>
      ]}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          quantity: 0,
          measure_unit: "шт",
          cost: 0,
        }}
      >
        <Form.Item
          name="name"
          label="Название товара"
          rules={[{
            required: true,
            message: "Пожалуйста, укажите название товара!"
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Количество"
          required
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="measure_unit"
          label="Единица измерения"
          required
        >
          <Radio.Group>
            <Radio value="шт">штука</Radio>
            <Radio value="кг">килограмм</Radio>
            <Radio value="л">литр</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="cost"
          label="Цена"
          required
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
}


export default class CreateResourceModal extends React.Component {

  constructor() {
    super();
    this.state = {
      visible: false,
      loading: false,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSave = (values) => {
    this.setState({ loading: true });
    console.log(values);
    reqwest({
      url: '/resources/',
      method: 'post',
      type: 'json',
      headers: XCSRFHeaders(),
      data: values,
    }).then((data) => {
      this.props.onCreate();
      this.setState({ loading: false, visible: false });
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Добавить новый вид товара
        </Button>
        <CreateForm
          loading={loading}
          visible={visible}
          onCreate={this.handleSave}
          onCancel={this.handleCancel}
        />
      </>
    );
  }
}
