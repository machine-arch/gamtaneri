import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import User from "../../../../src/entity/user.entity";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";
import { apiResponseInterface } from "../../../../config/interfaces/api.interfaces";
import ApiHelper from "../../../../utils/api/apihelper.utils";

const DeleteProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResponseData: apiResponseInterface = {
    res,
    message: "",
    status: 0,
    success: true,
    from: "",
    resource: null,
  };
  if (req.method === "DELETE") {
    return new Promise(async (resolve, reject) => {
      const Connection = AppDataSource.isInitialized
        ? AppDataSource
        : await AppDataSource.initialize();
      const { token, id } = req.query;
      const { email } = jwt.decode(token.toString(), {
        json: true,
      });
      const user = await Connection?.manager?.findOne(User, {
        where: { email },
      });
      if (user) {
        jwt.verify(token.toString(), process.env.JWT_SECRET);
        const project = await Connection?.manager?.findOne(ComplatedProjects, {
          where: { id: Number(id) },
        });
        if (project) {
          const images = JSON.parse(project.images);
          images.forEach((image: string) => {
            console.log(image);
            fs.unlinkSync(`./public${image}`);
          });
          await Connection?.manager?.remove(project);
          const projects = await Connection?.manager?.find(ComplatedProjects);
          apiResponseData.message = "";
          apiResponseData.status = 200;
          apiResponseData.success = true;
          apiResponseData.from = "projects";
          apiResponseData.resource = projects;
          ApiHelper.successResponse(apiResponseData);
        } else {
          apiResponseData.message = "data not found";
          apiResponseData.status = 404;
          apiResponseData.success = false;
          apiResponseData.from = "projects";
          ApiHelper.FaildResponse(apiResponseData);
        }
      } else {
        apiResponseData.message = "forbidden, permission denied";
        apiResponseData.status = 403;
        apiResponseData.success = false;
        apiResponseData.from = "projects";
        ApiHelper.FaildResponse(apiResponseData);
      }
      Connection.isInitialized ? Connection.destroy() : null;
    }).catch((error) => {
      apiResponseData.message = "something went wrong";
      apiResponseData.status = 500;
      apiResponseData.success = false;
      apiResponseData.from = "projects";
      ApiHelper.FaildResponse(apiResponseData);

      ApiHelper.AddLogs(
        "DeleteProject",
        error.message,
        req.socket.remoteAddress,
        req.socket.localAddress
      );
    });
  } else {
    apiResponseData.message = "method not allowed";
    apiResponseData.status = 405;
    apiResponseData.success = false;
    apiResponseData.from = "projects";
    ApiHelper.FaildResponse(apiResponseData);
  }
};

export default DeleteProject;
