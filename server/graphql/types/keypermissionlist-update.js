import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import permissionInputType from './permission-input';

const keypermissionlistUpdateType = new GraphQLInputObjectType({
  name: 'keypermissionlistUpdate',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    value: {type: new GraphQLList(permissionInputType)}
  }
});

export default keypermissionlistUpdateType;
