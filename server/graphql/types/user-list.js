import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import userType from './user';

const userListType = new GraphQLObjectType({
  name: 'UserList',
  fields: {
    users: {
      type: new GraphQLList(userType)
    }
  }
});

export default userListType;
