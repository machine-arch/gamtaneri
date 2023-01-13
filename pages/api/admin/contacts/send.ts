import { NextApiRequest, NextApiResponse } from "next";
import { apiResponseInterface } from "../../../../config/interfaces/api.interfaces";
import ApiHelper from "../../../../utils/api/apihelper.utils";

const sendContactEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const apiResponseData: apiResponseInterface = {
      res,
      message: "",
      status: 0,
      success: true,
      from: "",
      resource: null,
    };
    return new Promise((resolve, reject) => {
      const { name, email, message } = req.body;
      const nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: "info@gamtaneri.ge",
          pass: "Gamtaneri123",
        },
      });
      const mailOptions = {
        from: email,
        to: email,
        subject: "constact to gamtaneri",
        text: message,
      };
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(info.response);
        }
      });
    })
      .then((response) => {
        apiResponseData.message = "";
        apiResponseData.status = 200;
        apiResponseData.success = true;
        apiResponseData.from = "send_contact_email";
        apiResponseData.resource = null;
        ApiHelper.successResponse(apiResponseData);
      })
      .catch((error) => {
        apiResponseData.message = "";
        apiResponseData.status = 400;
        apiResponseData.success = false;
        apiResponseData.from = "send_contact_email";
        ApiHelper.FaildResponse(apiResponseData);
      });
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

export default sendContactEmail;
