import {
  GraphQLID,
  GraphQLList
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
    }
  },
  resolve (root, params) {
    return resourceModel.distinct('restype', {
      owner: params.oid
    }).exec();
  },
  description: 'get resource types'
};
