import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable-serverless";
import path from "path";
import User from "../../../../src/entity/user.entity";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import slugify from "slugify";
import jwt from "jsonwebtoken";

const CreateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: path.join(process.cwd(), "public", "uploads"),
    keepExtensions: true,
    keepFilenames: true,
  });

  form.on("fileBegin", (name, file) => {
    file.path = path.join(form.uploadDir, slugify(file.name));
  });

  form.parse(req, async (err, fields, files) => {
    if (req.method === "POST") {
      const Connection = AppDataSource.isInitialized
        ? AppDataSource
        : await AppDataSource.initialize();
      const {
        project_name,
        project_name_eng,
        description,
        description_eng,
        token,
      } = fields;
      const { images } = files;
      const { email } = jwt.decode(token, {
        json: true,
      });
      const user = Connection?.manager?.findOne(User, { where: { email } });

      if (user) {
        if (jwt.verify(token, process.env.JWT_SECRET)) {
          const project = new ComplatedProjects();
          project.project_name = project_name;
          project.project_name_eng = project_name_eng;
          project.description = description;
          project.description_eng = description_eng;
          project.images = images.path;
          await Connection.manager.save(project);
          res.status(200).json({ success: true, message: "add sucess" });
        } else {
          res.status(401).json({ success: false, message: "unauthorized" });
        }
      } else {
        res.status(401).json({ success: false, message: "not authorized" });
      }
      Connection.isInitialized ? Connection.destroy() : null;
    } else {
      res.status(405).json({ success: false, message: "method not allowed" });
    }
  });

  return res.status(200).json({ success: true, message: "add sucess" });
};

export default CreateProject;
