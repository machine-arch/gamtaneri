import { User } from "../../src/entity/user.entity";
import AppDataSource from "../../src/config/ormConfig";
import { NextApiRequest, NextApiResponse } from "next";

const Test = async (req: NextApiRequest, res: NextApiResponse) => {
  // AppDataSource.initialize()
  //   .then(async () => {
  //     const user = await AppDataSource.manager.findOneBy(User, {
  //       email: req.body.email,
  //     });
  //     res.status(200).json(user);
  //   })
  //   .catch((error) => console.log(error))
  //   .finally(() => AppDataSource.destroy());
  return res.status(200).json({ message: req.socket.remoteAddress });
};

export default Test;
