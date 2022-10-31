import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import User from "../../../../src/entity/user.entity";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";

const DeleteProject = async (req: NextApiRequest, res: NextApiResponse) => {
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
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        const project = await Connection?.manager?.findOne(ComplatedProjects, {
          where: { id },
        });
        if (project) {
          const images = JSON.parse(project.images);
          images.forEach((image: string) => {
            fs.unlinkSync(image);
          });
          await Connection?.manager?.remove(project);
          res.status(200).json({ message: "Project deleted", success: true });
        } else {
          res.json({
            message: "Project not found",
            success: false,
            status: 404,
          });
        }
      } catch (error) {
        res.json({ message: "Token not valid", success: false, status: 401 });
      }
    } else {
      res.json({ message: "User not found", success: false, status: 404 });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.json({ message: "Method not Allowd", success: false, status: 405 });
  }
};

export default DeleteProject;
