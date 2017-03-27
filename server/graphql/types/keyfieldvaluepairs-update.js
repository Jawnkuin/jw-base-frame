import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLEnumType
} from 'graphql';

const fieldType = new GraphQLEnumType({
  name: 'FieldType',
  values: {
    Float: {value: 0},
    Int: {value: 1},
    String: {value: 2},
    Boolean: {value: 3}
  }
});

const fieldValueType = new GraphQLInputObjectType({
  name: 'FieldValue',
  fields: {
    field: {type: GraphQLString},
    value: {type: GraphQLString},
    ftype: {type: fieldType}
  }
});

const keyfieldvaluepairsUpdateType = new GraphQLInputObjectType({
  name: 'keyfieldvaluepairsUpdate',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    fieldvalues: {type: new GraphQLList(fieldValueType)}
  }
});


export default keyfieldvaluepairsUpdateType;
