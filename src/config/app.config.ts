import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();
export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV,
  appKey: process.env.APP_KEY,
  secretKeyToolVisor: process.env.SECRET_KEY_DATAIKU_VISOR,
  secretKeyToolSigc: process.env.SECRET_KEY_DATAIKU_SIGC,
  apiUrlTool: process.env.API_URL_DATAIKU,
  soapUserDataUrl: process.env.SOAP_USER_DATA_URL,
  optKey: process.env.OTP_KEY,
  sendSmsLocalUrl: process.env.SEND_SMS_LOCAL_URL,
}));
