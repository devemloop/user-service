import crypto from 'crypto';

const { USER_PASSWORD_SECRET = '' } = process.env;

const cryptPassword = ({ password }: { password: string }): string =>
  crypto
    .createHmac('sha256', USER_PASSWORD_SECRET)
    .update(password)
    .digest('hex');

export { cryptPassword };
