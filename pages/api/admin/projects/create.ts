import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable-serverless";
import path from "path";
import User from "../../../../src/entity/user.entity";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import slugify from "slugify";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import fs from "fs";
import { apiResponseInterface } from "../../../../config/interfaces/api.interfaces";
import ApiHelper from "../../../../utils/api/apihelper.utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

const CreateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResponseData: apiResponseInterface = {
    res,
    message: "",
    status: 0,
    success: true,
    from: "",
    resource: null,
  };
  if (req.method === "POST") {
    const upload_dir = path.join(process.cwd(), "public", "uploads");
    if (fs.existsSync(upload_dir)) {
    } else {
      fs.mkdirSync(upload_dir);
    }

    const form = new formidable.IncomingForm({
      multiples: true,
      uploadDir: upload_dir,
      keepFilenames: true,
      allowEmptyFiles: false,
      encoding: "utf-8",
      maxFileSize: 10 * 1024 * 1024,
      maxFieldsSize: 10 * 1024 * 1024,
      maxFields: 10,
    });

    let filePaths = [];

    form.on("fileBegin", (name: any, file: any) => {
      if (file) {
        const NAME = randomUUID(file).toString() + "-" + file.name;
        file.path = path.join(form.uploadDir, slugify(NAME));
        const filePath = path
          .relative(process.cwd(), file.path)
          .replace("public", "");
        filePaths.push(filePath.replace(/\\/g, "/"));
      }
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(fields);
        }
      });
    })
      .then(async (fields: any) => {
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
        const { email } = jwt.decode(token, {
          json: true,
        });
        const user = Connection?.manager?.findOne(User, {
          where: { email },
        });
        if (user) {
          jwt.verify(token, process.env.JWT_SECRET);
          const project = new ComplatedProjects();
          project.project_name = project_name;
          project.project_name_eng = project_name_eng;
          project.description = description;
          project.description_eng = description_eng;
          project.createdAt = new Date();
          project.updatedAt = new Date();
          project.images = JSON.stringify(filePaths);
          await Connection.manager.save(project);
          const complatedProjects = await Connection.getRepository(
            ComplatedProjects
          ).find({
            order: { id: "DESC" },
          });
          filePaths = [];
          apiResponseData.message = "Project created successfully";
          apiResponseData.status = 200;
          apiResponseData.success = true;
          apiResponseData.from = "projects";
          apiResponseData.resource = complatedProjects;
          ApiHelper.successResponse(apiResponseData);
        } else {
          apiResponseData.message = "Forbidden, user not found";
          apiResponseData.status = 404;
          apiResponseData.success = false;
          apiResponseData.from = "projects";
          apiResponseData.resource = null;
          ApiHelper.FaildResponse(apiResponseData);
        }
        Connection.isInitialized ? Connection.destroy() : null;
      })
      .catch((err) => {
        apiResponseData.message = "Something went wrong";
        apiResponseData.status = 500;
        apiResponseData.success = false;
        apiResponseData.from = "projects";
        apiResponseData.resource = null;
        ApiHelper.FaildResponse(apiResponseData);
        ApiHelper.AddLogs(
          "CreateProject",
          err.message,
          req.socket.remoteAddress,
          req.socket.localAddress
        );
      });
  } else {
    apiResponseData.message = "Method not allowed";
    apiResponseData.status = 405;
    apiResponseData.success = false;
    apiResponseData.from = "projects";
    apiResponseData.resource = null;
    ApiHelper.FaildResponse(apiResponseData);
  }
};

export default CreateProject;
