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
      try {
        jwt.verify(token, process.env.JWT_SECRET);
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
          success: true,
        });
      } catch (error) {
        res.json({
          message: "Token not valid",
          success: false,
          status: 401,
        });
      }
    } else {
      res.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }
  } else {
    res.json({
      message: "Method not allowed",
      status: 405,
      success: false,
    });
  }
};

export default UpdateContacts;
