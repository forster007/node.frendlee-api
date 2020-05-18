import acl from 'express-acl';

export default async (req, res, next) => {
  acl.config({
    baseUrl: 'api',
    filename: 'acl.json',
    path: 'src/config',
    roleSearchPath: 'headers.account_type',
  });

  next();
};
