import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import { User } from "../../src/entity/user";

export const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "gamtaneri",
  synchronize: true,
  logging: false,
  entities: [join(__dirname, "../../src/entity/*.{ts,js}")],
  migrations: ["src/migrations/*{.ts,.js}"],
  subscribers: [],
});
