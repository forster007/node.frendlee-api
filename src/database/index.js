import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import { databaseConfig } from '../config';
import {
  Address,
  Appointment,
  Customer,
  Profile,
  Provider,
  Service,
  User,
  UsersServices,
} from '../app/models';

const models = [
  Address,
  Appointment,
  Customer,
  Profile,
  Provider,
  Service,
  User,
  UsersServices,
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
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/frendlee',
      {
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
