import {
  GraphQLNonNull
} from 'graphql';

import moduleInputType from '../../types/module-input';
import moduleType from '../../types/module';
import ModuleModel from '../../../models/module';

// resolve path by parentid
async function resolvePath (parentid, moduleName) {
  const parent = await ModuleModel.findOneByID(parentid, {path: 1}).exec();
  if (!parent) {
    throw new Error('Error add new `Module` cause by find no parent');
  }
  return `${parent.path}${moduleName},`;
}

export default {
  type: moduleType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(moduleInputType)
    }
  },
  async resolve (root, params) {
    const {owner, restype, name, parentid, isroot, description} = params.data;
    if (!isroot && !parentid) {
      throw new Error('Error neither parentid nor root config');
    }
    const path = isroot ? ',' : await resolvePath(parentid, name);

    const module = await new ModuleModel({
      owner,
      restype,
      name,
      path,
      description
    }).save();

    return module;
  }
};
