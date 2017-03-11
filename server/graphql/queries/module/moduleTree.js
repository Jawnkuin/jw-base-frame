import {
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';
import moduleType from '../../types/module';
import ModuleModel from '../../../models/module';


export default {
  type: new GraphQLList(moduleType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    },
    // `true` for direct descandents `false` for whole subtree
    limit: {
      name: 'limit',
      type: GraphQLBoolean,
      default: false
    }
  },
  async resolve (root, params) {
    const id = params.id;
    if (!id) {
      return ModuleModel.find().sort({path: 1}).exec();
    }

    const rootNode = await ModuleModel.findById(id).exec();

    const regParam = params.limit ? new RegExp(`${rootNode.path}(\\w+,)?$`, 'y') :
      new RegExp(rootNode.path, 'y');
    return ModuleModel.find({path: regParam}).exec();
  }
};
