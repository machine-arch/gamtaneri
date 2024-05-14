import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import User from "../entity/user.entity";
import Logs from "./../entity/logs.entity";
import Contacts from "./../entity/contacts.entity";
import AboutUs from "./../entity/aboutus.entity";
import OurUsers from "./../entity/ourusers.entity";
import ComplatedProjects from "./../entity/complatedprojects.entity";

const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host:  process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Logs, Contacts, AboutUs, OurUsers, ComplatedProjects],
  migrations: [join(__dirname, "/../migrations/*.js")],
  subscribers: [],
});

export default AppDataSource;