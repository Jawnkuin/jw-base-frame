import {
  GraphQLNonNull
} from 'graphql';

import roleInputType from '../../types/role-input';
import roleType from '../../types/role';
import RoleModel from '../../../models/role';


export default {
  type: roleType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(roleInputType)
    }
  },
  async resolve (root, params) {
    const {name, description, permissions} = params.data;
    const role = await new RoleModel({
      name,
      description,
      permissions
    }).save();
    /*
    const count = await UserModel.count();


    if (count > 0) {
      authorize(root);
    }
    */

    return role;
  }
};
