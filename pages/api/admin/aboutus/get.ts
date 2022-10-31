import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import AboutUs from "../../../../src/entity/aboutus.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";
import nookies from "nookies";

const GetAboutUs = async (req: NextApiRequest, res: NextApiResponse) => {
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
        const aboutus = await Connection?.manager?.find(AboutUs);
        if (aboutus) {
          res
            .status(200)
            .json({ resource: aboutus, status: 200, success: true });
        } else {
          res.json({ message: "data not found", status: 404, success: false });
        }
      } catch (error) {
        res.json({ message: "Token not valid", status: 401, success: false });
      }
    } else {
      res.json({ message: "User not found", status: 404, success: false });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.json({ message: "Method not Allowd", status: 405, success: false });
  }
};

export default GetAboutUs;
