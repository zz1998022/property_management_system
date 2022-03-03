import { createPool } from "mysql";

export class DB {
  pool() {
    return createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  }

  query(sql: string, args?: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool().query(sql, args, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}
