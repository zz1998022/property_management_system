import { oss } from "../config/ali_oss";
import * as path from "path";

/**
 *
 * @param ossFileName 储存到oss的文件名
 * @param uploadFileName
 */
export async function put(uploadFileName: string, ossFileName: string) {
  try {
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await oss.put(ossFileName, uploadFileName);
    // const result = await client.put('exampleobject.txt', path.normalize('D:\\localpath\\examplefile.txt'), { headers });
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e);
  }
}
