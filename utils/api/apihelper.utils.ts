import Logs from "../../src/entity/logs.entity";
import AppDataSource from "../../src/config/ormConfig";
import { NextApiResponse } from "next";
import { apiResponseInterface } from "../../config/interfaces/api.interfaces";
class ApiHelper {
  constructor() {}

  public static successResponse(...params: apiResponseInterface[]) {
    const { res, message, status, success, from, total, resource } = params[0];
    res?.json({
      resource,
      message,
      success,
      status,
      total,
      from,
    });
  }

  public static FaildResponse(...params: apiResponseInterface[]) {
    const { res, message, status, success, from } = params[0];
    res.json({
      message,
      success,
      status,
      from,
    });
  }

  public static AddLogs = async (
    apiName: string,
    errorMessage: string,
    remoteIp: string,
    localeIp: string
  ) => {
    const Log = new Logs();
    Log.apiName = apiName;
    Log.errorMessage = errorMessage;
    Log.remoteIp = remoteIp;
    Log.localeIp = localeIp;
    await AppDataSource.manager.save(Log);
  };
}

export default ApiHelper;
