export default interface ICreateProductDTO {
  uploaded_by: string;
  product_name: string;
  product_code: string;
  category: string;
  amount: boolean;
  discount?: boolean;
}
