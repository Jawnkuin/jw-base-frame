import mongoose from 'mongoose';
import {options, ResourceModel} from './resource';

const ModuleSchema = new mongoose.Schema({
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
  },
  // use path to indicate the position of item in a tree
  // see: https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-materialized-paths/
  path: {
    type: String,
    trim: true
  }
}, options);

// Module inherits Resource
const ModuleModel = ResourceModel.discriminator('Module', ModuleSchema);

export default ModuleModel;
