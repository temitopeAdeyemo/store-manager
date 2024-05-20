import IUser from "../../auth/dtos/IUserDTO";

export default interface ICreateProductDTO {
  uploaded_by: string | IUser;
  product_name: string;
  product_code: string;
  category: string;
  amount: boolean;
  discount?: boolean;
  images: string;
  quantity: string;
}
