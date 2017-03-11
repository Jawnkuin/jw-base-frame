import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import permissionType from './permission';

const roleType = new GraphQLObjectType({
  name: 'Role',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    permissions: {
      type: new GraphQLList(permissionType)
    }
  }
});

export default roleType;
