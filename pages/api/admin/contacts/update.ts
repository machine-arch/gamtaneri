import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import Contacts from "../../../../src/entity/contacts.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";
import { apiResponseInterface } from "../../../../config/interfaces/api.interfaces";
import ApiHelper from "../../../../utils/api/apihelper.utils";

const UpdateContacts = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResponseData: apiResponseInterface = {
    res,
    message: "",
    status: 0,
    success: true,
    from: "",
    resource: null,
  };
  if (req.method === "PUT") {
    return new Promise(async (resolve, reject) => {
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
        const allContacts = await Connection.getRepository(Contacts).findOne({
          where: {
            id,
          },
        });
        apiResponseData.message = "contacts updated successfully";
        apiResponseData.status = 200;
        apiResponseData.success = true;
        apiResponseData.from = "contacts";
        apiResponseData.resource = [allContacts];
        ApiHelper.successResponse(apiResponseData);
      } else {
        apiResponseData.message = "forbidden, permission denied";
        apiResponseData.status = 403;
        apiResponseData.success = false;
        apiResponseData.from = "contacts";
        ApiHelper.FaildResponse(apiResponseData);
      }
      Connection.isInitialized ? Connection.destroy() : null;
    }).catch((error) => {
      apiResponseData.message = "something went wrong";
      apiResponseData.status = 500;
      apiResponseData.success = false;
      apiResponseData.from = "contacts";
      ApiHelper.FaildResponse(apiResponseData);
    });
  } else {
    apiResponseData.message = "method not allowed";
    apiResponseData.status = 405;
    apiResponseData.success = false;
    apiResponseData.from = "contacts";
    ApiHelper.FaildResponse(apiResponseData);
  }
};

export default UpdateContacts;
