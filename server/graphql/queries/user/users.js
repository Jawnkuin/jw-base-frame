import {GraphQLList} from 'graphql';
import userType from '../../types/user';
import UserModel from '../../../models/user';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: new GraphQLList(userType),
  args: {
    ...paginationQueryArgs
  },
  async resolve (root, params) {
    // parse query condition args
    const query = UserModel.find(searchQuery({}, params));
    // parse query pagination args
    paginateQuery(query, params);

    return query.exec();
  }
};
