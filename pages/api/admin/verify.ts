import { NextApiRequest, NextApiResponse } from "next";
import AppDataSource from "../../../src/config/ormConfig";
import { User } from "../../../src/entity/user.entity";
import jwt from "jsonwebtoken";
import nookies from "nookies";

const CheckToken = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();
    const { token } = req.body;
    const user = await Connection?.manager?.findOne(User, {
      where: { token },
    });
    if (user) {
      if (jwt.verify(token, process.env.JWT_SECRET)) {
        res
          .setHeader("Content-Type", "application/json")
          .json({ user, isValid: true, status: 200 });
      } else {
        const refreshToken = nookies.get({ req })["refreshToken"];
        if (refreshToken) {
          jwt.verify(refreshToken, process.env.JWT_SECRET);
          const accesToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "2h",
            }
          );
          user.token = accesToken;
          const date = new Date();
          date.setHours(date.getHours() + 2);
          user.tokenExpire = date;
          await Connection.manager.save(user);
          res
            .setHeader("Content-Type", "application/json")
            .json({ user, isValid: true, status: 200 });
        } else {
          res.setHeader("Content-Type", "application/json").json({
            message: "Token Expired",
            status: 401,
            errorType: "unauthorized",
            isValid: false,
          });
        }
      }
    } else {
      res.setHeader("Content-Type", "application/json").json({
        message: "Invalid Token",
        status: 401,
        errorType: "unauthorized",
        isValid: false,
      });
    }
    if (Connection.isInitialized) await Connection.destroy();
  } else {
    res.setHeader("Content-Type", "application/json").json({
      message: "Invalid Method",
      status: 405,
      errorType: "method_not_allowed",
      isValid: false,
    });
  }
};

export default CheckToken;
