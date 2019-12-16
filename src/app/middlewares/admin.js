export default async (req, res, next) => {
  console.log('------------------------------');
  console.log(req.headers);
  console.log('------------------------------');
  return next();
};
