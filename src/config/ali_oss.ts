import * as OSS from "ali-oss";

// 初始化
// export const oss = new OSS({
//   accessKeyId: process.env.AccessKey_ID,
//   accessKeySecret: process.env.AccessKey_Secret,
//   region: process.env.region,
//   bucket: process.env.bucket,
// });

export const oss = new OSS({
  accessKeyId: "LTAIPu9xEPVoPbPj",
  accessKeySecret: "OK06Yzrdo7sZ3JEbSe57qlmXIatZi9",
  region: "oss-us-west-1",
  bucket: "lemon-usa",
});
