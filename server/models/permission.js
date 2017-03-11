import mongoose from 'mongoose';
import {OperationSchema} from './operation';


const PermissionSchema = new mongoose.Schema({
  operation: OperationSchema,
  resource: {
    type: mongoose.Schema.Types.ObjectId
  }
});

// const PermissionModel = mongoose.model('Permission', PermissionSchema);

export default PermissionSchema;
