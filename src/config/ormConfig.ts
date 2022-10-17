import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import { User } from "../entity/user.entity";
import { Logs } from "./../entity/logs.entity";

const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "gamtaneri",
  synchronize: false,
  logging: false,
  entities: [User, Logs],
  migrations: [join(__dirname, "/../migrations/*.js")],
  subscribers: [],
});

export default AppDataSource;
