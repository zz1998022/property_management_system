export interface PetAddInter {
  id?: number;
  community_code?: string;
  member_id: undefined | number;
  pet_name: string;
  color: string;
  photo: string;
  adopt_time: undefined | string;
  remark: string;
}

export interface PetSingleInter {
  id: number;
  community_code: string;
  member_id: number;
  pet_name: string;
  color: string;
  photo: string;
  adopt_time: string;
  remark: string;
}
