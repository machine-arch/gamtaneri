import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import OurUsers from "../../../../src/entity/ourusers.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";

const UpdateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { id, token, title, title_eng, description, description_eng } =
      req.body;
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();
    const { email } = jwt.decode(token, {
      json: true,
    });
    const user = await Connection.getRepository(User).findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      if (jwt.verify(token, process.env.JWT_SECRET)) {
        const ourUser = await Connection?.getRepository(OurUsers).findOne({
          where: {
            id,
          },
        });
        ourUser.title = title;
        ourUser.title_eng = title_eng;
        ourUser.description = description;
        ourUser.description_eng = description_eng;
        ourUser.createdAt = new Date();
        ourUser.updatedAt = new Date();
        await Connection.getRepository(User).save(ourUser);
        res.status(200).json({
          message: "User created",
          status: 200,
          success: true,
        });
      } else {
        res.json({
          message: "Token not valid",
          status: 401,
          success: false,
        });
      }
    } else {
      res.json({
        message: "User not found",
        status: 404,
        success: false,
      });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.json({
      message: "Method not allowed",
      status: 405,
      success: false,
    });
  }
};

export default UpdateUser;
