import { Like } from 'typeorm';
import AppDataSource from '../../../../src/config/ormConfig';
import OurUsers from '../../../../src/entity/ourusers.entity';
import { NextApiRequest, NextApiResponse } from 'next';

const SearchUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { search } = req.query;
    const Connection = AppDataSource.isInitialized
      ? AppDataSource
      : await AppDataSource.initialize();

    try {
      const ourUsers = await Connection?.manager?.find(OurUsers, {
        where: [
          {
            title: Like(`%${search}%`),
          },

          {
            title_eng: Like(`%${search}%`),
          },
        ],
        order: {
          id: 'DESC',
        },
      });
      if (ourUsers) {
        res.status(200).json({
          resource: ourUsers,
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
        message: 'Something went wrong, please try again later',
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

export default SearchUsers;
