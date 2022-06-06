export interface PeopleInter {
  id?: number;
  photo?: string;
  community_code: string;
  house_code: string;
  name: string;
  identity_id: string;
  tel: string;
  occupation: string;
  birth: string;
  gender: number;
  owner_type: number;
  create_time?: string;
  update_time?: string;
  remark?: string;
}

export interface PeopleFilterInter {
  community_code: string;
  house_code: string;
  birth: [string, string];
}
