import mongoose from 'mongoose';

const options = {discriminatorKey: 'restype'};
const ResourceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, options);

const ResourceModel = mongoose.model('Resource', ResourceSchema);
export {
  options,
  ResourceModel
};
