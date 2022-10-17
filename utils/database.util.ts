import AppDataSource from "../src/config/ormConfig";
import { Logs } from "../src/entity/logs.entity";

export const AddLogs = async (
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
