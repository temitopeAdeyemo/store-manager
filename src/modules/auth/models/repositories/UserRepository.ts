import { User } from '../entities/User';
import IUserModel from '../entities/User';
import ICreateUser from '../../dtos/ICreateUserDTO';
import BaseRepository from '../../../../shared/core/BaseRepository';

class UserRepository extends BaseRepository<IUserModel, ICreateUser, '_id' | 'email'> {
  constructor() {
    super(User);
  }
}

export default UserRepository;
