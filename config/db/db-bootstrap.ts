import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "../../src/entity/user";
import { join } from "path";

AppDataSource.initialize()
  .then(async () => {
    console.log(join(__dirname, "../../src/entity/*.{ts,js}"));
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.isActive = true;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));
