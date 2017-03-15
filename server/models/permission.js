import mongoose from 'mongoose';


const PermissionSchema = new mongoose.Schema({
  operation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operation'
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  }
});

// const PermissionModel = mongoose.model('Permission', PermissionSchema);

export default PermissionSchema;
