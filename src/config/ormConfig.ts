import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import { User } from "../entity/user.entity";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "gamtaneri",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [join(__dirname, "/../migrations/*.js")],
  subscribers: [],
});

export default AppDataSource;
