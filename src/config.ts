import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  loginUrl: process.env.LOGIN_URL || 'https://app.ninjarmm.com/auth/#/login',
  credentials: {
    validUser: process.env.VALID_USER || 'halimetemiz46@gmail.com',
    validPassword: process.env.VALID_PASSWORD || 'Pass@123',
  },
};