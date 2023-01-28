import { NextApiRequest, NextApiResponse } from "next";
import AppDataSource from "../../../../src/config/ormConfig";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";

const getOne = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();
    const id = req.query.id;
    try {
      const complatedProject = await Connection?.getRepository(
        ComplatedProjects
      ).findOne({
        where: { id: Number(id) },
      });
      if (complatedProject) {
        res.status(200).json({
          resource: complatedProject,
          status: 200,
          success: true,
        });
      } else {
        res.json({
          resource: [],
          message: "data not found",
          status: 404,
          success: false,
        });
      }
    } catch (error) {
      res.json({
        resource: [],
        message: "Token not valid",
        status: 401,
        success: false,
      });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.json({
      resource: [],
      message: "Method not Allowd",
      status: 405,
      success: false,
    });
  }
};

export default getOne;
