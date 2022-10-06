"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
var path_1 = require("path");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "gamtaneri",
    synchronize: true,
    logging: false,
    entities: [(0, path_1.join)(__dirname, "../../src/entity/*.{ts,js}")],
    migrations: ["src/migrations/*{.ts,.js}"],
    subscribers: []
});
