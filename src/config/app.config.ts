import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();
export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV,
  appKey: process.env.APP_KEY,
  secretKeyTool: process.env.SECRET_KEY_DATAIKU,
  apiUrlTool: process.env.API_URL_DATAIKU,
}));
