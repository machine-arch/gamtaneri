import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import OurUsers from "../../../../src/entity/ourusers.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";

const CreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { token, title, title_eng, description, description_eng } = req.body;
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
        const ourUser = new OurUsers();
        ourUser.title = title;
        ourUser.title_eng = title_eng;
        ourUser.description = description;
        ourUser.description_eng = description_eng;
        ourUser.createdAt = new Date();
        ourUser.updatedAt = new Date();
        await Connection.getRepository(OurUsers).save(ourUser);
        res.status(200).json({
          message: "User created",
        });
      } else {
        res.status(400).json({
          message: "Token not valid",
          isVerified: false,
        });
      }
    } else {
      res.status(400).json({
        message: "User not found",
        isVerified: false,
      });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.status(400).json({
      message: "Method not allowed",
    });
  }
};

export default CreateUser;
