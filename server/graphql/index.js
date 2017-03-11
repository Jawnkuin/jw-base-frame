import clone from 'lodash/clone';
import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';
import queries from './queries';
import mutations from './mutations';

class SchemaManager {
  constructor () {
    this.init();
  }

  init () {
    this.queryFields = clone(queries);
    this.mutationFields = clone(mutations);
    this.createRoot();
  }


  createRoot () {
    this.rootQuery = new GraphQLObjectType({
      name: 'Query',
      fields: () => (this.queryFields)
    });
    this.rootMutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: () => (this.mutationFields)
    });
  }

  getSchema () {
    const schema = {
      query: this.rootQuery
    };

    // if no mutation api exists, shema field `mutation` is unnecessary
    if (Object.keys(this.mutationFields).length) {
      schema.mutation = this.rootMutation;
    }

    return new GraphQLSchema(schema);
  }
}

export default new SchemaManager();
