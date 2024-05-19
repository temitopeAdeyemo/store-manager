import { StatusCodes as statusCode } from 'http-status-codes';
import AppError from '../../../shared/utils/AppError';
import ICreateUser from '../dtos/ICreateUserDTO';
import UserRepository from '../models/repositories/UserRepository';
import PasswordHashService from '../../../shared/service/PasswordHashService';
import constants from '../../../shared/utils/constants';

export default class RegisterUserService {
  private userRepository: UserRepository = new UserRepository();
  private passwordHashService: PasswordHashService = new PasswordHashService();

  async execute(data: ICreateUser) {
    const emailExists = await this.userRepository.findByUniqueData('email', data.email);

    if (emailExists) throw new AppError(constants.EMAIL_EXISTS, statusCode.CONFLICT);

    const hashedPassword = await this.passwordHashService.hash(data.password);

    const { _id: id } = await this.userRepository.create({ ...data, password: hashedPassword });

    return { id };
  }
}
