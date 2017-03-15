import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import permissionInputType from './permission-input';

const roleInputeType = new GraphQLInputObjectType({
  name: 'RoleInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    permissions: {
      type: new GraphQLList(permissionInputType)
    }
  }
});

export default roleInputeType;
