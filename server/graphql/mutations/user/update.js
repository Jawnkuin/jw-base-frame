import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import getProjection from '../../../../helpers/get-projection';
import userType from '../../types/user';
import UserModel from '../../../models/user';

async function updateUser ({userId, projection, data}) {
  const user = await UserModel
    .findByIdAndUpdate(
      userId,
      data,
      {upsert: true, new: true}
    )
    .select(projection);

  if (!user) {
    throw new Error('Error updating user');
  }

  return user;
}

export const updateUserAlias = {
  type: userType,
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

    return updateUser({
      userId: params.id,
      projection,
      data: {
        useralias: params.value
      }
    });
  }
};

export const updateUserTel = {
  type: userType,
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
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldNodes[0]);

    return updateUser({
      userId: params.id,
      projection,
      data: {
        tel: params.value
      }
    });
  }
};

export const updateUserRoles = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    value: {
      name: 'value',
      type: new GraphQLList(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldNodes[0]);

    return updateUser({
      userId: params.id,
      projection,
      data: {
        roles: params.value
      }
    });
  }
};

export const updateUserEmail = {
  type: userType,
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
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldNodes[0]);

    return updateUser({
      userId: params.id,
      projection,
      data: {
        email: params.value
      }
    });
  }
};

export const updateUserStatus = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldNodes[0]);

    return updateUser({
      userId: params.id,
      projection,
      data: {
        status: params.value
      }
    });
  }
};

async function setPassword (user, password) {
  return new Promise((resolve, reject) => {
    user.setPassword(password, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

export const updateUserPassword = {
  type: GraphQLBoolean,
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
  async resolve (root, params) {
    const user = await UserModel.findById(params.id);

    if (!user) {
      throw new Error('User does not exist');
    }

    await setPassword(user, params.value);
    await user.save();

    return user;
  }
};
