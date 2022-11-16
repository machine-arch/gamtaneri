import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import AboutUs from "../../../../src/entity/aboutus.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";
import formidable from "formidable-serverless";
import path from "path";
import slugify from "slugify";
import { randomUUID } from "crypto";
import { apiResponseInterface } from "../../../../config/interfaces/api.interfaces";
import ApiHelper from "../../../../utils/api/apihelper.utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

const UpdateAboutUs = async (req: NextApiRequest, res: NextApiResponse) => {
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

    let ImagePath = null;

    form.on("fileBegin", (name: any, file: any) => {
      if (file) {
        const NAME = randomUUID(file).toString() + "-" + file.name;
        file.path = path.join(form.uploadDir, slugify(NAME));
        const filePath = path
          .relative(process.cwd(), file.path)
          .replace("public", "");
        ImagePath = filePath.replace(/\\/g, "/");
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
        const { id, token, title, title_eng, description, description_eng } =
          fields;
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
          const aboutUs = await Connection?.getRepository(AboutUs).findOne({
            where: {
              id,
            },
          });
          aboutUs.title = title;
          aboutUs.title_eng = title_eng;
          aboutUs.description = description;
          aboutUs.description_eng = description_eng;
          aboutUs.createdAt = new Date();
          aboutUs.updatedAt = new Date();
          aboutUs.image =
            ImagePath && ImagePath.length > 0 ? ImagePath : aboutUs.image;
          await Connection.getRepository(AboutUs).save(aboutUs);
          const aboutus = await Connection.getRepository(AboutUs).find({
            order: { id: "DESC" },
          });
          apiResponseData.message = "About us updated successfully";
          apiResponseData.status = 200;
          apiResponseData.success = true;
          apiResponseData.from = "aboutus";
          apiResponseData.resource = aboutus;
          ApiHelper.successResponse(apiResponseData);
        } else {
          apiResponseData.message = "forbidden, permission denied";
          apiResponseData.status = 404;
          apiResponseData.success = false;
          apiResponseData.from = "aboutus";
          apiResponseData.resource = null;
          ApiHelper.FaildResponse(apiResponseData);
        }
        Connection.isInitialized ? Connection.destroy() : null;
      })
      .catch((error) => {
        apiResponseData.message = "Something went wrong";
        apiResponseData.status = 500;
        apiResponseData.success = false;
        apiResponseData.from = "aboutus";
        apiResponseData.resource = null;
        ApiHelper.FaildResponse(apiResponseData);
        ApiHelper.AddLogs(
          "UpdateAboutUs",
          error.message,
          req.socket.remoteAddress,
          req.socket.localAddress
        );
      });
  } else {
    apiResponseData.message = "Method not allowed";
    apiResponseData.status = 405;
    apiResponseData.success = false;
    apiResponseData.from = "aboutus";
    apiResponseData.resource = null;
    ApiHelper.FaildResponse(apiResponseData);
  }
};

export default UpdateAboutUs;
