'use client'
import AddMonsterModal from "@/components/AddMonsterModal/AddMonsterModal";
import useModal from "@/hooks/useModal";
import { getMonsters } from "@/repositories/monster/monster.firebase.repository";
import { Monster } from "@/types/Monster";
import { Button, Card, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

const columns: ColumnsType<Monster> = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Element', dataIndex: 'element' },
];

const MonsterPage = () => {
    const [monster, setMonster] = useState<Monster[]>([]);

    const fetchMonster = async () => {
        const result = await getMonsters();
        setMonster(result);
    };

    useEffect(() => {
        fetchMonster();
    }, []);

    const addMonsterModal = useModal();

    return (
        <Card>
            <Row>
                <Button type="primary" onClick={() => addMonsterModal.open()}>
                    Add monster
                </Button>
            </Row>
            <Table
                rowKey="key"
                columns={columns}
                dataSource={monster}
            />
            <AddMonsterModal context={addMonsterModal} onCreate={fetchMonster} />
        </Card>
    );
};

export default MonsterPage;
