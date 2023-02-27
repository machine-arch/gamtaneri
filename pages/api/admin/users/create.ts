import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../src/entity/user.entity';
import OurUsers from '../../../../src/entity/ourusers.entity';
import AppDataSource from '../../../../src/config/ormConfig';
import jwt from 'jsonwebtoken';
import { apiResponseInterface } from '../../../../config/interfaces/api.interfaces';
import ApiHelper from '../../../../utils/api/apihelper.utils';

const CreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResponseData: apiResponseInterface = {
    res,
    message: '',
    status: 0,
    success: true,
    from: '',
    resource: null,
  };
  if (req.method === 'POST') {
    return new Promise(async (resolve, reject) => {
      const { token, title, title_eng, description, description_eng, isTop } =
        req.body;
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
        jwt.verify(token, process.env.JWT_SECRET);
        const ourUser = new OurUsers();
        ourUser.title = title;
        ourUser.title_eng = title_eng;
        ourUser.description = description;
        ourUser.description_eng = description_eng;
        ourUser.isTop = isTop;
        ourUser.createdAt = new Date();
        ourUser.updatedAt = new Date();
        await Connection.getRepository(OurUsers).save(ourUser);
        const ourUsers = await Connection.getRepository(OurUsers).find({
          order: { id: 'DESC' },
        });
        apiResponseData.message = 'User created successfully';
        apiResponseData.status = 200;
        apiResponseData.success = true;
        apiResponseData.from = 'users';
        apiResponseData.resource = ourUsers;
        ApiHelper.successResponse(apiResponseData);
      } else {
        apiResponseData.message = 'Forbidden, Permission denied';
        apiResponseData.status = 403;
        apiResponseData.success = false;
        apiResponseData.from = 'users';
        apiResponseData.resource = null;
        ApiHelper.FaildResponse(apiResponseData);
      }
      Connection.isInitialized ? Connection.destroy() : null;
    }).catch((error) => {
      apiResponseData.message = 'something went wrong';
      apiResponseData.status = 500;
      apiResponseData.success = false;
      apiResponseData.from = 'users';
      apiResponseData.resource = null;
      ApiHelper.FaildResponse(apiResponseData);

      ApiHelper.AddLogs(
        'CreateUser',
        error.message,
        req.socket.remoteAddress,
        req.socket.localAddress
      );
    });
  } else {
    apiResponseData.message = 'Method not allowed';
    apiResponseData.status = 405;
    apiResponseData.success = false;
    apiResponseData.from = 'users';
    apiResponseData.resource = null;
    ApiHelper.FaildResponse(apiResponseData);
  }
};

export default CreateUser;
