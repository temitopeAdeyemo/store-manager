import { StatusCodes as statusCode } from 'http-status-codes';
import AppError from '../../../shared/utils/AppError';
import UserRepository from '../models/repositories/UserRepository';
import PasswordHashService from '../../../shared/service/PasswordHashService';
import ILoginUser from '../dtos/ILoginDto';
import JwtClient from '../../../shared/service/JWT';
import constants from '../../../shared/utils/constants';
import { systemLogs } from '../../../shared/utils/Logger';

export default class LoginUserService {
  private userRepository: UserRepository = new UserRepository();
  private passwordHashService: PasswordHashService = new PasswordHashService();
  private jwtClient: JwtClient = new JwtClient();

  async execute(data: ILoginUser) {
    const emailExists = await this.userRepository.findByUniqueData('email', data.email);

    if (!emailExists) throw new AppError(constants.INCORRECT_LOGIN_CREDENTIALS, statusCode.UNAUTHORIZED);

    const passwordMatch = await this.passwordHashService.compare(data.password, emailExists.password);

    if (!passwordMatch) throw new AppError(constants.INCORRECT_LOGIN_CREDENTIALS, statusCode.UNAUTHORIZED);

    const accessToken = this.jwtClient.generateAccessToken({ id: emailExists._id, email: data.email });

    await this.userRepository.updateById(emailExists._id as string, { authorization_token: accessToken });

    systemLogs(data.email).info("Logged in successfully.")

    return { access_token: accessToken };
  }
}
