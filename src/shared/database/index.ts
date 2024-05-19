// require dependencies
import mongoose, { ConnectOptions } from 'mongoose';
import environment from '../../config/environments.config';

class Database {
  async connect() {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(environment.dburl);
      console.log('Database Connected');
    } catch (error) {
      console.log(error);

      throw new Error('Database not Connected');
    }
  }
}

export default Database;
