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
      if (jwt.verify(token, process.env.JWT_SECRET)) {
        const project = await Connection?.manager?.findOne(ComplatedProjects, {
          where: { id },
        });
        if (project) {
          const images = JSON.parse(project.images);
          images.forEach((image: string) => {
            fs.unlinkSync(image);
          });
          await Connection?.manager?.remove(project);
          res.status(200).json({ message: "Project deleted" });
        } else {
          res.status(404).json({ message: "Project not found" });
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

export default DeleteProject;
