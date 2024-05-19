import ICreateProductDTO from './ICreateProductDto';

export default interface IProductDTO extends ICreateProductDTO {
  _id?: string | Object;
  _doc?: this;
}
