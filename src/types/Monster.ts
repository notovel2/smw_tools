export interface Monster extends CreateMonster {
    doc_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateMonster {
    name: string;
    element: string;
}
