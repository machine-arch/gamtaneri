import { NextApiRequest, NextApiResponse } from "next";

const sendContactEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
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
          console.log(error);
          reject(error);
        } else {
          resolve(info.response);
        }
      });
    })
      .then((response) => {
        res.status(200).json({ response });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

export default sendContactEmail;
