import * as OSS from "ali-oss";

// 初始化
export const oss = new OSS({
  accessKeyId: process.env.AccessKey_ID,
  accessKeySecret: process.env.AccessKey_Secret,
  region: process.env.region,
  bucket: process.env.bucket,
});
