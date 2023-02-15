import { NextApiRequest, NextApiResponse } from "next";
import ComplatedProjects from "../../../../src/entity/complatedprojects.entity";
import AppDataSource from "../../../../src/config/ormConfig";

const GetAllProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { from, count } = req.query;
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();

    try {
      const complatedProjects = await Connection?.manager?.find(
        ComplatedProjects,
        {
          order: {
            id: "DESC",
          },
          skip: Number(from),
          take: Number(count),
        }
      );
      const countProjects = await Connection?.manager?.count(ComplatedProjects);
      if (complatedProjects) {
        res.status(200).json({
          resource: complatedProjects,
          count: countProjects,
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

export default GetAllProjects;
