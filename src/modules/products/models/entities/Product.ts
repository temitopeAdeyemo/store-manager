import { Schema, model, Document } from 'mongoose';
import IProductDTO from '../../dtos/IProductDto';

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
      unique: true,
    },
    product_code: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    amount: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      default: '0.00',
    },
    uploaded_by: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default interface IProductModel extends IProductDTO, Document<string | Object> {}
export const Product = model<IProductModel>('Product', productSchema);
