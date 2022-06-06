export interface Vehicle {
  id?: number;
  member_id: number;
  name: string;
  license_plate: string;
  color: string;
  photo?: string;
  remark: string;
  community_code?: string;
}

export interface VehicleInter {
  id: number;
  member_name: string;
  name: string;
  license_plate: string;
  color: string;
  photo: string;
  create_time: string;
  remark: string;
}
