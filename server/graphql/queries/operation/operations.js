import {GraphQLList} from 'graphql';
import operationType from '../../types/operation';
import OperationModel from '../../../models/operation';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';


export default {
  type: new GraphQLList(operationType),
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params) {
    // parse query condition args
    const query = OperationModel.find(searchQuery({}, params));
    // parse query pagination args
    paginateQuery(query, params);

    return query.exec();
  }
};
