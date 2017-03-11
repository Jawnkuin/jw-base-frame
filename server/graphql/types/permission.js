import {
  GraphQLObjectType
} from 'graphql';
import operationType from './operation';
import resourceType from './resource';

const permissionType = new GraphQLObjectType({
  name: 'Permission',
  fields: {
    operation: {
      type: operationType
    },
    resource: {
      type: resourceType
    }
  }
});

export default permissionType;
