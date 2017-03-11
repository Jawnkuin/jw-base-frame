import {GraphQLID} from 'graphql';
import userType from '../../types/user';
import UserModel from '../../../models/user';
import getProjection from '../../../../helpers/get-projection';

export default {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    }
  },
  resolve (root, params, context, info) {
    const projection = getProjection(info.fieldNodes[0]);

    let id = params.id;
    if (!id) {
      id = root.user._id;
    }
    return UserModel
      .findById(id)
      .select(projection)
      .exec();
  }
};
