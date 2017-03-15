import {
  GraphQLObjectType,
  GraphQLID
} from 'graphql';
import OperationModel from '../../models/operation';
import operationType from './operation';

const permissionType = new GraphQLObjectType({
  name: 'Permission',
  fields: {
    operation: {
      type: operationType,
      resolve (parent) {
        return OperationModel.findOneByID(parent.operation);
      }
    },
    resourceid: {
      type: GraphQLID
    }
  }
});

export default permissionType;
