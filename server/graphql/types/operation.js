import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

const operationType = new GraphQLObjectType({
  name: 'Operation',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  }
});

export default operationType;
