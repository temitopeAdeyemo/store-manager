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
    quantity: {
      type: String,
    },
    availability_status: {
      type: String,
      enum: ['AVAILABLE', 'OUT OF STOCK'],
      default: 'AVAILABLE',
    },
    images: {
      type: String,
      default: '/',
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

productSchema.post('find', function (docs) {
  for (const doc of docs) {
    if (doc?._doc) {
      doc._doc._id = doc._doc._id.toString();
      delete doc._doc.__v;
    }
  }
});

productSchema.post('findOne', function (doc) {
  if (doc?._doc) {
    doc._doc._id = doc._doc._id.toString();
    delete doc._doc.__v;
  }

  return doc;
});

productSchema.index({ id: 1 });
productSchema.index({ product_code: 1 });
productSchema.index({ uploaded_by: 1 });
productSchema.index({ category: 1 });
productSchema.index({ availability_status: 1 });
productSchema.index({ product_name: 1, amount: 1, discount: 1, availability_status: 1 });

export default interface IProductModel extends IProductDTO, Document<string | Object> {}
export const Product = model<IProductModel>('Product', productSchema);
