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

categorySchema.post('find', function (docs) {
  for (const doc of docs) {
    if (doc?._doc) {
      doc._doc._id = doc._doc._id.toString();
      delete doc._doc.__v;
    }
  }
});

categorySchema.post('findOne', function (doc) {
  if (doc?._doc) {
    doc._doc._id = doc._doc._id.toString();
    delete doc._doc.__v;
  }

  return doc;
});

categorySchema.index({ id: 1 });
categorySchema.index({ category_code: 1 });
categorySchema.index({ created_by: 1 });
categorySchema.index({ discount: 1, category_code: 1, category_name: 1 });

export default interface ICategoryModel extends ICategoryDTO, Document<string | Object> {}
export const Category = model<ICategoryModel>('Category', categorySchema);
