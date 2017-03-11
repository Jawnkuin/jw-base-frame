import {GraphQLID} from 'graphql';
import operationType from '../../types/operation';
import OperationModel from '../../../models/operation';

export default {
  type: operationType,
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    }
  },
  resolve (root, params) {
    const id = params.id;

    return OperationModel
      .findById(id)
      .exec();
  }
};
