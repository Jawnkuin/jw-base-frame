import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';


import moduleType from '../../types/module';
import ModuleModel from '../../../models/module';

export default {
  type: new GraphQLList(moduleType),
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    const removedRootNode = await ModuleModel.findOneByID(params.id).exec();

    if (!removedRootNode) {
      throw new Error('Error removing Module');
    }
    const path = removedRootNode.path;
    const removedTree = ModuleModel.remove({path: new RegExp(path)}).exec();

    return removedTree;
  }
};
