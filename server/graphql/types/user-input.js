import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    loginname: {type: new GraphQLNonNull(GraphQLString)},
    useralias: {type: GraphQLString},
    password: {type: GraphQLString},
    email: {type: GraphQLString},
    date: {type: GraphQLString}
  }
});

export default userInputType;
