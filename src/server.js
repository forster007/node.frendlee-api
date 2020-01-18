import moment from 'moment';
import app from './app';

app.listen(process.env.PORT, () => {
  const DATE = moment().format('DD/MM/YYYY HH:mm:ss');
  const { PORT } = process.env;

  console.log(`Started server at ${DATE} on port ${PORT}`);
});
