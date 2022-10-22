import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/entity/user.entity";
import AboutUs from "../../../../src/entity/aboutus.entity";
import AppDataSource from "../../../../src/config/ormConfig";
import jwt from "jsonwebtoken";
import formidable from "formidable-serverless";
import path from "path";
import slugify from "slugify";

export const config = {
  api: {
    bodyParser: false,
  },
};

const UpdateAboutUs = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: path.join(process.cwd(), "public", "uploads"),
    keepExtensions: true,
    keepFilenames: true,
  });

  let ImagePath = null;

  form.on("fileBegin", (name, file) => {
    file.path = path.join(form.uploadDir, slugify(file.name));
    ImagePath = path.relative(process.cwd(), file.path);
  });
  form.parse(req, async (err, fields, files) => {
    if (req.method === "POST") {
      const { id, token, title, title_eng, description, description_eng } =
        fields;
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
        if (jwt.verify(token, process.env.JWT_SECRET)) {
          const aboutUs = await Connection?.getRepository(AboutUs).findOne({
            where: {
              id,
            },
          });
          aboutUs.title = title;
          aboutUs.title_eng = title_eng;
          aboutUs.description = description;
          aboutUs.description_eng = description_eng;
          aboutUs.createdAt = new Date();
          aboutUs.updatedAt = new Date();
          aboutUs.image =
            ImagePath && ImagePath.length > 0 ? ImagePath : aboutUs.image;
          await Connection.getRepository(AboutUs).save(aboutUs);
          res.status(200).json({
            message: "About Us updated",
          });
        } else {
          res.status(400).json({
            message: "Token not valid",
            isVerified: false,
          });
        }
      } else {
        res.status(400).json({
          message: "User not found",
          isVerified: false,
        });
      }
      Connection.isInitialized ? Connection.destroy() : null;
    } else {
      res.status(400).json({
        message: "Method not allowed",
      });
    }
  });
};

export default UpdateAboutUs;
