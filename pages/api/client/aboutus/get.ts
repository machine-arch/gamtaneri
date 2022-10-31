import { NextApiRequest, NextApiResponse } from "next";
import AboutUs from "../../../../src/entity/aboutus.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import nookies from "nookies";

const GetAboutUs = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();

    try {
      const aboutus = await Connection?.manager?.find(AboutUs);
      if (aboutus) {
        res
          .status(200)
          .json({ resource: aboutus[0], status: 200, success: true });
      } else {
        res.json({
          resource: {},
          message: "data not found",
          status: 404,
          success: false,
        });
      }
    } catch (error) {
      res.json({ message: "Token not valid", status: 401, success: false });
    }

    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.json({ message: "Method not Allowd", status: 405, success: false });
  }
};

export default GetAboutUs;
