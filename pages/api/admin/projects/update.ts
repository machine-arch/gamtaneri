import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable-serverless";
import path from "path";
import User from "../../../../src/entity/user.entity";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import slugify from "slugify";
import jwt from "jsonwebtoken";
import { createHash, randomUUID } from "crypto";
import { apiResponseInterface } from "../../../../config/interfaces/api.interfaces";
import ApiHelper from "../../../../utils/api/apihelper.utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

const UpdateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResponseData: apiResponseInterface = {
    res,
    message: "",
    status: 0,
    success: true,
    from: "",
    resource: null,
  };
  if (req.method === "PUT") {
    const form = new formidable.IncomingForm({
      multiples: true,
      uploadDir: path.join(process.cwd(), "public", "uploads"),
      keepExtensions: true,
      keepFilenames: true,
    });
    let filePaths = [];
    form.on("fileBegin", (name, file) => {
      const upload_dir = path.join(process.cwd(), "public", "uploads");
      if (file && file.name && file.type) {
        //create unicue hash from file name for next js image optimization
        const hash = createHash("md5");
        hash.update(
          file.name
            .split(".")
            .slice(0, -1)
            .join(".")
            .concat(randomUUID(), "utf-8")
        );
        const hashName = hash.digest("hex");
        const ext = path.extname(file.name);
        const fileName = `${hashName}${ext}`;
        file.path = path.join(upload_dir, fileName);
        const filePath = path
          .relative(process.cwd(), file.path)
          .replace("public", "")
          .replace(/\\/g, "/");
        filePaths.push(filePath);
      }
    });
    return new Promise((resolve, reject) => {
      form.parse(req, async (err: any, fields: any, files: any) => {
        if (files)
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
          id,
          project_name,
          project_name_eng,
          description,
          description_eng,
          token,
        } = fields;
        const { email } = jwt.decode(token, {
          json: true,
        });
        const user = Connection?.manager?.findOne(User, { where: { email } });
        if (user) {
          jwt.verify(token, process.env.JWT_SECRET);
          const project = await Connection?.manager?.findOne(
            ComplatedProjects,
            {
              where: { id },
            }
          );
          const oldImages = JSON.parse(project.images);
          filePaths.push(...oldImages);
          project.project_name = project_name;
          project.project_name_eng = project_name_eng;
          project.description = description;
          project.description_eng = description_eng;
          project.createdAt = new Date();
          project.updatedAt = new Date();
          project.images = filePaths.length
            ? JSON.stringify(filePaths)
            : project.images;
          await Connection.manager.save(project);
          const projects = await Connection.getRepository(
            ComplatedProjects
          ).find({
            order: { id: "DESC" },
          });
          filePaths = [];
          apiResponseData.message = "Project updated successfully";
          apiResponseData.status = 200;
          apiResponseData.success = true;
          apiResponseData.from = "projects";
          apiResponseData.resource = projects;
          ApiHelper.successResponse(apiResponseData);
        } else {
          apiResponseData.message = "Forbidden, permission denied";
          apiResponseData.status = 403;
          apiResponseData.success = false;
          apiResponseData.from = "projects";
          apiResponseData.resource = null;
          ApiHelper.FaildResponse(apiResponseData);
        }
        Connection.isInitialized ? Connection.destroy() : null;
      })
      .catch((error) => {
        apiResponseData.message = error.message;
        apiResponseData.status = 500;
        apiResponseData.success = false;
        apiResponseData.from = "projects";
        apiResponseData.resource = null;
        ApiHelper.FaildResponse(apiResponseData);

        ApiHelper.AddLogs(
          "UpdateProject",
          error.message,
          req.socket.remoteAddress,
          req.socket.localAddress
        );
      });
  } else {
    apiResponseData.message = "Method not allowed";
    apiResponseData.status = 405;
    apiResponseData.success = false;
    apiResponseData.from = "UpdateProject";
    apiResponseData.resource = null;
    ApiHelper.FaildResponse(apiResponseData);
  }
};

export default UpdateProject;
