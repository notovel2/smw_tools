import { db } from "@/infrastructure/firebase";
import { CreateTrackRecord, TrackRecord } from "@/types/TrackRecord";
import { Timestamp, addDoc, collection, getDocs, query, where } from "firebase/firestore";

const dbName = 'track_records'

export const getTrackRecords = async (): Promise<TrackRecord[]> => {
    const monster: TrackRecord[] = [];
    const q = collection(db, dbName);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        monster.push({
        ...data as TrackRecord,
        doc_id: doc.id,
        just_got_at: (data.just_got_at as Timestamp).toDate(),
        });
    });
    return monster;
};

export const createTrackRecords = async (trackRecord: CreateTrackRecord) => {
    await addDoc(
        collection(db, dbName),
        {
            ...trackRecord,
            remark: trackRecord.remark ?? null,
            created_at: new Date(),
            updated_at: new Date(),
        },
    );
};
