import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import AboutUs from "../../../../src/entity/aboutus.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";
import formidable from "formidable-serverless";
import path from "path";
import slugify from "slugify";
import nookies from "nookies";

export const config = {
  api: {
    bodyParser: false,
  },
};

const CreateAboutUs = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: path.join(process.cwd(), "public", "uploads"),
    keepExtensions: true,
    keepFilenames: true,
  });

  let ImagePath = null;

  form.on("fileBegin", (name, file) => {
    file.path = path.join(form.uploadDir, slugify(file.name));
    const filePath = path
      .relative(process.cwd(), file.path)
      .replace("public", "");
    ImagePath = filePath.replace(/\\/g, "/");
  });
  form.parse(req, async (err, fields, files) => {
    if (req.method === "POST") {
      const { token, title, title_eng, description, description_eng } = fields;
      const Connection = AppDataSource.isInitialized
        ? AppDataSource
        : await AppDataSource.initialize();
      const { email } = jwt.decode(token, {
        json: true,
      });
      const user = await Connection.getRepository(User).findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        try {
          jwt.verify(token, process.env.JWT_SECRET);
          const aboutUs = new AboutUs();
          aboutUs.title = title;
          aboutUs.title_eng = title_eng;
          aboutUs.description = description;
          aboutUs.description_eng = description_eng;
          aboutUs.createdAt = new Date();
          aboutUs.updatedAt = new Date();
          aboutUs.image = ImagePath;
          await Connection.getRepository(AboutUs).save(aboutUs);
          res.status(200).json({
            message: "About Us created",
            success: true,
          });
        } catch (error) {
          res.json({
            message: "Token not valid",
            token: null,
            success: false,
            status: 401,
          });
        }
      } else {
        res.json({
          message: "User not found",
          isVerified: false,
          token: null,
          success: false,
          status: 401,
        });
      }
      Connection.isInitialized ? Connection.destroy() : null;
    } else {
      res.json({
        message: "Method not allowed",
        token: null,
        success: false,
        status: 405,
      });
    }
  });
};

export default CreateAboutUs;
