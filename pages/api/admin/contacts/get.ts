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
      if (jwt.verify(token.toString(), process.env.JWT_SECRET)) {
        const contacts = await Connection?.manager?.find(Contact);
        if (contacts) {
          res.status(200).json(contacts);
        } else {
          res.status(404).json({ message: "data not found" });
        }
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.status(404).json({ message: "Method not Allowd" });
  }
};

export default GetAllContacts;
