import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import OurUsers from "../../../../src/entity/ourusers.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";

const GetUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();
    const { token, id } = req.query;
    const { email } = jwt.decode(token.toString(), {
      json: true,
    });
    const user = await Connection?.manager?.findOne(User, { where: { email } });
    if (user) {
      if (jwt.verify(token.toString(), process.env.JWT_SECRET)) {
        const ourUser = await Connection.getRepository(OurUsers).findOne({
          where: { id: Number(id) },
        });
        if (ourUser) {
          res.status(200).json({
            resource: ourUser,
            success: true,
            status: 200,
            from: "users",
          });
        } else {
          res.json({
            message: "data not found",
            status: 404,
            success: false,
            from: "users",
          });
        }
      } else {
        res.json({
          message: "Token not valid",
          status: 401,
          success: false,
          from: "users",
        });
      }
    } else {
      res.json({
        message: "User not found",
        status: 404,
        success: false,
        from: "users",
      });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.json({
      message: "Method not Allowd",
      status: 405,
      success: false,
      from: "users",
    });
  }
};

export default GetUser;
