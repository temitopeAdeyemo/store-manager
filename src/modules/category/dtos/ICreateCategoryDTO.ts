import IUser from "../../auth/dtos/IUserDTO";

export default interface ICreateCategoryDTO {
  created_by: string | IUser;
  category_name: string;
  category_code: string;
  discount?: string;
}
