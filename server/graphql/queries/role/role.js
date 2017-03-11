import {GraphQLID} from 'graphql';
import roleType from '../../types/role';
import RoleModel from '../../../models/role';


export default {
  type: roleType,
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    }
  },
  resolve (root, params) {
    const id = params.id;
    return RoleModel.findById(id).exec();
  }
};
