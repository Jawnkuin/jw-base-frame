import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import roleType from './role';

const roleListType = new GraphQLObjectType({
  name: 'RoleList',
  fields: {
    roles: {
      type: new GraphQLList(roleType)
    }
  }
});

export default roleListType;
