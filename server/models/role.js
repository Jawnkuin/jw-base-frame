import mongoose from 'mongoose';
import PermissionSchema from './permission';


const RoleSchema = new mongoose.Schema({
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
  permissions: [PermissionSchema]
});

const RoleModel = mongoose.model('Role', RoleSchema);

export default RoleModel;
