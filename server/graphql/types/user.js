import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import RoleModel from '../../models/role';
import roleType from './role';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    loginname: {type: new GraphQLNonNull(GraphQLString)},
    roles: {
      type: new GraphQLList(roleType),
      async resolve (user) {
        // user async method to query data
        const roles = await RoleModel.find({_id: {
          $in: user.roles
        }}).exec();
        return roles;
      }
    },
    useralias: {
      type: GraphQLString
    },
    tel: {
      type: GraphQLString
    },
    date: {
      type: GraphQLFloat,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    email: {
      type: GraphQLString
    },
    status: {
      type: GraphQLInt
    }
  }
});

export default userType;
