import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import User from "../../../../src/entity/user.entity";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";
import { apiResponseInterface } from "../../../../config/interfaces/api.interfaces";
import ApiHelper from "../../../../utils/api/apihelper.utils";

const DeleteSingleImage = async (req: NextApiRequest, res: NextApiResponse) => {
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
          apiResponseData.message = "";
          apiResponseData.status = 200;
          apiResponseData.success = true;
          apiResponseData.from = "projects";
          apiResponseData.resource = project;
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
        "DeleteSingleImage",
        error.message,
        req.socket.remoteAddress,
        req.socket.localAddress
      );
    });
  } else {
    apiResponseData.message = "method not allowed";
    apiResponseData.status = 405;
    apiResponseData.success = false;
    apiResponseData.from = "complatedprojects";
    ApiHelper.FaildResponse(apiResponseData);
  }
};

export default DeleteSingleImage;
