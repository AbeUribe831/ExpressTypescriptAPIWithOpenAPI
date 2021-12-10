import { Dialect, Sequelize } from "sequelize";
interface Env {
  [key: string]: {
    username: string;
    password?: string | undefined;
    database: string;
    host: string;
    dialect: string;
    url?: string | undefined;
    options?: string | undefined;
  };
}
const env = process.env.NODE_ENV || "development";
//const config = require(__dirname + '/../config/config.json')[env];
import * as foo from "../config/config.json";

const config = (<Env>foo)[env];
// this instance is a reference to the db connections
/*const sequelize = config.url
	? new Sequelize(config.url, config)
	: new Sequelize(config.database, config.username, config.password, config);
*/
const sequelize = config.url
  ? new Sequelize(config.url)
  : new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect as Dialect,
    });
export { Sequelize, sequelize };
