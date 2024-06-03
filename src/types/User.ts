export interface User extends CreateUser {
    doc_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateUser {
    name: string;
    element: string;
    game_name: string;
}
