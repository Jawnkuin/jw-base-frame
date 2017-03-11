import {GraphQLList} from 'graphql';
import roleType from '../../types/role';
import RoleModel from '../../../models/role';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: new GraphQLList(roleType),
  args: {
    ...paginationQueryArgs
  },
  async resolve (root, params) {
    // parse query condition args
    const query = RoleModel.find(searchQuery({}, params));
    // parse query pagination args
    paginateQuery(query, params);

    return query.exec();
  }
};
