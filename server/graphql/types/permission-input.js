import {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

const permissionInputType = new GraphQLInputObjectType({
  name: 'PermissionInput',
  fields: {
    operation: {
      type: new GraphQLNonNull(GraphQLID)
    },
    resource: {
      type: new GraphQLNonNull(GraphQLID)
    }
  }
});

export default permissionInputType;
