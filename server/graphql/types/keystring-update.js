import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const keystringUpdateType = new GraphQLInputObjectType({
  name: 'keystringUpdate',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    value: {type: new GraphQLNonNull(GraphQLString)}
  }
});

export default keystringUpdateType;
