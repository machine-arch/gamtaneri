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
  host: "localhost", //195.54.178.4
  port: 3306,
  username: "root", //gamtaner_gamtaneri
  password: "", //Gamtaneri123
  database: "gamtaneri",
  synchronize: false,
  logging: false,
  entities: [User, Logs, Contacts, AboutUs, OurUsers, ComplatedProjects],
  migrations: [join(__dirname, "/../migrations/*.js")],
  subscribers: [],
});

export default AppDataSource;
