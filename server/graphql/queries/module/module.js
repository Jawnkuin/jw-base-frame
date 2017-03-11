import {GraphQLID} from 'graphql';
import moduleType from '../../types/module';
import ModuleModel from '../../../models/module';


export default {
  type: moduleType,
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    }
  },
  resolve (root, params) {
    const id = params.id;
    return ModuleModel.findById(id).exec();
  }
};
