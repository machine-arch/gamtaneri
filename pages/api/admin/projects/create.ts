import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable-serverless";
import path from "path";
import User from "../../../../src/entity/user.entity";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import slugify from "slugify";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export const config = {
  api: {
    bodyParser: false,
  },
};
const form = new formidable.IncomingForm({
  multiples: true,
  uploadDir: path.join(process.cwd(), "public", "uploads"),
  keepFilenames: true,
  encoding: "utf-8",
  type: "multipart",
});

const filePaths = [];

form.on("fileBegin", (name, file) => {
  const NAME = randomUUID(file).toString() + "-" + file.name;
  file.path = path.join(form.uploadDir, slugify(NAME));
  const filePath = path
    .relative(process.cwd(), file.path)
    .replace("public", "");
  filePaths.push(filePath.replace(/\\/g, "/"));
});

const CreateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        console.log("fields");
        // req.socket.end();
        // const Connection = AppDataSource.isInitialized
        //   ? AppDataSource
        //   : await AppDataSource.initialize();
        // const {
        //   project_name,
        //   project_name_eng,
        //   description,
        //   description_eng,
        //   token,
        // } = fields;
        // const { email } = jwt.decode(token, {
        //   json: true,
        // });
        // const user = Connection?.manager?.findOne(User, { where: { email } });
        // if (user) {
        //   try {
        //     jwt.verify(token, process.env.JWT_SECRET);
        //     const project = new ComplatedProjects();
        //     project.project_name = project_name;
        //     project.project_name_eng = project_name_eng;
        //     project.description = description;
        //     project.description_eng = description_eng;
        //     project.createdAt = new Date();
        //     project.updatedAt = new Date();
        //     project.images = JSON.stringify(filePaths);
        //     await Connection.manager.save(project);
        //     const complatedProjects = await Connection.getRepository(
        //       ComplatedProjects
        //     ).find({
        //       order: { id: "DESC" },
        //     });
        //     res.status(200).json({
        //       resource: complatedProjects,
        //       success: true,
        //       message: "add sucess",
        //       status: 200,
        //       from: "projects",
        //     });
        //     form.cleanup();
        //   } catch {
        //     res.json({
        //       success: false,
        //       message: "token not valid",
        //       status: 401,
        //     });
        //   }
        // } else {
        //   res.json({
        //     success: false,
        //     message: "User not found",
        //     status: 404,
        //   });
        // }
        // Connection.isInitialized ? Connection.destroy() : null;
      });
    }).catch((err) => {
      console.log(err);
    });
  } else {
    res
      .status(405)
      .json({ success: false, message: "method not allowed", status: 405 });
  }
};

export default CreateProject;
