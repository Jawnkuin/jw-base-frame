import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import getProjection from '../../../../helpers/get-projection';
import roleType from '../../types/role';
import RoleModel from '../../../models/role';
import permissionInputType from '../../types/permission-input';

async function updateRole ({roleId, projection, data}) {
  const role = await RoleModel
    .findByIdAndUpdate(
      roleId,
      data,
      {upsert: true, new: true}
    )
    .select(projection);

  if (!role) {
    throw new Error('Error updating role');
  }

  return role;
}

export const updateRoleDescription = {
  type: roleType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params, context, info) {
    // key-value pairs projection
    const projection = getProjection(info.fieldNodes[0]);

    return updateRole({
      roleId: params.id,
      projection,
      data: {
        description: params.value
      }
    });
  }
};


export const updateRolePermissions = {
  type: roleType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    value: {
      name: 'value',
      type: new GraphQLList(permissionInputType)
    }
  },
  async resolve (root, params, context, options) {
    const projection = getProjection(options.fieldNodes[0]);

    return updateRole({
      roleId: params.id,
      projection,
      data: {
        permissions: params.value
      }
    });
  }
};
