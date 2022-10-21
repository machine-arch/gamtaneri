import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import OurUsers from "../../../../src/entity/ourusers.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";

const DeleteOurUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();
    const { token, id } = req.body;
    const { email } = jwt.decode(token, {
      json: true,
    });
    const user = await Connection?.manager?.findOne(User, { where: { email } });
    if (user) {
      if (jwt.verify(token, process.env.JWT_SECRET)) {
        const ourUser = await Connection?.manager?.findOne(OurUsers, {
          where: { id },
        });
        if (ourUser) {
          await Connection?.manager?.remove(ourUser);
          res.status(200).json({ message: "Our User deleted" });
        } else {
          res.status(404).json({ message: "Our User not found" });
        }
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.status(404).json({ message: "Method not Allowd" });
  }
};

export default DeleteOurUser;
