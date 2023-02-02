import { NextApiRequest, NextApiResponse } from "next";
import AppDataSource from "../../../src/config/ormConfig";
import User from "../../../src/entity/user.entity";
import jwt from "jsonwebtoken";
import nookies from "nookies";

export default async function Logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const Connection = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize();
  const { token } = req.body.user;
  const { email } = jwt.decode(token) as { email: string };

  const user = await Connection.getRepository(User).findOne({
    where: { email },
  });

  if (user) {
    user.token = "";
    user.tokenExpire = new Date();
    await Connection.getRepository(User).save(user);
    nookies.destroy({ res }, "refreshToken", { path: "/" });
    res.status(200).json({ message: "Logout success" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
  Connection.isInitialized ? Connection.destroy() : null;
}
