import { User } from "../../src/entity/user.entity";
import AppDataSource from "../../src/config/ormConfig";

const Test = async (req: any, res: any) => {
  AppDataSource.initialize()
    .then(async () => {
      // const user = new User();
      // user.firstName = "Timber";
      // user.lastName = "Saw";
      // user.isActive = true;
      // user.email = "merabkhatiashvili@gmail.com";
      // await AppDataSource.manager.save(user);
      // console.log("Saved a new user with id: " + user.id);

      console.log("Loading users from the database...");
      const users = await AppDataSource.manager.find(User);
      console.log("Loaded users: ", users);

      console.log(
        "Here you can setup and run express / fastify / any other framework."
      );
      res.status(200).json(users);
    })
    .catch((error) => console.log(error))
    .finally(() => AppDataSource.destroy());
};

export default Test;
