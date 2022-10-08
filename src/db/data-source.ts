import "reflect-metadata";
import { DataSource } from "typeorm";
import { join, relative } from "path";
import { User } from "../entity/user.entity";

export const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "gamtaneri",
  synchronize: true,
  logging: false,
  entities: [join(__dirname, "/../**/*.entity.{js,ts}")],
  migrations: ["src/migrations/*{.ts,.js}"],
  subscribers: [],
});
