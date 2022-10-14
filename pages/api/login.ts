import { User } from "../../src/entity/user.entity";
import AppDataSource from "../../src/config/ormConfig";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    AppDataSource.initialize()
      .then(async () => {
        const tokenExpairy = "2h"; // 2 hours
        const { email, password } = req.body;
        const user = await AppDataSource.manager.findOne(User, {
          where: { email },
        });

        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
              { id: user.id, email: user.email },
              process.env.JWT_SECRET,
              {
                expiresIn: tokenExpairy,
              }
            );
            user.token = token;
            const date = new Date();
            date.setHours(date.getHours() + 2);
            user.tokenExpire = date;
            await AppDataSource.manager.save(user);
            res
              .status(200)
              .setHeader("Content-Type", "application/json")
              .json({ user });
          } else {
            res
              .status(401)
              .setHeader("Content-Type", "application/json")
              .json({ message: "Invalid Password" });
          }
        } else {
          res
            .status(401)
            .setHeader("Content-Type", "application/json")
            .json({ message: "Invalid Email, or user not exit" });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => AppDataSource.destroy());
  }
};

export default Auth;
