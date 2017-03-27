import roleListType from '../../types/role-list';
import RoleModel from '../../../models/role';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: roleListType,
  args: {
    ...paginationQueryArgs
  },
  async resolve (root, params) {
    // parse query condition args
    const query = RoleModel.find(searchQuery({}, params));
    // parse query pagination args
    paginateQuery(query, params);

    const roles = await query.exec();

    return {roles};
  }
};
