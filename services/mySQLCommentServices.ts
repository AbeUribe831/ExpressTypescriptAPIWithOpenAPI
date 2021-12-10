import { sequelize } from "../models";
import { InsertComment, SQLComment } from "../interfaces/mysqlComment";

export const getAllSQLComments = () => {
  return sequelize.query("SELECT * FROM Comments") as Promise<SQLComment[][]>;
};

export const getSingleSQLComment = (id: string) => {
  return sequelize.query(`SELECT * FROM Comments WHERE id  = ${id}`) as Promise<
    SQLComment[][]
  >;
};

export const postSingleSQLComment = (body: InsertComment) => {
  const params: string = Object.keys(body).join(",");
  let values = "";
  Object.values(body).map((val, index, arr) => {
    if (typeof val == "string") values += `"${val}"`;
    else values += val;
    if (index !== arr.length - 1) values += ",";
  });
  return sequelize.query(
    `INSERT INTO Comments (${params}) VALUES (${values})`
  ) as Promise<SQLComment[]>;
};
