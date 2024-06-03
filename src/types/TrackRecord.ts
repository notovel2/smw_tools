export interface TrackRecord extends CreateTrackRecord {
    doc_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateTrackRecord {
    monster_id: string;
    just_got_at: Date;
    just_got_by: string;
    created_by: string;
    remark?: string;
}
