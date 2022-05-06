// 小区名字
export interface communityName {
  id: string;
  name: string;
}

// 小区详情信息
export interface communityDetail {
  build: number;
  people: number;
  tenant: number;
}

// 小区所有信息
export interface CommunityAll {
  /**
   * 小区id
   */
  id?: number;
  /**
   * 小区编号，建议CM开头
   */
  code: string;
  /**
   * 小区名称
   */
  name: string;
  /**
   * 简介
   */
  introduction?: string;
  /**
   * 缩略图
   */
  thumb?: string;
  /**
   * 坐落地址
   */
  address: string;
  /**
   * 占地面积，单位：平米
   */
  area: number;
  /**
   * 开发商名称
   */
  developer: number;
  /**
   * 物业公司名称
   */
  estate: string;
  /**
   * 绿化率，单位：百分比
   */
  greening_rate: number;
  /**
   * 总栋数
   */
  total_building: number;
  /**
   * 总户数
   */
  total_owner: number;
  /**
   * 创建时间
   */
  create_time: number;
  /**
   * 修改时间
   */
  update_time?: number;
}
