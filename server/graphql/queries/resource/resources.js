import {
  GraphQLID,
  GraphQLList,
  GraphQLString
} from 'graphql';
import resourceType from '../../types/resource';
import resourceModel from '../../../models/resource';


export default {
  type: new GraphQLList(resourceType),
  args: {
    // owner_id
    oid: {
      name: 'oid',
      type: GraphQLID
    },
    restype: {
      name: 'restype',
      type: GraphQLString
    }
  },
  resolve (root, params) {
    return resourceModel.find({
      owner: params.oid,
      restype: params.restype
    }).exec();
  },
  description: 'get resource by type and owner'
};
