import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  loginname: {
    type: String,
    required: true,
    unique: true
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }],
  useralias: {
    type: String,
    required: true
  },
  tel: {
    type: String
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  status: {
    type: Number,
    required: true,
    default: 0
  }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
