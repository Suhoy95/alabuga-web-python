import React from "react";
import { Modal, Button, Form, Input, InputNumber, Radio } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import reqwest from "reqwest";
import XCSRFHeaders from "./reqwest-headers";

const EditForm = ({ visible, loading, resource, onEdit, onCancel }) => {
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
        onEdit(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };


  return (
    <Modal
      visible={visible}
      title="Отгрузка / Поставка товара"
      onOk={onOk}
      onCancel={cancelFunc}
      footer={[
        <Button key="back" onClick={cancelFunc}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" disabled={loading} loading={loading} onClick={onOk}>
          Изменить
        </Button>
      ]}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={resource}
      >
        <Form.Item
          name="id"
          hidden
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="name"
          label="Название товара"
          rules={[{
            required: true,
            message: "Название товара не может быть пустым!"
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
          <Radio.Group disabled>
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


export default class EditResourceModal extends React.Component {

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
      url: `/resources/${values.id}/`,
      method: 'put',
      type: 'json',
      headers: XCSRFHeaders(),
      data: values,
    }).then((data) => {
      this.props.onEdit();
      this.setState({ loading: false, visible: false });
    }).fail((err, msg) => {
      if (err.status == 401 || err.status == 403) {
        window.location.replace(`/api-auth/login/?next=${encodeURI(window.location.pathname)}`)
      }
      console.log(err, msg);
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button onClick={this.showModal}>
          <EditOutlined />
        </Button>
        <EditForm
          {...this.props}
          loading={loading}
          visible={visible}
          onEdit={this.handleSave}
          onCancel={this.handleCancel}
        />
      </>
    );
  }
}
