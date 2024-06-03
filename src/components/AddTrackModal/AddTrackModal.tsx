import { ModalContextProps } from "@/hooks/useModal";
import { getMonsters } from "@/repositories/monster/monster.firebase.repository";
import { createTrackRecords } from "@/repositories/track/track.firebase.repository";
import { Monster } from "@/types/Monster";
import { Form, Input, Modal, Row, Typography, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface AddTrackModalProps {
    context: ModalContextProps;
    onCreate?: () => void;
}

interface AddTrackModalFormProps {
    monster_id: string;
    just_got_at: dayjs.Dayjs;
    remark?: string;
}

const AddTrackModal = ({ context, onCreate }: AddTrackModalProps) => {
    const [form] = Form.useForm<AddTrackModalFormProps>();
    const [loading, setLoadling] = useState(false);
    const [monster, setMonster] = useState<Monster[]>([]);

    const onCancel = () => {
        context.close();
        form.resetFields();
    };

    const onFinish = async () => {
        try {
            setLoadling(true);
            const values = await form.validateFields();
            await createTrackRecords({
                monster_id: values.monster_id,
                just_got_at: values.just_got_at.toDate(),
                remark: values.remark,
            });
            if (onCreate) {
              onCreate();
            }
            onCancel();
            Modal.success({
              title: 'Add track record successfully',
            });
          } catch (error) {
            console.log('validate failed', error);
            Modal.error({
              title: 'Add track record failed',
            });
          } finally {
            setLoadling(false);
          }
    };

    const fetchMonster = async () => {
        const result = await getMonsters();
        setMonster(result);
    };

    useEffect(() => {
        fetchMonster();
    }, []);

    const options = monster.map((r) => ({
        label: (
            <Row justify="space-between">
                <Typography>{r.name}</Typography>
                <Typography>{r.element}</Typography>
            </Row>
        ),
        value: r.doc_id,
    }))

    return (
        <Modal
            open={context.visible}
            onCancel={onCancel}
            onOk={onFinish}
            confirmLoading={loading}
        >
            <Form layout="vertical" form={form} name="add_track_record_form">
                <Form.Item
                    label="Monster"
                    name="monster_id"
                    rules={[{ required: true, message: 'Monster is required' }]}
                    wrapperCol={{ span: 24 }}
                >
                    <Select
                        showSearch
                        options={options}
                        filterOption={(inputValue, option) => {
                            const t = monster.find((monster) => monster.doc_id === option?.value);
                            const i = inputValue.toUpperCase();
                            return t?.name?.toUpperCase().indexOf(i) !== -1 || t?.element?.toUpperCase().indexOf(i) !== -1;
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Just got date"
                    name="just_got_at"
                    rules={[{ required: true, message: 'Just got date is required' }]}
                    wrapperCol={{ span: 12 }}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Remark"
                    name="remark"
                    wrapperCol={{ span: 12 }}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddTrackModal;
