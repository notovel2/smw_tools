'use client'
import { Button, Card, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import capitalize from 'lodash/capitalize';
import AddTrackModal from "@/components/AddTrackModal/AddTrackModal";
import useModal from "@/hooks/useModal";
import { getMonsters } from "@/repositories/monster/monster.firebase.repository";
import { getTrackRecords } from "@/repositories/track/track.firebase.repository";
import { getUsers } from "@/repositories/user/user.firebase.repository";
import { TrackRecord } from "@/types/TrackRecord";

type DatasSource = TrackRecord & {
    name?: string;
    element?: string;
    just_got_by_name?: string;
};

const columns: ColumnsType<TrackRecord> = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Element', dataIndex: 'element', render: capitalize },
    { title: 'Just got by', dataIndex: 'just_got_by_name' },
    { title: 'Just got at', dataIndex: 'just_got_at', render: (value: Date) => value.toDateString() },
];

const TrackPage = () => {
    const [loading, setLoadling] = useState(false);
    const [trackRecords, setTrackRecords] = useState<DatasSource[]>([]);

    const fetchTrackRecords = async () => {
        try {
            setLoadling(true);
            const monsters = await getMonsters();
            const users = await getUsers();
            const result = await getTrackRecords();
            setTrackRecords(
                result.map((r) => {
                    const monster = monsters.find((m) => m.doc_id === r.monster_id);
                    const user = users.find((u) => u.doc_id === r.just_got_by);
                    return {
                        ...r,
                        name: monster?.name,
                        element: monster?.element,
                        just_got_by_name: user?.game_name,
                    };
                })
            );
        } finally {
            setLoadling(false);
        }
    };

    useEffect(() => {
        fetchTrackRecords();
    }, []);

    const addTrackModal = useModal();

    return (
        <Card>
            <Row>
                <Button type="primary" onClick={() => addTrackModal.open()}>
                    Add track record
                </Button>
            </Row>
            <Table
                rowKey="key"
                columns={columns}
                dataSource={trackRecords}
                loading={loading}
            />
            <AddTrackModal context={addTrackModal} onCreate={fetchTrackRecords} />
        </Card>
    );
};

export default TrackPage;
