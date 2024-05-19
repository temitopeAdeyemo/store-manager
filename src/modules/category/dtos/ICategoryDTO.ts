import ICreateCategoryDTO from './ICreateCategoryDTO';

export default interface ICategoryDTO extends ICreateCategoryDTO {
  _id?: string | Object;
  _doc?: this;
}
