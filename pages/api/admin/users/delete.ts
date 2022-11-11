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
    const { token, id } = req.query;
    console.log(token, id);
    const { email } = jwt.decode(token.toString(), {
      json: true,
    });
    const userID = Number(id);
    const user = await Connection?.manager?.findOne(User, { where: { email } });
    if (user) {
      if (jwt.verify(token.toString(), process.env.JWT_SECRET)) {
        const ourUser = await Connection?.manager?.find(OurUsers, {
          where: { id: userID },
        });
        if (ourUser) {
          await Connection?.manager?.remove(ourUser);
          const user = await Connection.getRepository(OurUsers).find({
            order: { id: "DESC" },
          });
          res.status(200).json({
            resource: user,
            message: "Our User deleted",
            status: 200,
            success: true,
            from: "users",
          });
        } else {
          res.json({
            message: "Our User not found",
            status: 404,
            success: false,
          });
        }
      } else {
        res.json({ message: "Token not valid", status: 401, success: false });
      }
    } else {
      res.json({ message: "User not found", status: 404, success: false });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.json({ message: "Method not Allowd", status: 405, success: false });
  }
};

export default DeleteOurUser;
