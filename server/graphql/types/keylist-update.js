import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

const keylistUpdateType = new GraphQLInputObjectType({
  name: 'keylistUpdate',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    value: {type: new GraphQLList(GraphQLString)}
  }
});

export default keylistUpdateType;
