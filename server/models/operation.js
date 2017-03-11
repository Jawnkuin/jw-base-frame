import mongoose from 'mongoose';

const OperationFields = {
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 15
  },
  description: {
    type: String,
    trim: true,
    maxlength: 30
  }
};

const OperationSchema = new mongoose.Schema(OperationFields);

const OperationModel = mongoose.model('Operation', OperationSchema);

export {
  OperationSchema,
  OperationModel
};
