import { db } from "@/infrastructure/firebase";
import { CreateMonster, Monster } from "@/types/Monster";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const dbName = 'monsters'

export const getMonsters = async (): Promise<Monster[]> => {
    const monster: Monster[] = [];
    const q = collection(db, dbName);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        monster.push({
        ...doc.data() as Monster,
        doc_id: doc.id,
        });
    });
    return monster;
}

export const getMonstersByName = async (name: string): Promise<Monster[]> => {
    const monster: Monster[] = [];
    const q = query(collection(db, dbName), where('name', '==', name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        monster.push({
        ...doc.data() as Monster,
        doc_id: doc.id,
        });
    });
    return monster;
};

export const createMonster = async (monster: CreateMonster) => {
    await addDoc(
        collection(db, dbName),
        {
            ...monster,
            created_at: new Date(),
            updated_at: new Date(),
        },
    );
};
