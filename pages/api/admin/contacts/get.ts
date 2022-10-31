import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import Contact from "../../../../src/entity/contacts.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";

const GetAllContacts = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();
    const { token } = req.query;
    const { email } = jwt.decode(token.toString(), {
      json: true,
    });
    const user = await Connection?.manager?.findOne(User, { where: { email } });
    if (user) {
      try {
        jwt.verify(token.toString(), process.env.JWT_SECRET);
        const contacts = await Connection?.manager?.find(Contact);
        if (contacts) {
          res
            .status(200)
            .json({ resource: contacts, status: 200, success: true });
        } else {
          res.json({ status: 401, message: "data not found", success: false });
        }
      } catch (error) {
        res.json({
          status: 401,
          message: "Token not valid",
          success: false,
        });
      }
    } else {
      res.json({ message: "User not found", status: 404, success: false });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.json({ message: "Method not Allowd", status: 405, success: false });
  }
};

export default GetAllContacts;
