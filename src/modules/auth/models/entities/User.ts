import { Document, Schema, model } from 'mongoose';
import IUser from '../../dtos/IUserDTO';

const UserSchema: Schema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    authorization_token: { type: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ id: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ email_verified: 1 });

export default interface IUserModel extends IUser, Document<string | Object> {}
export const User = model<IUserModel>('User', UserSchema);
