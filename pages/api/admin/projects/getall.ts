import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";
import nookies from "nookies";

const GetAllProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();
    const { token } = req.query;
    const { email } = jwt.decode(token.toString(), {
      json: true,
    });
    const user = await Connection?.manager?.findOne(User, { where: { email } });
    if (user) {
      try {
        jwt.verify(token.toString(), process.env.JWT_SECRET);
        const complatedProjects = await Connection?.manager?.find(
          ComplatedProjects
        );
        if (complatedProjects) {
          const data = [];
          for (let i = 0; i < complatedProjects.length; i++) {
            const project = complatedProjects[i];
            if (nookies.get({ req })["locale"] === "en") {
              const {
                id,
                project_name_eng,
                description_eng,
                updatedAt,
                createdAt,
              } = project;
              const images = JSON.parse(project.images);
              data.push({
                id,
                project_name_eng,
                description_eng,
                updatedAt,
                createdAt,
                images,
              });
            } else {
              const { id, project_name, description, updatedAt, createdAt } =
                project;
              const images = JSON.parse(project.images);
              data.push({
                id,
                project_name,
                description,
                updatedAt,
                createdAt,
                images,
              });
            }
          }
          res.status(200).json({
            resource: data,
            status: 200,
            success: true,
          });
        } else {
          res.json({ message: "data not found", status: 404, success: false });
        }
      } catch (error) {
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

export default GetAllProjects;
