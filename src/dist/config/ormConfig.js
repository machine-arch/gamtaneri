"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const path_1 = require("path");
const user_entity_1 = require("../entity/user.entity");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "gamtaneri",
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User],
    migrations: [(0, path_1.join)(__dirname, "/../migrations/*.js")],
    subscribers: [],
});
exports.default = AppDataSource;
