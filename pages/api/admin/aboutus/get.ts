import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import AboutUs from "../../../../src/entity/aboutus.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";
import { apiResponseInterface } from "../../../../config/interfaces/api.interfaces";
import ApiHelper from "../../../../utils/api/apihelper.utils";

const GetAboutUs = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResponseData: apiResponseInterface = {
    res,
    message: "",
    status: 0,
    success: true,
    from: "",
    resource: null,
  };
  if (req.method === "GET") {
    return new Promise(async (resolve, reject) => {
      const Connection = AppDataSource.isInitialized
        ? AppDataSource
        : await AppDataSource.initialize();
      const { token } = req.query;
      const { email } = jwt.decode(token.toString(), {
        json: true,
      });
      const user = await Connection?.manager?.findOne(User, {
        where: { email },
      });
      if (user) {
        jwt.verify(token.toString(), process.env.JWT_SECRET);
        const aboutus = await Connection?.manager?.find(AboutUs);
        if (aboutus) {
          apiResponseData.message = "";
          apiResponseData.status = 200;
          apiResponseData.success = true;
          apiResponseData.from = "aboutus";
          apiResponseData.resource = aboutus;
          ApiHelper.successResponse(apiResponseData);
        } else {
          apiResponseData.message = "data not found";
          apiResponseData.status = 404;
          apiResponseData.success = false;
          apiResponseData.from = "aboutus";
          ApiHelper.FaildResponse(apiResponseData);
        }
      } else {
        apiResponseData.message = "forbidden,permission denied";
        apiResponseData.status = 404;
        apiResponseData.success = false;
        apiResponseData.from = "aboutus";
        ApiHelper.FaildResponse(apiResponseData);
      }
      Connection.isInitialized ? Connection.destroy() : null;
    }).catch((error) => {
      apiResponseData.message = "something went wrong";
      apiResponseData.status = 500;
      apiResponseData.success = false;
      apiResponseData.from = "aboutus";
      ApiHelper.FaildResponse(apiResponseData);

      ApiHelper.AddLogs(
        "GetAboutUs",
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
    ApiHelper.FaildResponse(apiResponseData);
  }
};

export default GetAboutUs;
