import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import { databaseConfig } from '../config';
import {
  Address,
  Administrator,
  Appointment,
  Clock,
  Customer,
  Period,
  Profile,
  Provider,
  ProviderServices,
  Rating,
  Service,
  Stuff,
  User,
} from '../app/models';

const models = [
  Address,
  Administrator,
  Appointment,
  Clock,
  Customer,
  Period,
  Profile,
  Provider,
  ProviderServices,
  Rating,
  Service,
  Stuff,
  User,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
