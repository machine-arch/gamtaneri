import { NextApiRequest, NextApiResponse } from "next";
import OurUsers from "../../../../src/entity/ourusers.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import nookies from "nookies";

const GetAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();
    try {
      const ourUsers = await Connection?.manager?.find(OurUsers);
      if (ourUsers) {
        res
          .status(200)
          .json({ resource: ourUsers, success: true, status: 200 });
      } else {
        res.json({
          resource: null,
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

export default GetAllUsers;
