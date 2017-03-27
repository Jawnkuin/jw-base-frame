import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';
import userType from '../../types/user';
import UserModel from '../../../models/user';
import keystringUpdateType from '../../types/keystring-update';
import keylistUpdateType from '../../types/keylist-update';
import keyfieldvaluepairsUpdateType from '../../types/keyfieldvaluepairs-update';

async function updateUser ({userId, data}) {
  const user = await UserModel
    .findByIdAndUpdate(
      userId,
      data,
      {upsert: true, new: true}
    ).exec();

  if (!user) {
    throw new Error('Error updating user');
  }

  return user;
}

export const updateUserMultiFields = {
  type: userType,
  args: {
    input: {
      name: 'input',
      type: new GraphQLNonNull(keyfieldvaluepairsUpdateType)
    }
  },
  resolve (root, params) {
    const fieldValuePairs = {};
    params.input.fieldvalues.forEach((fv) => {
      let value;
      switch (fv.ftype) {
        case 'Float':
          value = parseFloat(fv.value) || '';
          break;
        case 'Int':
          value = parseInt(fv.value, 10) || '';
          break;
        case 'Boolean':
          value = !!fv.value;
          break;
        default:
          value = fv.value;
      }
      if (!value) {
        throw new Error(`Error updateUserMultiFields invalid value for field ${fv.field}`);
      }
      fieldValuePairs[fv.field] = fv.value;
    });
    return updateUser({
      userId: params.input.id,
      data: fieldValuePairs
    });
  }
};

export const updateUserAlias = {
  type: userType,
  args: {
    input: {
      name: 'input',
      type: new GraphQLNonNull(keystringUpdateType)
    }
  },
  resolve (root, params) {
    // key-value pairs projection

    return updateUser({
      userId: params.input.id,
      data: {
        useralias: params.input.value
      }
    });
  }
};

export const updateUserTel = {
  type: userType,
  args: {
    input: {
      name: 'input',
      type: new GraphQLNonNull(keystringUpdateType)
    }
  },
  async resolve (root, params) {
    return updateUser({
      userId: params.input.id,
      data: {
        tel: params.input.value
      }
    });
  }
};

export const updateUserRoles = {
  type: userType,
  args: {
    input: {
      name: 'input',
      type: new GraphQLNonNull(keylistUpdateType)
    }
  },
  async resolve (root, params) {
    return updateUser({
      userId: params.input.id,
      data: {
        roles: params.input.value
      }
    });
  }
};

export const updateUserEmail = {
  type: userType,
  args: {
    input: {
      name: 'input',
      type: new GraphQLNonNull(keystringUpdateType)
    }
  },
  async resolve (root, params) {
    return updateUser({
      userId: params.input.id,
      data: {
        email: params.input.value
      }
    });
  }
};

export const updateUserStatus = {
  type: userType,
  args: {
    input: {
      name: 'input',
      type: new GraphQLNonNull(keystringUpdateType)
    }
  },
  async resolve (root, params) {
    const tempValue = parseInt(params.input.value, 10) || 0;
    return updateUser({
      userId: params.input.id,
      data: {
        status: tempValue
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
    input: {
      name: 'input',
      type: new GraphQLNonNull(keystringUpdateType)
    }
  },
  async resolve (root, params) {
    const user = await UserModel.findById(params.input.id);

    if (!user) {
      throw new Error('User does not exist');
    }

    await setPassword(user, params.input.value);
    await user.save();

    return user;
  }
};
