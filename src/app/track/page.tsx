'use client'
import AddTrackModal from "@/components/AddTrackModal/AddTrackModal";
import useModal from "@/hooks/useModal";
import { getMonsters } from "@/repositories/monster/monster.firebase.repository";
import { getTrackRecords } from "@/repositories/track/track.firebase.repository";
import { TrackRecord } from "@/types/TrackRecord";
import { Button, Card, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

type DatasSource = TrackRecord & {
    name?: string;
    element?: string;
};

const columns: ColumnsType<TrackRecord> = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Element', dataIndex: 'element' },
    { title: 'Just got at', dataIndex: 'just_got_at', render: (value: Date) => value.toDateString() },
];

const TrackPage = () => {
    const [trackRecords, setTrackRecords] = useState<DatasSource[]>([]);

    const fetchTrackRecords = async () => {
        const monsters = await getMonsters();
        const result = await getTrackRecords();
        setTrackRecords(
            result.map((r) => {
                const monster = monsters.find((m) => m.doc_id === r.monster_id);
                return {
                    ...r,
                    name: monster?.name,
                    element: monster?.element,
                };
            })
        );
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
            />
            <AddTrackModal context={addTrackModal} onCreate={fetchTrackRecords} />
        </Card>
    );
};

export default TrackPage;
