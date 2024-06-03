import { ModalContextProps } from "@/hooks/useModal";
import { createMonster, getMonstersByName } from "@/repositories/monster/monster.firebase.repository";
import { Monster } from "@/types/Monster";
import { Button, Checkbox, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";

interface AddMonsterModalProps {
    context: ModalContextProps;
    onCreate?: () => void;
}

interface AddMonsterModalFormProps {
    name: string;
    element: string[];
}

const AddMonsterModal = ({ context, onCreate }: AddMonsterModalProps) => {
    const [form] = Form.useForm<AddMonsterModalFormProps>();
    const [loading, setLoadling] = useState(false);

    const onCancel = () => {
        context.close();
        form.resetFields();
    };

    const onFinish = async () => {
        try {
            setLoadling(true);
            const values = await form.validateFields();
            const result = await getMonstersByName(values.name);
            if (result.length > 0) {
                throw new Error('Existing monster');
            }
            await Promise.all(values.element.map((el) => createMonster({ name: values.name, element: el })))
            if (onCreate) {
              onCreate();
            }
            onCancel();
            Modal.success({
              title: 'Add monster successfully',
            });
          } catch (error) {
            console.log('validate failed', error);
            Modal.error({
              title: 'Add monster failed',
            });
          } finally {
            setLoadling(false);
          }
    };

    return (
        <Modal
            open={context.visible}
            onCancel={onCancel}
            onOk={onFinish}
            confirmLoading={loading}
        >
            <Form layout="vertical" form={form} name="add_monster_form">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Monster name is required' }]}
                    wrapperCol={{ span: 24 }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Element"
                    name="element"
                    rules={[{ required: true, message: 'Element is required' }]}
                    wrapperCol={{ span: 24 }}
                >
                    <Checkbox.Group>
                        <Checkbox value="fire">Fire</Checkbox>
                        <Checkbox value="water">Water</Checkbox>
                        <Checkbox value="wind">Wind</Checkbox>
                        <Checkbox value="light">Light</Checkbox>
                        <Checkbox value="dark">Dark</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddMonsterModal;
