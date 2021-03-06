import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';


import userType from '../../types/user';
import UserModel from '../../../models/user';

export default {
  type: userType,
  args: {
    input: {
      name: 'input',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    const removedUser = await UserModel.findByIdAndRemove(params.id).exec();

    if (!removedUser) {
      throw new Error('Error removing user');
    }

    return removedUser;
  }
};
