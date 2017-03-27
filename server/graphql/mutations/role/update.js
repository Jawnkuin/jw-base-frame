import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import roleType from '../../types/role';
import RoleModel from '../../../models/role';
import permissionInputType from '../../types/permission-input';
import keystringUpdateType from '../../types/keystring-update';
import keypermissionlistUpdateType from '../../types/keypermissionlist-update';

async function updateRole ({roleId, data}) {
  const role = await RoleModel
    .findByIdAndUpdate(
      roleId,
      data,
      {upsert: true, new: true}
    ).exec();

  if (!role) {
    throw new Error('Error updating role');
  }

  return role;
}

export const updateRoleDescription = {
  type: roleType,
  args: {
    input: {
      name: 'input',
      type: new GraphQLNonNull(keystringUpdateType)
    }
  },
  resolve (root, params) {
    return updateRole({
      roleId: params.input.id,
      data: {
        description: params.input.value
      }
    });
  }
};


export const updateRolePermissions = {
  type: roleType,
  args: {
    input: {
      name: 'input',
      type: new GraphQLList(keypermissionlistUpdateType)
    }
  },
  async resolve (root, params) {
    return updateRole({
      roleId: params.input.id,
      data: {
        permissions: params.input.value
      }
    });
  }
};
