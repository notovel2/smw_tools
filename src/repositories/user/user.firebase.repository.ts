import { db } from "@/infrastructure/firebase";
import { User, CreateUser } from "@/types/User";
import firebase from "firebase/compat/app";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const dbName = 'users'

export const getUsers = async (): Promise<User[]> => {
    const users: User[] = [];
    const q = collection(db, dbName);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        users.push({
        ...doc.data() as User,
        doc_id: doc.id,
        });
    });
    return users;
}

export const getUsersByName = async (name: string): Promise<User[]> => {
    const users: User[] = [];
    const q = query(collection(db, dbName), where('name', '==', name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        users.push({
        ...doc.data() as User,
        doc_id: doc.id,
        });
    });
    return users;
};

export const getUsersById = async (id: string): Promise<User | null> => {
    const users: User[] = [];
    const q = query(collection(db, dbName), where(firebase.firestore.FieldPath.documentId(), '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        users.push({
            ...doc.data() as User,
            doc_id: doc.id,
        });
    });
    return users[0];
};

export const createUser = async (user: CreateUser) => {
    await addDoc(
        collection(db, dbName),
        {
            ...user,
            created_at: new Date(),
            updated_at: new Date(),
        },
    );
};
