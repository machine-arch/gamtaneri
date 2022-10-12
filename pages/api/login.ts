import { User } from "../../src/entity/user.entity";
import AppDataSource from "../../src/config/ormConfig";
import { NextApiRequest, NextApiResponse } from "next";

const Test = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.socket.localAddress);
  // AppDataSource.initialize()
  //   .then(async () => {
  //     const user = await AppDataSource.manager.findOneBy(User, {
  //       email: req.body.email,
  //     });
  //     res.status(200).json(user);
  //   })
  //   .catch((error) => console.log(error))
  //   .finally(() => AppDataSource.destroy());
};

export default Test;
