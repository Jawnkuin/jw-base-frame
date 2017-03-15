import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';


import roleType from '../../types/role';
import RoleModel from '../../../models/role';
import UserModel from '../../../models/user';

export default {
  type: roleType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    const removedRole = await RoleModel.findByIdAndRemove(params.id).exec();

    if (!removedRole) {
      throw new Error('Error removing role');
    }

    UserModel.updateMany({roles: params.id}, {$pull: {roles: params.id}}).exec();

    return removedRole;
  }
};
