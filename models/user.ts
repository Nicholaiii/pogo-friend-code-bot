import mongoose, { Model, Document } from 'mongoose'

export interface IUserDocument extends Document {
  uid: String
  code: String
}

export interface IUserModel extends Model<IUserDocument> {
  findByUid: (uid: string) => Promise<IUserDocument>,
  setCode: (uid: string, code: string) => Promise<IUserDocument>
}

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, index: true, unique: true },
  code: { type: String, required: true, unique: true  }
})

UserSchema.statics.findByUid = function (uid: string): Promise<IUserDocument> {
   return User.findOne({ uid }).exec()
}

UserSchema.statics.setCode = function (uid: string, code: string): Promise<IUserDocument> {
  return User.findOneAndUpdate({ uid }, { code }, {
    new: true,
    upsert: true
  }).exec()
}

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema)

export default User
