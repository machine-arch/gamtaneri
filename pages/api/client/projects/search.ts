import { Like } from 'typeorm';
import AppDataSource from '../../../../src/config/ormConfig';
import ComplatedProjects from '../../../../src/entity/complatedprojects.entity';

const SearchProjects = async (req, res) => {
  if (req.method === 'GET') {
    const { search } = req.query;
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();

    try {
      const complatedProjects = await Connection?.manager?.find(
        ComplatedProjects,
        {
          where: [
            {
              project_name: Like(`%${search}%`),
            },

            {
              project_name_eng: Like(`%${search}%`),
            },
          ],
          order: {
            id: 'DESC',
          },
        }
      );
      if (complatedProjects) {
        res.status(200).json({
          resource: complatedProjects,
          status: 200,
          success: true,
        });
      } else {
        res.json({
          resource: [],
          message: 'data not found',
          status: 404,
          success: false,
        });
      }
    } catch (error) {
      res.json({
        resource: [],
        message: 'Token not valid',
        status: 401,
        success: false,
      });
    }
    Connection.isInitialized ? Connection.destroy() : null;
  } else {
    res.json({
      resource: [],
      message: 'Method not Allowd',
      status: 405,
      success: false,
    });
  }
};

export default SearchProjects;
