import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

const moduleInputeType = new GraphQLInputObjectType({
  name: 'ModuleInput',
  fields: {
    owner: {
      // owner _id
      type: GraphQLID
    },
    restype: {
      // collection name
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    parentid: {
      type: GraphQLID
    },
    isroot: {
      type: GraphQLBoolean
    },
    description: {
      type: GraphQLString
    }
  }
});

export default moduleInputeType;
