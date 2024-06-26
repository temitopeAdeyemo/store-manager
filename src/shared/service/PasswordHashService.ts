import bcrypt from "bcryptjs";
import environment from "../../config/environments.config";

class PasswordHashService {
  private saltRounds: string | number;
  constructor() {
    this.saltRounds = environment.saltRounds;
  }

  async hash(data: string): Promise<string> {
    const hashedData = await bcrypt.hash(data, this.saltRounds);
    return hashedData;
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    const comparedData = await bcrypt.compare(data, hashedData);
    return comparedData;
  }
}
export default PasswordHashService;
