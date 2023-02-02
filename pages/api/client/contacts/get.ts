import { NextApiRequest, NextApiResponse } from "next";
import Contact from "../../../../src/entity/contacts.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import nookies from "nookies";
const GetContacts = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();
    try {
      const contacts = await Connection?.manager?.find(Contact);
      if (contacts) {
        res
          .status(200)
          .json({ resource: contacts[0], status: 200, success: true });
      } else {
        res.json({
          resource: {},
          status: 401,
          message: "data not found",
          success: false,
        });
      }
    } catch (error) {
      res.json({
        resource: {},
        status: 401,
        message: "Token not valid",
        success: false,
      });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.json({
      resource: {},
      message: "Method not Allowd",
      status: 405,
      success: false,
    });
  }
};

export default GetContacts;
