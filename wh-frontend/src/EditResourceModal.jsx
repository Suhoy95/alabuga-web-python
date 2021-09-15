import React from "react";
import { Modal, Button, Form, Input, InputNumber, Radio } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import reqwest from "reqwest";
import reqwestHeaders from "./reqwest-headers";

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
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Количество"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="measure_unit"
                    label="Единица измерения"
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
            headers: reqwestHeaders(),
            data: values,
        }).then((data) => {
            this.props.onEdit();
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