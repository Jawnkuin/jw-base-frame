import {
  GraphQLInterfaceType,
  GraphQLString
} from 'graphql';

const resourceType = new GraphQLInterfaceType({
  name: 'Resource',
  fields: {
    owner: {
      // owner _id
      type: GraphQLString
    },
    restype: {
      // collection name
      type: GraphQLString
    }
  }
});

export default resourceType;
