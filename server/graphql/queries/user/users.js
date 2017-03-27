import userListType from '../../types/user-list';
import UserModel from '../../../models/user';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: userListType,
  args: {
    ...paginationQueryArgs
  },
  async resolve (root, params) {
    // parse query condition args
    const query = UserModel.find(searchQuery({}, params));
    // parse query pagination args
    paginateQuery(query, params);

    const users = await query.exec();

    return {users};
  }
};
