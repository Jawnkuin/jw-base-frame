import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    loginname: {type: new GraphQLNonNull(GraphQLString)},
    useralias: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: GraphQLString},
    email: {type: new GraphQLNonNull(GraphQLString)},
    date: {type: GraphQLString}
  }
});

export default userInputType;
