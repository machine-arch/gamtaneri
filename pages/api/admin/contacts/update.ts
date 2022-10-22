import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import Contacts from "../../../../src/entity/contacts.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";

const UpdateContacts = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const {
      id,
      token,
      address,
      address_eng,
      phone,
      email,
      description,
      description_eng,
    } = req.body;
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();
    const { email: userEmail } = jwt.decode(token, {
      json: true,
    });
    const user = await Connection?.getRepository(User).findOne({
      where: {
        email: userEmail,
      },
    });
    if (user) {
      if (jwt.verify(token, process.env.JWT_SECRET)) {
        const contacts = await Connection.getRepository(Contacts).findOne({
          where: {
            id,
          },
        });
        contacts.address = address;
        contacts.address_eng = address_eng;
        contacts.phone = phone;
        contacts.email = email;
        contacts.updatedAt = new Date();
        contacts.createdAt = new Date();
        contacts.description = description;
        contacts.description_eng = description_eng;
        await Connection.getRepository(Contacts).save(contacts);
        res.status(200).json({
          message: "Contacts updated",
        });
      } else {
        res.status(400).json({
          message: "Token not valid",
        });
      }
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } else {
    res.status(400).json({
      message: "Method not allowed",
    });
  }
};

export default UpdateContacts;
