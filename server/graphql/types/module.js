import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import resourceType from './resource';

const moduleType = new GraphQLObjectType({
  name: 'Module',
  interfaces: [resourceType],
  fields: {
    owner: {
      // owner _id
      type: GraphQLString
    },
    restype: {
      // collection name
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    path: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  },
  isTypeOf: data => data.restype === 'Module',
  description: 'Bussiness Module'
});

export default moduleType;
