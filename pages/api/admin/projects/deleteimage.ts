import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import User from "../../../../src/entity/user.entity";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";

const DeleteSingleImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { token, id, image } = req.body;
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
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        const project = await Connection.getRepository(
          ComplatedProjects
        ).findOne({
          where: {
            id: id,
          },
        });
        if (project) {
          const images = JSON.parse(project.images);
          const newImages = images.filter((img) => img !== image);
          project.images = JSON.parse(newImages);
          await Connection.getRepository(ComplatedProjects).save(project);
          fs.unlinkSync(`./public/uploads/${image}`);
          res.status(200).json({
            message: "Image deleted",
            success: true,
          });
        } else {
          res.json({
            message: "Project not found",
            success: false,
            status: 404,
          });
        }
      } catch (error) {
        res.json({
          message: "Token not valid",
          success: false,
          status: 401,
        });
      }
    } else {
      res.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }
  } else {
    res.json({
      message: "Method not allowed",
      success: false,
      status: 405,
    });
  }
};

export default DeleteSingleImage;
