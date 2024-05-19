import { Schema, model, Document } from 'mongoose';
import ICategoryDTO from '../../dtos/ICategoryDTO';

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    category_code: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: String,
      default: '0.00',
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default interface ICategoryModel extends ICategoryDTO, Document<string | Object> {}
export const Category = model<ICategoryModel>('Category', categorySchema);
