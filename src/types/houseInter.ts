export interface HouseInter {
  id?: number;
  community_code: string;
  building_code: string;
  code?: string;
  name: string;
  owner_name: string;
  owner_tel: string;
  rooms: number;
  unit: string;
  floor: number;
  desc: string;
  enter_time: string;
}

export interface HouseFilterInter {
  community_code: string;
  building_code: string;
  enter_time: [string, string];
  owner_name: string;
  owner_tel: string;
}
