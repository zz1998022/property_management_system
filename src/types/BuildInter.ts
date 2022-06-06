export interface BuildInter {
  id?: number;
  name: string;
  code?: string;
  build_name?: string;
  community_code?: string;
  house: number;
  desc?: string;
  create_time?: string;
}

export interface BuildListInter {
  id: number;
  code: string;
  name: string;
}
