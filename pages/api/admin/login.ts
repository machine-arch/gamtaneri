import { User } from "../../../src/entity/user.entity";
import AppDataSource from "../../../src/config/ormConfig";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nookies from "nookies";

const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const Connection = await AppDataSource.initialize();
    const tokenExpairy = "2h";
    const { email, password } = req.body;
    const user = await Connection?.manager?.findOne(User, {
      where: { email },
    });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const accesToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: tokenExpairy,
          }
        );
        const refreshToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        nookies.set({ res }, "refreshToken", refreshToken, {
          path: "/",
          maxAge: 86400,
          sameSite: "strict",
          httpOnly: true,
          secure: true,
        });

        user.token = accesToken;
        const date = new Date();
        date.setHours(date.getHours() + 2);
        user.tokenExpire = date;
        await Connection.manager.save(user);
        res
          .status(200)
          .setHeader("Content-Type", "application/json")
          .json({ user });
      } else {
        res.setHeader("Content-Type", "application/json").json({
          message: "Invalid Password",
          status: 401,
          errorType: "unauthorized",
        });
      }
    } else {
      res.setHeader("Content-Type", "application/json").json({
        message: "Invalid Email, or user not exit",
        status: 401,
        errorType: "unauthorized",
      });
    }
    if (Connection.isInitialized) await Connection.destroy();
  } else {
    res.setHeader("Content-Type", "application/json").json({
      message: "Invalid Method",
      status: 405,
      errorType: "method_not_allowed",
    });
  }
};

export default Auth;
